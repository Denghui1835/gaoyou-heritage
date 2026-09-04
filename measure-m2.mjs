import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const s = await page.evaluate(() => {
  const home = document.getElementById("page-home").getBoundingClientRect().height;
  const banner = document.querySelector(".hero-banner").getBoundingClientRect().height;
  const portal = document.querySelector(".hero-portal").getBoundingClientRect().height;
  const pc = [...document.querySelectorAll(".pc-card")].map(c => Math.round(c.getBoundingClientRect().height));
  const pm = [...document.querySelectorAll(".pm-card")].map(c => Math.round(c.getBoundingClientRect().height));
  return { homeH: Math.round(home), banner: Math.round(banner), portal: Math.round(portal), pc, pm, bodyH: document.body.scrollHeight, vh: window.innerHeight };
});
console.log(JSON.stringify(s, null, 2));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/spa-m-final.png", fullPage: false });
await browser.close();
