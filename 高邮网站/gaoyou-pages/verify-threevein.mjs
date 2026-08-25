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
  const result = await page.evaluate(() => {
    const btns = document.querySelectorAll(".tc-explore");
    const out = { btns: btns.length, anims: [] };
    btns.forEach((b, idx) => {
      b.click();
      const anim = b.closest(".tc").querySelector(".tc-anim");
      out.anims.push({ type: b.getAttribute("data-anim"), shown: anim.classList.contains("show") });
    });
    // 关闭动画
    document.querySelectorAll(".tc-anim").forEach((a) => a.classList.remove("show"));
    return out;
  });
  await page.screenshot({ path: `screenshots/rv-threevein-${name}.png` });
  console.log(`--- ${name} ---`);
  console.log(`  探索按钮: ${result.btns} | 动画触发: ${JSON.stringify(result.anims)} | JS错误: ${errors.length}`);
  errors.slice(0, 3).forEach((e) => console.log("  ✗", e));
  await page.close();
}

await check("desktop", "index.html", 1440, 900);
await check("mobile", "index-m.html", 390, 844);
await browser.close();
console.log("Done!");
