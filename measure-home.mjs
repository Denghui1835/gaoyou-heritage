import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 800));
const m = await page.evaluate(() => {
  const h = sel => { const el = document.querySelector(sel); if (!el) return null; return Math.round(el.getBoundingClientRect().height); };
  return {
    kicker: h(".hero-kicker"), divider: h(".hero-divider"), h1: h(".hero h1"), sub: h(".hero-sub"), btn: h(".hero-btn"), innerPad: getComputedStyle(document.querySelector(".hero-inner")).paddingTop,
    pc: [...document.querySelectorAll(".pc-card")].map(c => Math.round(c.getBoundingClientRect().height)), pcImg: h(".pc-card .pc-img"), pcBd: h(".pc-card .pc-bd"),
    pm: [...document.querySelectorAll(".pm-card")].map(c => Math.round(c.getBoundingClientRect().height)), pmImg: h(".pm-card .pm-img"), pmBd: h(".pm-card .pm-bd"),
    quote: h(".portal-quote"), portalPad: getComputedStyle(document.querySelector(".hero-portal")).paddingTop
  };
});
console.log(JSON.stringify(m, null, 2));
await browser.close();
