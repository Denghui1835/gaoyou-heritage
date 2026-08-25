import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1200));
await page.evaluate(() => window.showPage("map"));
await new Promise(r => setTimeout(r, 3000));
await page.evaluate(() => {
  const mks = document.querySelectorAll("#heritage-map .maplibregl-marker");
  for (const mk of mks) { if (mk.textContent.includes("车逻闸")) { mk.click(); break; } }
});
await new Promise(r => setTimeout(r, 900));
const popup = await page.evaluate(() => {
  const p = document.querySelector("#heritage-map .maplibregl-popup");
  return p ? { hasStory: p.textContent.includes("这里发生过什么故事"), hasImg: !!p.querySelector("img"), imgSrc: p.querySelector("img") ? p.querySelector("img").src.split("/").pop() : null, chips: p.querySelectorAll("span").length } : null;
});
console.log("车逻闸 POPUP:", JSON.stringify(popup));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/map-popup-cheluo.png", fullPage: false });
await browser.close();
