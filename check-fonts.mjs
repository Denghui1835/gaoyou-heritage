import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const info = await m.evaluate(() => {
  const g = s => getComputedStyle(document.querySelector(s)).fontSize;
  const h1 = document.querySelector(".hero h1").getBoundingClientRect();
  const portal = document.querySelector(".hero-portal").getBoundingClientRect();
  return { kicker: g(".hero-kicker"), h1: g(".hero h1"), sub: g(".hero-sub"), btn: g(".btn-roll"), h1Top: Math.round(h1.top), h1Bottom: Math.round(h1.bottom), portalTop: Math.round(portal.top), portalBottom: Math.round(portal.bottom) };
});
console.log(JSON.stringify(info, null, 2));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/bigger-fonts.png", fullPage: false });
await browser.close();
