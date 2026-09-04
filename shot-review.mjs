import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const base = "file:///" + process.cwd().replace(/\\/g, "/") + "/";
mkdirSync("screenshots", { recursive: true });

const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });

// ---- 桌面版 ----
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(base + "index.html", { waitUntil: "networkidle2", timeout: 45000 });
  await delay(4500); // 等待地图/字体渲染
  await page.screenshot({ path: "screenshots/rv-desktop-hero.png" });
  console.log("✅ rv-desktop-hero.png (桌面首屏)");
  await page.evaluate(() => document.querySelector(".cta")?.scrollIntoView());
  await delay(1200);
  await page.screenshot({ path: "screenshots/rv-desktop-cta.png" });
  console.log("✅ rv-desktop-cta.png (底部CTA)");
  // 公众号弹窗
  await page.evaluate(() => window.openGzh());
  await delay(500);
  await page.screenshot({ path: "screenshots/rv-desktop-gzh.png" });
  console.log("✅ rv-desktop-gzh.png (公众号弹窗)");
  await page.evaluate(() => window.closeModal("gzhModal"));
  await delay(300);
  // 整页长图
  await page.screenshot({ path: "screenshots/rv-desktop-full.png", fullPage: true });
  console.log("✅ rv-desktop-full.png (整页长图)");
  await page.close();
}

// ---- 手机版 ----
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(base + "index-m.html", { waitUntil: "networkidle2", timeout: 45000 });
  await delay(4000);
  await page.screenshot({ path: "screenshots/rv-mobile-hero.png" });
  console.log("✅ rv-mobile-hero.png (手机首屏)");
  await page.evaluate(() => window.openGzh());
  await delay(400);
  await page.screenshot({ path: "screenshots/rv-mobile-gzh.png" });
  console.log("✅ rv-mobile-gzh.png (公众号弹窗)");
  await page.evaluate(() => window.closeModal("gzhModal"));
  await delay(300);
  await page.screenshot({ path: "screenshots/rv-mobile-full.png", fullPage: true });
  console.log("✅ rv-mobile-full.png (整页长图)");
  await page.close();
}

await browser.close();
console.log("Done!");
