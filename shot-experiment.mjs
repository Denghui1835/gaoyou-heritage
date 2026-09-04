import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";

const URL = "file:///D:/新文科比赛/高邮网站/实验版/index.html";
const OUT = "D:/新文科比赛/高邮网站/实验版/_shots";

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1310, height: 1201, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
await new Promise((r) => setTimeout(r, 800));

await page.screenshot({ path: `${OUT}/exp-full.png`, fullPage: true });
console.log("exp-full.png done");
await browser.close();
