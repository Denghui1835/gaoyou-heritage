import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const d = await page.evaluate(() => {
  const img = sel => { const el = document.querySelector(sel); const b = el.getBoundingClientRect(); return Math.round(b.width) + "x" + Math.round(b.height); };
  const hero = document.querySelector(".hero").getBoundingClientRect();
  return { pcImg: img(".pc-card .pc-img"), pmImg: img(".pm-card .pm-img"), pcCard: img(".pc-card"), pmCard: img(".pm-card"), heroH: Math.round(hero.height), share: Math.round(hero.height / window.innerHeight * 100) + "%" };
});
console.log("DESKTOP:", JSON.stringify(d));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/small-thumbs-desktop.png", fullPage: false });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 700));
const md = await m.evaluate(() => {
  const img = sel => { const el = document.querySelector(sel); const b = el.getBoundingClientRect(); return Math.round(b.width) + "x" + Math.round(b.height); };
  const hero = document.querySelector(".hero").getBoundingClientRect();
  return { pcImg: img(".pc-card .pc-img"), pmImg: img(".pm-card .pm-img"), heroH: Math.round(hero.height), share: Math.round(hero.height / window.innerHeight * 100) + "%" };
});
console.log("MOBILE:", JSON.stringify(md));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/small-thumbs-mobile.png", fullPage: false });
await browser.close();
