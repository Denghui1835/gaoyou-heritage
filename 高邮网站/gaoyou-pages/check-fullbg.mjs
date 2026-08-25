import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1000));
const info = await m.evaluate(() => {
  const img = document.querySelector(".hero-img").getBoundingClientRect();
  const hero = document.querySelector(".hero").getBoundingClientRect();
  const portal = document.querySelector(".hero-portal").getBoundingClientRect();
  const banner = document.querySelector(".hero-banner").getBoundingClientRect();
  return { vh: window.innerHeight, imgTop: Math.round(img.top), imgH: Math.round(img.height), imgW: Math.round(img.width), heroH: Math.round(hero.height), bannerH: Math.round(banner.height), portalTop: Math.round(portal.top), portalBottom: Math.round(portal.bottom), cardsAtBottom: hero.bottom - portal.bottom < 30 };
});
console.log(JSON.stringify(info, null, 2));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/fullbg-mobile-v2.png", fullPage: false });
await browser.close();
