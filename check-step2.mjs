import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const sub = await page.evaluate(() => document.querySelector(".hero-sub").innerText);
const cta = await page.evaluate(() => document.querySelector(".cta") ? document.querySelector(".cta").innerText.replace(/\s+/g, " ").slice(0, 200) : "no cta");
console.log("SUB:", JSON.stringify(sub));
console.log("CTA:", JSON.stringify(cta));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/step2-hero.png", fullPage: false });
// check footer buttons
const btns = await page.evaluate(() => [...document.querySelectorAll(".cta button, .cta a, .cta .btn, .cta .cta-btn, .cta .words a, .cta [onclick]")].map(b => ({ text: (b.innerText || b.textContent || "").trim().slice(0, 20), onclick: b.getAttribute("onclick") || "" })));
console.log("CTA BUTTONS:", JSON.stringify(btns));
await browser.close();
