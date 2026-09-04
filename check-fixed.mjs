import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
for (const [w, h, label] of [[1920, 1080, "fhd"], [1536, 864, "laptop"], [1366, 768, "small"]]) {
  const p = await browser.newPage();
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await p.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 900));
  const info = await p.evaluate(() => {
    const hero = document.querySelector(".hero").getBoundingClientRect();
    const portal = document.querySelector(".hero-portal").getBoundingClientRect();
    return { vh: window.innerHeight, heroH: Math.round(hero.height), heroBottom: Math.round(hero.bottom), portalTop: Math.round(portal.top + window.scrollY), pageEndGap: window.innerHeight - Math.round(hero.bottom), bodyScrollH: document.body.scrollHeight };
  });
  console.log(label, JSON.stringify(info));
  await p.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/fixed-" + label + ".png", fullPage: false });
  await p.close();
}
await browser.close();
