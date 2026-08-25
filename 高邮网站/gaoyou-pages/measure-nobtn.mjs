import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const d = await page.evaluate(() => {
  const hero = document.querySelector(".hero").getBoundingClientRect();
  const banner = document.querySelector(".hero-banner").getBoundingClientRect();
  return { hasBtn: !!document.getElementById("enterBtn"), heroH: Math.round(hero.height), bannerH: Math.round(banner.height), share: Math.round(hero.height / window.innerHeight * 100) + "%", vh: window.innerHeight };
});
console.log("DESKTOP:", JSON.stringify(d));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/no-btn-desktop.png", fullPage: false });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 700));
const md = await m.evaluate(() => {
  const hero = document.querySelector(".hero").getBoundingClientRect();
  return { hasBtn: !!document.getElementById("enterBtn"), heroH: Math.round(hero.height), share: Math.round(hero.height / window.innerHeight * 100) + "%", vh: window.innerHeight };
});
console.log("MOBILE:", JSON.stringify(md));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/no-btn-mobile.png", fullPage: false });
await browser.close();
