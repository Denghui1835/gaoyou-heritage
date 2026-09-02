import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
// click water card
await page.evaluate(() => { const a = document.querySelector('.pc-card[data-page="water"]'); a.click(); });
await new Promise(r => setTimeout(r, 600));
const water = await page.evaluate(() => ({
  active: [...document.querySelectorAll(".page.active")].map(p => p.id),
  cards: [...document.querySelectorAll("#page-water .tc h3")].map(h => h.textContent),
  imgH: Math.round(document.querySelector("#page-water .tc .pic img").getBoundingClientRect().height),
  imgW: Math.round(document.querySelector("#page-water .tc .pic img").getBoundingClientRect().width)
}));
console.log("WATER:", JSON.stringify(water));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/water-page.png", fullPage: true });
await page.evaluate(() => window.showPage("field"));
await new Promise(r => setTimeout(r, 500));
const field = await page.evaluate(() => ({ active: [...document.querySelectorAll(".page.active")].map(p => p.id), cards: [...document.querySelectorAll("#page-field .tc h3")].map(h => h.textContent) }));
console.log("FIELD:", JSON.stringify(field));
await page.evaluate(() => window.showPage("people"));
await new Promise(r => setTimeout(r, 500));
const people = await page.evaluate(() => ({ active: [...document.querySelectorAll(".page.active")].map(p => p.id), cards: [...document.querySelectorAll("#page-people .tc h3")].map(h => h.textContent) }));
console.log("PEOPLE:", JSON.stringify(people));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/people-page.png", fullPage: true });
await browser.close();
