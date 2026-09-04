import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const home = await m.evaluate(() => ({ ft: getComputedStyle(document.querySelector(".ft")).display }));
console.log("HOME ft:", JSON.stringify(home));
for (const pg of ["water", "field", "people", "map", "survey", "routes", "games", "gallery", "about"]) {
  await m.evaluate(p => window.showPage(p), pg);
  await new Promise(r => setTimeout(r, 250));
  const s = await m.evaluate(() => ({ ft: getComputedStyle(document.querySelector(".ft")).display }));
  console.log(pg, "ft:", s.ft);
}
await browser.close();
