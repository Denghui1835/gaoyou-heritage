import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const errs = [];
page.on("pageerror", e => errs.push(e.message));
await page.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
await page.evaluate(() => window.showPage("field"));
await new Promise(r => setTimeout(r, 700));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/field-module.png", fullPage: true });
await page.evaluate(() => { document.querySelector('.fs[data-season="秋"]').click(); });
await new Promise(r => setTimeout(r, 500));
const after = await page.evaluate(() => ({
  activeSeason: document.querySelector(".fs.active") ? document.querySelector(".fs.active").getAttribute("data-season") : null,
  infoShown: document.getElementById("fInfo").classList.contains("show"),
  infoName: document.getElementById("fInfoName").textContent,
  infoText: document.getElementById("fInfoText").textContent.slice(0, 30)
}));
console.log("AFTER CLICK:", JSON.stringify(after));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/field-module-click.png", fullPage: false });
console.log("ERRORS:", JSON.stringify(errs));
await browser.close();
