import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1100));
const info = await m.evaluate(() => {
  const em = document.querySelector(".hero h1 em").getBoundingClientRect();
  const seal = document.querySelector(".t-seal svg").getBoundingClientRect();
  return { emW: Math.round(em.width), emRight: Math.round(em.right), sealW: Math.round(seal.width), sealH: Math.round(seal.height), sealLeft: Math.round(seal.left), sealTop: Math.round(seal.top), ls: getComputedStyle(document.querySelector(".hero h1 em")).letterSpacing };
});
console.log(JSON.stringify(info));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/seal-title.png", fullPage: false });
await browser.close();
