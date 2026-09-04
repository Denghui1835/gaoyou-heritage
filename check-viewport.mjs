import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
for (const [w, h, label] of [[1920, 1080, "fhd"], [1536, 864, "laptop"], [1366, 768, "small"]]) {
  const p = await browser.newPage();
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  await p.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise(r => setTimeout(r, 1000));
  const info = await p.evaluate(() => {
    const hero = document.querySelector(".hero").getBoundingClientRect();
    const banner = document.querySelector(".hero-banner").getBoundingClientRect();
    const portal = document.querySelector(".hero-portal").getBoundingClientRect();
    const img = document.querySelector(".hero-img");
    const imgOk = img && img.complete && img.naturalWidth > 0;
    const home = document.getElementById("page-home");
    return {
      vw: window.innerWidth, vh: window.innerHeight,
      heroTop: Math.round(hero.top), heroH: Math.round(hero.height),
      bannerH: Math.round(banner.height), portalTop: Math.round(portal.top + window.scrollY), portalH: Math.round(portal.height),
      imgOk, imgNatural: img ? img.naturalWidth + "x" + img.naturalHeight : "none",
      homeDisplay: getComputedStyle(home).display, homeActive: home.classList.contains("active"),
      bodyScrollH: document.body.scrollHeight, pageEndGap: window.innerHeight - Math.round(hero.bottom)
    };
  });
  console.log(label, JSON.stringify(info), "errors:", JSON.stringify(errs));
  await p.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/viewport-" + label + ".png", fullPage: false });
  await p.close();
}
await browser.close();
