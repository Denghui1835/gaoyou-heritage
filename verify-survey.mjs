import puppeteer from "puppeteer-core";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const base = "file:///" + process.cwd().replace(/\\/g, "/") + "/";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });

async function checkSurvey(name, url, width, height) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push("CONSOLE: " + m.text()); });
  await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width < 820, hasTouch: width < 820 });
  await page.goto(base + url, { waitUntil: "networkidle2", timeout: 45000 });
  await delay(5000);
  // 滚动到调研板块
  await page.evaluate(() => document.getElementById("survey")?.scrollIntoView());
  await delay(2500);
  const info = await page.evaluate(() => {
    const out = { canvases: document.querySelectorAll("#survey canvas").length, charts: document.querySelectorAll("#survey .chart").length };
    const ids = ["ch-cog", "ch-void", "ch-tech", "ch-value"];
    out.each = ids.map((i) => { const el = document.getElementById(i); return { id: i, canvas: !!(el && el.querySelector("canvas")), fallback: !!(el && el.innerHTML.includes("加载失败")) }; });
    return out;
  });
  await page.screenshot({ path: `screenshots/rv-survey-${name}.png` });
  console.log(`--- ${name} (${width}x${height}) ---`);
  console.log("  图表容器:", info.charts, "| canvas 数:", info.canvases);
  info.each.forEach((c) => console.log(`  ${c.id}: canvas=${c.canvas} fallback=${c.fallback}`));
  console.log("  JS错误数:", errors.length);
  errors.slice(0, 5).forEach((e) => console.log("  ✗", e));
  await page.close();
}

await checkSurvey("desktop", "index.html", 1440, 900);
await checkSurvey("mobile", "index-m.html", 390, 844);
await browser.close();
console.log("Done!");
