import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1");
await page.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready.then(() => new Promise(r => setTimeout(r, 800))));
const info = await page.evaluate(() => {
  const loaded = [...document.fonts].filter(f => f.family.includes("STXingkai")).map(f => f.family + " " + f.status);
  const h1 = document.querySelector(".hero h1");
  const cs = getComputedStyle(h1);
  return { loadedFonts: loaded, check: document.fonts.check('60px "STXingkai"', "遗产融绘魅力高邮"), computedFamily: cs.fontFamily.split(",")[0] };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
