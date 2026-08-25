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
  await page.evaluate(() => document.getElementById("routes")?.scrollIntoView());
  await delay(1800);
  const info = await page.evaluate(() => {
    return {
      lanes: document.querySelectorAll("#routes .flow-lane").length,
      svgs: document.querySelectorAll("#routes svg.fl-svg").length,
      dots: document.querySelectorAll("#routes circle.fl-dot").length,
      src: !!document.querySelector("#routes .flow-src"),
    };
  });
  await page.screenshot({ path: `screenshots/rv-routes-${name}.png` });
  console.log(`--- ${name} ---`);
  console.log(`  水路: ${info.lanes} | SVG: ${info.svgs} | 站点圆点: ${info.dots} | 源头: ${info.src} | JS错误: ${errors.length}`);
  errors.slice(0, 3).forEach((e) => console.log("  ✗", e));
  await page.close();
}

await check("desktop", "index.html", 1440, 900);
await check("mobile", "index-m.html", 390, 844);
await browser.close();
console.log("Done!");
