import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
// 1. index.html should redirect to index-m.html
const p1 = await browser.newPage();
await p1.setViewport({ width: 1440, height: 900 });
await p1.goto("http://localhost:8000/index.html", { waitUntil: "networkidle0", timeout: 30000 }).catch(() => {});
await new Promise(r => setTimeout(r, 800));
console.log("REDIRECT URL:", p1.url());
await p1.close();
// 2. phone shell on desktop
const p = await browser.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const info = await p.evaluate(() => {
  const shell = document.querySelector(".phone-shell").getBoundingClientRect();
  const nav = document.querySelector(".nav").getBoundingClientRect();
  return { shellW: Math.round(shell.width), shellH: Math.round(shell.height), shellLeft: Math.round(shell.left), navLeft: Math.round(nav.left), navTop: Math.round(nav.top), navW: Math.round(nav.width), bodyScrollH: document.body.scrollHeight, vw: window.innerWidth, vh: window.innerHeight };
});
console.log("DESKTOP FRAME:", JSON.stringify(info));
await p.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/phone-shell-desktop.png", fullPage: false });
await p.close();
// 3. short window
const p2 = await browser.newPage();
await p2.setViewport({ width: 800, height: 620 });
await p2.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 800));
const info2 = await p2.evaluate(() => {
  const shell = document.querySelector(".phone-shell").getBoundingClientRect();
  return { shellW: Math.round(shell.width), shellH: Math.round(shell.height), vh: window.innerHeight };
});
console.log("SHORT WINDOW FRAME:", JSON.stringify(info2));
await p2.close();
await browser.close();
