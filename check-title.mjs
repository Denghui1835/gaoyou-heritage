import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const info = await m.evaluate(() => {
  const h1 = document.querySelector(".hero h1");
  const r = h1.getBoundingClientRect();
  const banner = document.querySelector(".hero-banner").getBoundingClientRect();
  const cs = getComputedStyle(h1);
  return {
    fontSize: cs.fontSize,
    h1Top: Math.round(r.top), h1Bottom: Math.round(r.bottom),
    bannerH: Math.round(banner.height),
    bannerTop: Math.round(banner.top), bannerBottom: Math.round(banner.bottom),
    centerOffset: Math.round((r.top + r.height / 2) - (banner.top + banner.height / 2))
  };
});
console.log(JSON.stringify(info, null, 2));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/title-center-mobile.png", fullPage: false });
await browser.close();
