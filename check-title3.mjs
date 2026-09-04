import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1000));
const info = await m.evaluate(() => {
  const main = document.querySelector(".t-main");
  const wd = document.querySelector(".t-wd");
  const seal = document.querySelector(".t-seal");
  const g = s => { const el = document.querySelector(s); const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return { w: Math.round(r.width), h: Math.round(r.height), fontSize: cs.fontSize, bg: cs.backgroundImage.slice(0, 50), color: cs.color }; };
  return { main: g(".t-main"), wd: g(".t-wd"), seal: g(".t-seal") };
});
console.log(JSON.stringify(info, null, 2));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/art-title.png", fullPage: false });
await browser.close();
