import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errs = [];
page.on('pageerror', e => errs.push("pageerror: " + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push("console: " + m.text()); });
await page.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1500));
const meas = await page.evaluate(() => {
  const r = sel => { const el = document.querySelector(sel); if (!el) return null; const b = el.getBoundingClientRect(); return Math.round(b.height); };
  return {
    home: r("#page-home"), banner: r(".hero-banner"), inner: r(".hero-inner"), portal: r(".hero-portal"),
    pc1: r(".pc-card"), pm1: r(".pm-card"), quote: r(".portal-quote"), footer: r(".ft"),
    maplibregl: !!window.maplibregl, echarts: !!window.echarts, hasMap: !!window.__gyMap,
    mapMsg: (document.getElementById("heritage-map")||{}).textContent ? (document.getElementById("heritage-map").textContent.trim().slice(0, 40)) : ""
  };
});
console.log("MEAS:", JSON.stringify(meas, null, 2));
console.log("ERRORS:", JSON.stringify(errs));
await page.evaluate(() => window.showPage("map"));
await new Promise(r => setTimeout(r, 2500));
const map = await page.evaluate(() => ({ hasMap: !!window.__gyMap, mapSize: (() => { const m = document.getElementById("heritage-map"); const b = m.getBoundingClientRect(); return Math.round(b.width) + "x" + Math.round(b.height); })(), chartCount: (window.__charts||[]).length }));
console.log("MAP:", JSON.stringify(map));
await page.evaluate(() => window.showPage("survey"));
await new Promise(r => setTimeout(r, 1200));
const survey = await page.evaluate(() => ({ chartCount: (window.__charts||[]).length, chartSizes: (window.__charts||[]).map(c => { const d = c.getDom(); const b = d.getBoundingClientRect(); return Math.round(b.width)+"x"+Math.round(b.height); }) }));
console.log("SURVEY:", JSON.stringify(survey));
await page.evaluate(() => window.showPage("home"));
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/spa-home2.png", fullPage: false });
await browser.close();
