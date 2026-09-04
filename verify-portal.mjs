import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 45000 });
const info = await page.evaluate(() => {
  const out = {};
  out.pc = [...document.querySelectorAll(".pc-card")].map(c => { const r = c.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; });
  out.pm = [...document.querySelectorAll(".pm-card")].map(c => { const r = c.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; });
  out.wrapW = Math.round(document.querySelector(".hero-portal .wrap").getBoundingClientRect().width);
  out.portalW = Math.round(document.querySelector(".hero-portal").getBoundingClientRect().width);
  return out;
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
