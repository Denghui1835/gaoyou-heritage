import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const errs = [];
page.on("pageerror", e => errs.push(e.message));
await page.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
await page.evaluate(() => window.showPage("water"));
await new Promise(r => setTimeout(r, 700));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/water-module.png", fullPage: true });
// click 车逻闸
await page.evaluate(() => { document.querySelector('.wg[data-gate="车逻闸"]').click(); });
await new Promise(r => setTimeout(r, 500));
const after = await page.evaluate(() => ({
  activeGate: document.querySelector(".wg.active") ? document.querySelector(".wg.active").getAttribute("data-gate") : null,
  infoShown: document.getElementById("wInfo").classList.contains("show"),
  infoName: document.getElementById("wInfoName").textContent,
  flowShown: document.getElementById("wFlow").classList.contains("show"),
  infoTextLen: document.getElementById("wInfoText").textContent.length
}));
console.log("AFTER CLICK:", JSON.stringify(after));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/water-module-click.png", fullPage: false });
console.log("ERRORS:", JSON.stringify(errs));
await browser.close();
