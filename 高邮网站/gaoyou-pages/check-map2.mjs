import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1000));
await page.evaluate(() => window.showPage("map"));
await new Promise(r => setTimeout(r, 3500));
const info = await page.evaluate(() => {
  const m = document.getElementById("heritage-map");
  const b = m.getBoundingClientRect();
  const txt = m.textContent.trim().slice(0, 30);
  return { hasMap: !!window.__gyMap, mapSize: Math.round(b.width) + "x" + Math.round(b.height), text: txt, tileCount: document.querySelectorAll("#heritage-map canvas").length };
});
console.log("MAP:", JSON.stringify(info));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/pagecheck-map2.png", fullPage: true });
await browser.close();
