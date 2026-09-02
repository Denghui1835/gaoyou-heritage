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
await new Promise(r => setTimeout(r, 800));
const info = await page.evaluate(() => ({
  nodes: document.querySelectorAll("#page-timeline .tl-node").length,
  eras: [...document.querySelectorAll("#page-timeline .era")].map(e => e.textContent),
  hasTabs: !!document.querySelector(".ttab"),
  hasWhero: !!document.querySelector("#page-timeline .w-hero"),
  imgs: [...document.querySelectorAll("#page-timeline .nimg img")].map(i => i.src.split("/").pop())
}));
console.log(JSON.stringify(info));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/timeline-original.png", fullPage: true });
console.log("ERRORS:", JSON.stringify(errs));
await browser.close();
