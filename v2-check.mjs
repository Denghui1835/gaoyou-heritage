import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const cases = [
  { w: 1440, h: 900, url: "http://localhost:8000/index.html?desktop=1", label: "desktop-1440x900" },
  { w: 1440, h: 620, url: "http://localhost:8000/index.html?desktop=1", label: "short-1440x620" },
  { w: 390, h: 844, url: "http://localhost:8000/index-m.html", label: "mobile-390x844" }
];
for (const c of cases) {
  const p = await browser.newPage();
  await p.setViewport({ width: c.w, height: c.h, deviceScaleFactor: 1 });
  await p.goto(c.url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 900));
  const info = await p.evaluate(() => {
    const hero = document.querySelector(".hero").getBoundingClientRect();
    const banner = document.querySelector(".hero-banner").getBoundingClientRect();
    const portal = document.querySelector(".hero-portal").getBoundingClientRect();
    return { vh: window.innerHeight, heroH: Math.round(hero.height), bannerH: Math.round(banner.height), portalTop: Math.round(portal.top), portalH: Math.round(portal.height), gapAfterPortal: window.innerHeight - Math.round(portal.bottom) };
  });
  console.log(c.label, JSON.stringify(info));
  await p.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/v2-" + c.label + ".png", fullPage: false });
  await p.close();
}
await browser.close();
