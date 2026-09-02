import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const cases = [
  { w: 390, h: 844, url: "http://localhost:8000/index-m.html", label: "mobile-390x844" },
  { w: 1440, h: 620, url: "http://localhost:8000/index.html?desktop=1", label: "short-1440x620" },
  { w: 900, h: 700, url: "http://localhost:8000/index.html?desktop=1", label: "narrow-900x700" }
];
for (const c of cases) {
  const p = await browser.newPage();
  await p.setViewport({ width: c.w, height: c.h, deviceScaleFactor: 1 });
  await p.goto(c.url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 900));
  const info = await p.evaluate(() => {
    const hero = document.querySelector(".hero");
    const banner = document.querySelector(".hero-banner");
    const portal = document.querySelector(".hero-portal");
    const img = document.querySelector(".hero-img");
    const hr = hero.getBoundingClientRect(), br = banner.getBoundingClientRect(), pr = portal.getBoundingClientRect();
    const ir = img.getBoundingClientRect();
    return {
      vh: window.innerHeight, vw: window.innerWidth,
      heroH: Math.round(hr.height), bannerTop: Math.round(br.top), bannerH: Math.round(br.height),
      portalTop: Math.round(pr.top), portalH: Math.round(pr.height),
      img: Math.round(ir.top) + "," + Math.round(ir.height),
      imgDisplay: getComputedStyle(img).display, imgObjectPosition: getComputedStyle(img).objectPosition,
      bodyScrollH: document.body.scrollHeight
    };
  });
  console.log(c.label, JSON.stringify(info));
  await p.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/dbg-" + c.label + ".png", fullPage: false });
  await p.close();
}
await browser.close();
