import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 2000, height: 1000, deviceScaleFactor: 2 });
const base = "file:///D:/%E6%96%B0%E6%96%87%E7%A7%91%E6%AF%94%E8%B5%9B/%E9%AB%98%E9%82%AE%E7%BD%91%E7%AB%99/calligraphy/";
await page.goto(base + "all7.html", { waitUntil: "networkidle0", timeout: 45000 });
await new Promise(r => setTimeout(r, 3500));
for (const id of ["z1", "z2", "z3", "z4"]) {
  const el = await page.$("#" + id + " .canvas");
  await el.screenshot({ path: "D:/新文科比赛/高邮网站/calligraphy/" + id + ".png" });
  console.log("ok", id + ".png");
}
await browser.close();
