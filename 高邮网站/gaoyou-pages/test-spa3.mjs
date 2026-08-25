import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errs = [];
page.on('pageerror', e => errs.push(e.message));
await page.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1200));
async function snap(label) {
  const s = await page.evaluate(() => {
    const active = [...document.querySelectorAll(".page")].filter(p => p.classList.contains("active")).map(p => p.id);
    const home = document.getElementById("page-home").getBoundingClientRect().height;
    const banner = document.querySelector(".hero-banner").getBoundingClientRect().height;
    const portal = document.querySelector(".hero-portal").getBoundingClientRect().height;
    const footerHidden = getComputedStyle(document.querySelector(".ft")).display === "none";
    const onHome = document.body.classList.contains("on-home");
    return { active, homeH: Math.round(home), bannerH: Math.round(banner), portalH: Math.round(portal), footerHidden, onHome, bodyH: document.body.scrollHeight, vh: window.innerHeight };
  });
  console.log(label, JSON.stringify(s));
}
await snap("HOME");
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/spa-home3.png", fullPage: false });
await page.evaluate(() => window.showPage("explore"));
await new Promise(r => setTimeout(r, 500));
await snap("EXPLORE");
await page.evaluate(() => window.showPage("map"));
await new Promise(r => setTimeout(r, 2200));
const map = await page.evaluate(() => ({ hasMap: !!window.__gyMap, size: (() => { const b = document.getElementById("heritage-map").getBoundingClientRect(); return Math.round(b.width)+"x"+Math.round(b.height); })(), active: [...document.querySelectorAll(".page.active")].map(p => p.id) }));
console.log("MAP", JSON.stringify(map));
await page.evaluate(() => window.showPage("home"));
await new Promise(r => setTimeout(r, 400));
await snap("BACK-HOME");
console.log("ERRORS:", JSON.stringify(errs));
await browser.close();
