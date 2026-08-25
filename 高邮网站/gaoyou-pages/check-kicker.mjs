import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const info = await m.evaluate(() => {
  const k = document.querySelector(".hero-kicker").getBoundingClientRect();
  const h1 = document.querySelector(".hero h1").getBoundingClientRect();
  const nav = document.querySelector(".nav").getBoundingClientRect();
  return { kickerTop: Math.round(k.top), kickerBottom: Math.round(k.bottom), kickerSize: getComputedStyle(document.querySelector(".hero-kicker")).fontSize, h1Top: Math.round(h1.top), navBottom: Math.round(nav.bottom), overlapNav: k.top < nav.bottom };
});
console.log(JSON.stringify(info));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/kicker-up.png", fullPage: false });
await browser.close();
