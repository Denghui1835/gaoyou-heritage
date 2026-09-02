import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
mkdirSync("screenshots", { recursive: true });

const url = "file:///" + process.cwd().replace(/\\/g, "/") + "/index-m.html";
console.log("URL:", url);
await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
await delay(4000);

// 首屏（不滚动）
await page.screenshot({ path: "screenshots/m-hero.png" });
console.log("✅ m-hero.png (首屏)");

// 完整长图
await page.screenshot({ path: "screenshots/m-full.png", fullPage: true });
console.log("✅ m-full.png (整页长图)");

// 打开汉堡菜单
await page.click("#hambBtn");
await delay(500);
await page.screenshot({ path: "screenshots/m-menu.png" });
console.log("✅ m-menu.png (菜单)");
await page.click("#hambBtn");
await delay(300);

// 打开一个游戏弹窗
await page.evaluate(() => window.openGame());
await delay(400);
await page.screenshot({ path: "screenshots/m-modal.png" });
console.log("✅ m-modal.png (弹窗)");

await browser.close();
console.log("Done!");
