import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const errs = [];
page.on("pageerror", e => errs.push(e.message));
await page.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
await page.evaluate(() => window.showPage("timeline"));
await new Promise(r => setTimeout(r, 700));
const initial = await page.evaluate(() => ({
  activeTab: document.querySelector(".ttab.active") ? document.querySelector(".ttab.active").getAttribute("data-era") : null,
  panelShown: document.getElementById("tPanel").classList.contains("show"),
  name: document.getElementById("tName").textContent,
  listLen: document.querySelectorAll("#tList li").length
}));
console.log("INITIAL:", JSON.stringify(initial));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/timeline-module.png", fullPage: true });
await page.evaluate(() => { document.querySelector('.ttab[data-era="今日"]').click(); });
await new Promise(r => setTimeout(r, 400));
const after = await page.evaluate(() => ({
  activeTab: document.querySelector(".ttab.active").getAttribute("data-era"),
  name: document.getElementById("tName").textContent,
  imgSrc: document.getElementById("tImg").src.split("/").pop()
}));
console.log("AFTER 今日:", JSON.stringify(after));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/timeline-module-today.png", fullPage: false });
console.log("ERRORS:", JSON.stringify(errs));
await browser.close();
