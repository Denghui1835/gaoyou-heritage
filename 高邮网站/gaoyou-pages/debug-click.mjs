import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
const errors = [];
m.on("pageerror", e => errors.push("pageerror: " + e.message));
m.on("console", c => { if (c.type() === "error") errors.push("console: " + c.text()); });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 1000));
const before = await m.evaluate(() => ({ active: [...document.querySelectorAll(".page.active")].map(p => p.id), dataPageCount: document.querySelectorAll("[data-page]").length }));
console.log("BEFORE:", JSON.stringify(before));
// click first pc-card
await m.evaluate(() => { const a = document.querySelector('.pc-card[data-page]'); if (a) a.click(); });
await new Promise(r => setTimeout(r, 600));
const afterCard = await m.evaluate(() => ({ active: [...document.querySelectorAll(".page.active")].map(p => p.id) }));
console.log("AFTER CARD CLICK:", JSON.stringify(afterCard));
// back home then click button
await m.evaluate(() => window.showPage("home"));
await new Promise(r => setTimeout(r, 300));
await m.evaluate(() => { const b = document.querySelector(".hero-btn"); if (b) b.click(); });
await new Promise(r => setTimeout(r, 600));
const afterBtn = await m.evaluate(() => ({ active: [...document.querySelectorAll(".page.active")].map(p => p.id), showPageType: typeof window.showPage }));
console.log("AFTER BTN CLICK:", JSON.stringify(afterBtn));
console.log("ERRORS:", JSON.stringify(errors));
await browser.close();
