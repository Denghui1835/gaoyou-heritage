import puppeteer from "puppeteer-core";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
// desktop phone-frame
const p = await browser.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
await p.evaluate(() => window.showPage("explore"));
await new Promise(r => setTimeout(r, 800));
const desk = await p.evaluate(() => {
  const shell = document.querySelector(".phone-shell");
  return { clientH: shell.clientHeight, scrollH: shell.scrollHeight, overflowY: getComputedStyle(shell).overflowY, canScroll: shell.scrollHeight > shell.clientHeight };
});
console.log("DESKTOP SHELL:", JSON.stringify(desk));
// scroll the shell and check it works
await p.evaluate(() => { const s = document.querySelector(".phone-shell"); s.scrollTop = 600; });
await new Promise(r => setTimeout(r, 300));
const scrolled = await p.evaluate(() => { const s = document.querySelector(".phone-shell"); return { scrollTop: Math.round(s.scrollTop), navTop: Math.round(document.querySelector(".nav").getBoundingClientRect().top + s.scrollTop) }; });
console.log("AFTER SCROLL:", JSON.stringify(scrolled));
await p.close();
// real phone (no fixed frame)
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await m.goto("http://localhost:8000/index-m.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 900));
await m.evaluate(() => window.showPage("explore"));
await new Promise(r => setTimeout(r, 800));
const mob = await m.evaluate(() => {
  const shell = document.querySelector(".phone-shell");
  return { clientH: shell.clientHeight, scrollH: shell.scrollHeight, bodyScrollH: document.body.scrollHeight, vh: window.innerHeight };
});
console.log("PHONE:", JSON.stringify(mob));
await m.evaluate(() => window.scrollTo(0, 800));
await new Promise(r => setTimeout(r, 300));
const mobScroll = await m.evaluate(() => ({ bodyScrollTop: Math.round(window.scrollY || document.documentElement.scrollTop) }));
console.log("PHONE AFTER SCROLL:", JSON.stringify(mobScroll));
await browser.close();
