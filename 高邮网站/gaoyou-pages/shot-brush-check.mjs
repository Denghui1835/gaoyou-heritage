import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 45000 });
await page.evaluate(() => document.fonts.ready.then(() => new Promise(r => setTimeout(r, 800))));
const info = await page.evaluate(() => {
  const h1 = document.querySelector(".hero h1");
  const cs = getComputedStyle(h1);
  const r = h1.getBoundingClientRect();
  return {
    filter: cs.filter,
    color: cs.color,
    font: cs.fontFamily.split(",")[0],
    filterElExists: !!document.querySelector("#brtitle"),
    rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
  };
});
console.log("desktop:", JSON.stringify(info, null, 2));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/brush-desktop.png", clip: { x: 0, y: 0, width: 1440, height: 780 } });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 45000 });
await m.evaluate(() => document.fonts.ready.then(() => new Promise(r => setTimeout(r, 800))));
const minfo = await m.evaluate(() => {
  const h1 = document.querySelector(".hero h1");
  const cs = getComputedStyle(h1);
  return { filter: cs.filter, color: cs.color, font: cs.fontFamily.split(",")[0], filterElExists: !!document.querySelector("#brtitle") };
});
console.log("mobile:", JSON.stringify(minfo, null, 2));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/brush-mobile.png", clip: { x: 0, y: 0, width: 390, height: 844 } });
await browser.close();
