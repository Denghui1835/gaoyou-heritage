import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 45000 });
const links = await page.evaluate(() => [...document.querySelectorAll(".pc-card,.pm-card")].map(a => ({ href: a.getAttribute("href"), text: a.querySelector("h3")?.textContent })));
const results = [];
for (const l of links) {
  await page.evaluate(href => { document.querySelector(`a[href="${href}"]`)?.scrollIntoView(); }, l.href);
  await page.evaluate(href => { const el = document.querySelector(`a[href="${href}"]`); el.click(); }, l.href);
  await new Promise(r => setTimeout(r, 900));
  const pos = await page.evaluate(href => {
    const target = document.querySelector(href);
    return { targetTop: Math.round(target.getBoundingClientRect().top), scrollY: Math.round(window.scrollY) };
  }, l.href);
  results.push({ ...l, targetTop: pos.targetTop, scrollY: pos.scrollY });
}
console.log(JSON.stringify(results, null, 2));
// final screenshots
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/portal-final-desktop.png", clip: { x: 0, y: 0, width: 1440, height: 2000 } });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 45000 });
await m.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/portal-final-mobile.png", clip: { x: 0, y: 0, width: 390, height: 2300 } });
await browser.close();
