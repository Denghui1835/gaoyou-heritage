import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const info = await m.evaluate(() => ({
  pc: [...document.querySelectorAll(".pc-card")].map(c => Math.round(c.getBoundingClientRect().height)),
  pm: [...document.querySelectorAll(".pm-card")].map(c => Math.round(c.getBoundingClientRect().height)),
  bg1: getComputedStyle(document.querySelector(".pc-water")).backgroundImage.slice(0, 50),
  bg2: getComputedStyle(document.querySelector(".pm-map")).backgroundImage.slice(0, 50)
}));
console.log(JSON.stringify(info));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/cards-gradient.png", fullPage: false });
await browser.close();
