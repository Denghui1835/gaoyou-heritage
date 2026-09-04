import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const info = await m.evaluate(() => {
  const h1 = document.querySelector(".hero h1");
  const em = document.querySelector(".hero h1 em");
  const r = h1.getBoundingClientRect();
  return { h1Text: h1.innerText, h1Size: getComputedStyle(h1).fontSize, emSize: getComputedStyle(em).fontSize, hasSpan: !!document.querySelector(".t-seal"), h1Top: Math.round(r.top), h1H: Math.round(r.height) };
});
console.log(JSON.stringify(info));
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/title-reverted.png", fullPage: false });
await browser.close();
