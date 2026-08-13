import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function screenshot(name, width, height) {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto("http://localhost:48765/index.html", { waitUntil: "networkidle2", timeout: 30000 });
  await delay(3000); // let ECharts render

  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  console.log(`✅ ${name}.png (${width}x${height})`);
  await browser.close();
}

mkdirSync("screenshots", { recursive: true });
await screenshot("desktop-1440", 1440, 900);
console.log("Done!");
