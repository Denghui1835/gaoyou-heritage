import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await m.evaluate(() => document.fonts.ready.then(() => new Promise(r => setTimeout(r, 800))));
const info = await m.evaluate(() => {
  const h1 = document.querySelector(".hero h1");
  return { family: getComputedStyle(h1).fontFamily.split(",")[0], loaded: document.fonts.check('60px "Zhi Mang Xing"', "遗产融绘魅力高邮") };
});
console.log(JSON.stringify(info));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/title-zmx.png", fullPage: false });
await browser.close();
