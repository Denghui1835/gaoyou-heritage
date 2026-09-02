import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1000));
const s = await page.evaluate(() => {
  const home = document.getElementById("page-home").getBoundingClientRect();
  const banner = document.querySelector(".hero-banner").getBoundingClientRect().height;
  const portal = document.querySelector(".hero-portal").getBoundingClientRect().height;
  const pm = [...document.querySelectorAll(".pm-card")].map(c => Math.round(c.getBoundingClientRect().height));
  return { homeH: Math.round(home.height), bannerH: Math.round(banner), portalH: Math.round(portal), pm, onHome: document.body.classList.contains("on-home"), footerHidden: getComputedStyle(document.querySelector(".ft")).display === "none", bodyH: document.body.scrollHeight, vh: window.innerHeight, active: [...document.querySelectorAll(".page.active")].map(p => p.id) };
});
console.log(JSON.stringify(s, null, 2));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/spa-home4.png", fullPage: false });
await browser.close();
