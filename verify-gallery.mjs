import puppeteer from "puppeteer-core";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const base = "file:///" + process.cwd().replace(/\\/g, "/") + "/";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });

async function check(name, url, width, height) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width < 820, hasTouch: width < 820 });
  await page.goto(base + url, { waitUntil: "networkidle2", timeout: 45000 });
  await delay(3000);
  const galCount = await page.evaluate(() => document.querySelectorAll(".gal a").length);
  // 打开灯箱
  await page.evaluate(() => { const a = document.querySelector(".gal a"); if (a) a.click(); });
  await delay(600);
  const lb = await page.evaluate(() => {
    const el = document.getElementById("lightbox");
    if (!el || !el.classList.contains("open")) return { open: false };
    const img = document.getElementById("lbImg");
    return { open: true, imgLoaded: img.complete && img.naturalWidth > 0, cap: document.getElementById("lbCap").textContent };
  });
  // 下一张
  await page.evaluate(() => document.getElementById("lbNext")?.click());
  await delay(300);
  const nextCap = await page.evaluate(() => document.getElementById("lbCap").textContent);
  // 关闭
  await page.evaluate(() => document.getElementById("lbClose")?.click());
  await delay(300);
  const closed = await page.evaluate(() => !document.getElementById("lightbox").classList.contains("open"));
  await page.screenshot({ path: `screenshots/rv-gallery-${name}.png` });
  console.log(`--- ${name} ---`);
  console.log(`  展厅图片数: ${galCount} | 灯箱打开: ${lb.open} | 图片加载: ${lb.imgLoaded} | 说明: "${lb.cap}"`);
  console.log(`  下一张说明: "${nextCap}" | 关闭: ${closed} | JS错误: ${errors.length}`);
  errors.slice(0, 3).forEach((e) => console.log("  ✗", e));
  await page.close();
}

await check("desktop", "index.html", 1440, 900);
await check("mobile", "index-m.html", 390, 844);
await browser.close();
console.log("Done!");
