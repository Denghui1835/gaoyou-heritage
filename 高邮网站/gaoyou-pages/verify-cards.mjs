import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
const links = await m.evaluate(() => [...document.querySelectorAll(".pc-card,.pm-card")].map(a => ({ page: a.getAttribute("data-page"), text: (a.querySelector("h3")||{}).textContent })));
console.log("CARDS:", JSON.stringify(links));
const results = [];
for (const l of links) {
  await m.evaluate(() => window.showPage("home"));
  await new Promise(r => setTimeout(r, 250));
  await m.evaluate(pg => { const a = document.querySelector(`.pc-card[data-page="${pg}"], .pm-card[data-page="${pg}"]`); if (a) a.click(); }, l.page);
  await new Promise(r => setTimeout(r, 450));
  const active = await m.evaluate(() => [...document.querySelectorAll(".page.active")].map(p => p.id));
  results.push({ page: l.page, active, ok: active.length === 1 && active[0] === "page-" + l.page });
}
console.log(JSON.stringify(results, null, 2));
await browser.close();
