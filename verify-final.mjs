import puppeteer from "puppeteer-core";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const base = "file:///" + process.cwd().replace(/\\/g, "/") + "/";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });

async function check(name, url, width, height) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width < 820, hasTouch: width < 820 });
  await page.goto(base + url, { waitUntil: "networkidle2", timeout: 45000 });
  await delay(4500);
  const report = await page.evaluate(() => {
    const ids = ["survey", "about", "gallery", "map", "routes", "games", "timeline"];
    const out = { sections: {} };
    ids.forEach((i) => { const el = document.getElementById(i); out.sections[i] = !!el; });
    out.surveyCharts = document.querySelectorAll("#survey canvas").length;
    out.aboutDilemmas = document.querySelectorAll("#about .dg").length;
    out.galleryCount = document.querySelectorAll(".gal a").length;
    out.navSurvey = !!document.querySelector('.nav a[href="#survey"], .menu-overlay a[href="#survey"]');
    out.navAbout = !!document.querySelector('.nav a[href="#about"], .menu-overlay a[href="#about"]');
    return out;
  });
  // 截 3 张图：调研板块 / 关于板块 / 整页
  await page.evaluate(() => document.getElementById("survey")?.scrollIntoView());
  await delay(2500);
  await page.screenshot({ path: `screenshots/rv-final-survey-${name}.png` });
  await page.evaluate(() => document.getElementById("about")?.scrollIntoView());
  await delay(1500);
  await page.screenshot({ path: `screenshots/rv-final-about-${name}.png` });
  console.log(`--- ${name} (${width}x${height}) ---`);
  console.log("  板块存在:", JSON.stringify(report.sections));
  console.log(`  调研图表canvas: ${report.surveyCharts} | 困境卡片: ${report.aboutDilemmas} | 展厅图片: ${report.galleryCount}`);
  console.log(`  导航含调研: ${report.navSurvey} | 导航含关于: ${report.navAbout}`);
  console.log("  JS错误数:", errors.length);
  errors.slice(0, 4).forEach((e) => console.log("  ✗", e.slice(0, 140)));
  await page.close();
}

await check("desktop", "index.html", 1440, 900);
await check("mobile", "index-m.html", 390, 844);
await browser.close();
console.log("Done!");
