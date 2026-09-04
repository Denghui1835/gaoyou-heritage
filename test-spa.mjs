import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
page.on('pageerror', e => console.log("PAGEERROR:", e.message));
await page.goto("http://localhost:8000/index.html?desktop=1", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready.then(() => new Promise(r => setTimeout(r, 600))));
const home = await page.evaluate(() => {
  const pages = [...document.querySelectorAll(".page")].map(p => ({ id: p.id, active: p.classList.contains("active"), h: Math.round(p.getBoundingClientRect().height) }));
  const active = pages.filter(p => p.active);
  return { pages, activeIds: active.map(p => p.id), bodyH: document.body.scrollHeight, vh: window.innerHeight };
});
console.log("HOME:", JSON.stringify(home, null, 2));
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/spa-home.png", fullPage: false });

async function clickPage(label, dataPage) {
  await page.evaluate(dp => { const a = document.querySelector(`[data-page="${dp}"]`); if (a) a.click(); }, dataPage);
  await new Promise(r => setTimeout(r, 1200));
  const s = await page.evaluate(dp => {
    const p = document.getElementById("page-" + dp);
    return { active: p.classList.contains("active"), scrollY: window.scrollY, ph: Math.round(p.getBoundingClientRect().height), mapSize: (() => { const m = document.getElementById("heritage-map"); return m ? Math.round(m.getBoundingClientRect().width) + "x" + Math.round(m.getBoundingClientRect().height) : null; })(), hasMap: !!window.__gyMap, charts: (window.__charts || []).length };
  }, dataPage);
  console.log(label + ":", JSON.stringify(s));
}
await clickPage("探索高邮", "explore");
await clickPage("遗产地图", "map");
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/spa-map.png", clip: { x: 0, y: 0, width: 1440, height: 1000 } });
await clickPage("调研数据", "survey");
await page.screenshot({ path: "D:/新文科比赛/高邮网站/gaoyou-pages/screenshots/spa-survey.png", clip: { x: 0, y: 0, width: 1440, height: 1000 } });
await clickPage("返回首页", "home");
await browser.close();
