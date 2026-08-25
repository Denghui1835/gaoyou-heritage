import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await m.evaluate(() => document.fonts.ready.then(() => new Promise(r => setTimeout(r, 600))));
const info = await m.evaluate(() => {
  const big = document.querySelector(".t-big").getBoundingClientRect();
  const h1 = document.querySelector(".hero h1").getBoundingClientRect();
  return { bigFont: getComputedStyle(document.querySelector(".t-big")).fontSize, h1Font: getComputedStyle(document.querySelector(".hero h1")).fontSize, bigH: Math.round(big.height), h1Top: Math.round(h1.top), family: getComputedStyle(document.querySelector(".hero h1")).fontFamily.split(",")[0] };
});
console.log(JSON.stringify(info));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/title-big-yi.png", fullPage: false });
await browser.close();
