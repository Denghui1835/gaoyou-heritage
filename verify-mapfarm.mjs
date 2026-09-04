import puppeteer from "puppeteer-core";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const base = "file:///" + process.cwd().replace(/\\/g, "/") + "/";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(base + "index.html", { waitUntil: "networkidle2", timeout: 45000 });
await delay(3000);
await page.evaluate(() => document.getElementById("map").scrollIntoView());
await delay(6000);
const info = await page.evaluate(() => {
  const m = window.__gyMap;
  if (!m) return { map: "MISSING" };
  const layers = m.getStyle().layers.map((l) => l.id);
  return {
    layers: layers.filter((id) => /farm|village|lake|water/.test(id)),
    hasFarm: !!m.getLayer("farm-fill"),
    hasVillage: !!m.getLayer("village-fill"),
  };
});
console.log(JSON.stringify(info, null, 2));
console.log("JS错误:", errors.length);
errors.slice(0, 3).forEach((e) => console.log("✗", e));
await page.screenshot({ path: "screenshots/rv-map-farm.png" });
await browser.close();
console.log("Done!");
