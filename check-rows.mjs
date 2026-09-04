import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
async function check(w, h, url, label) {
  const p = await browser.newPage();
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await p.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 700));
  const s = await p.evaluate(() => {
    const pc = [...document.querySelectorAll(".pc-card")].map(c => { const b = c.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; });
    const pm = [...document.querySelectorAll(".pm-card")].map(c => { const b = c.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), h: Math.round(b.height) }; });
    const pcRows = new Set(pc.map(c => c.y)).size;
    const hero = document.querySelector(".hero").getBoundingClientRect();
    return { pcRows, pcY: pc.map(c => c.y), pcH: pc.map(c => c.h), pmRows: new Set(pm.map(c => c.y)).size, pmY: pm.map(c => c.y), heroH: Math.round(hero.height), vw: window.innerWidth };
  });
  console.log(label + ":", JSON.stringify(s));
  await p.close();
}
await check(1440, 900, "http://localhost:8000/index.html?desktop=1", "DESKTOP 1440");
await check(800, 900, "http://localhost:8000/index.html?desktop=1", "NARROW 800");
await check(390, 844, "http://localhost:8000/index-m.html", "MOBILE 390");
await browser.close();
