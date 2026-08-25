import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
const base = "file:///" + process.cwd().replace(/\\/g, "/") + "/";
await page.goto(base + "all.html", { waitUntil: "domcontentloaded", timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));
for (const id of ["v1", "v2", "v3", "v4", "v5", "v6"]) {
  const el = await page.$("#" + id + " svg");
  await el.screenshot({ path: id + ".png" });
  console.log("ok", id + ".png");
}
await browser.close();
