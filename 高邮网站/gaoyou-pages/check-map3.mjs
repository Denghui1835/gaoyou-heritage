import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const errs = [];
page.on("pageerror", e => errs.push(e.message));
await page.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1200));
await page.evaluate(() => window.showPage("map"));
await new Promise(r => setTimeout(r, 3500));
const info = await page.evaluate(() => {
  const markers = document.querySelectorAll("#heritage-map .maplibregl-marker").length;
  const pins = document.querySelectorAll("#heritage-map .maplibregl-marker [style*='animation:mpulse']").length;
  return { hasMap: !!window.__gyMap, markers, pins, canvas: document.querySelectorAll("#heritage-map canvas").length };
});
console.log("MAP:", JSON.stringify(info));
// click the first marker to open popup
await page.evaluate(() => {
  const mk = document.querySelector("#heritage-map .maplibregl-marker");
  if (mk) mk.click();
});
await new Promise(r => setTimeout(r, 800));
const popup = await page.evaluate(() => {
  const p = document.querySelector("#heritage-map .maplibregl-popup");
  return p ? { hasStory: p.textContent.includes("这里发生过什么故事"), hasImg: !!p.querySelector("img"), text: p.textContent.slice(0, 60) } : null;
});
console.log("POPUP:", JSON.stringify(popup));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/map-upgraded.png", fullPage: false });
console.log("ERRORS:", JSON.stringify(errs));
await browser.close();
