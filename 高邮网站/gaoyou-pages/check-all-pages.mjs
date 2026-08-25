import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1200));
const pages = ["explore", "timeline", "map", "survey", "routes", "games", "gallery", "about"];
for (const id of pages) {
  await page.evaluate(pid => window.showPage(pid), id);
  await new Promise(r => setTimeout(r, id === "map" ? 2500 : 1200));
  const info = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const sw = document.documentElement.scrollWidth;
    const sh = document.documentElement.scrollHeight;
    return { vw, sw, overflowX: sw > vw + 2, diff: sw - vw, sh: Math.round(sh) };
  });
  console.log(id, JSON.stringify(info));
  await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/pagecheck-" + id + ".png", fullPage: true });
}
await browser.close();
console.log("ALL DONE");
