import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1200));
for (const id of ["survey", "routes", "games", "gallery", "about"]) {
  await page.evaluate(pid => window.showPage(pid), id);
  await new Promise(r => setTimeout(r, 1600));
  await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/pagecheck-" + id + "-net.png", fullPage: true });
  console.log(id, "captured");
}
await browser.close();
