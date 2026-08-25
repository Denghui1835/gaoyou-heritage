import puppeteer from "puppeteer-core";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("EXC: " + e.message));
  page.on("console", (msg) => { if (msg.type() === "error") errors.push("ERR: " + msg.text()); });
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.goto("http://localhost:48766/index.html", { waitUntil: "networkidle2", timeout: 40000 });
  await page.evaluate(() => document.getElementById("map-section").scrollIntoView({ block: "center" }));
  await delay(3000);

  const state = await page.evaluate(() => {
    const el = document.getElementById("heritage-map");
    const canvas = el.querySelector(".maplibregl-canvas");
    const markers = el.querySelectorAll(".maplibregl-marker");
    const m = window.__gyMap;
    return {
      mapLibreLoaded: !!window.maplibregl,
      mapExists: !!m,
      canvas: !!canvas,
      markers: markers.length,
      center: m ? m.getCenter() : null,
      zoom: m ? m.getZoom() : null,
      pitch: m ? m.getPitch() : null,
      bearing: m ? m.getBearing() : null,
      hint: !!el.querySelector(".map-hint"),
      navControl: !!el.querySelector(".maplibregl-ctrl-group"),
    };
  });
  console.log("初始状态:", JSON.stringify(state, null, 2));

  // 模拟旋转：改 bearing 和 pitch，验证视角可旋转
  await page.evaluate(() => { const m = window.__gyMap; m.jumpTo({ bearing: 45, pitch: 70 }); });
  await delay(600);
  const rotated = await page.evaluate(() => { const m = window.__gyMap; return { bearing: m.getBearing(), pitch: m.getPitch() }; });
  console.log("旋转到 bearing45/pitch70:", JSON.stringify(rotated));

  // 点击第一个发光点位，弹窗应打开
  await page.evaluate(() => {
    document.querySelector(".maplibregl-marker").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await delay(700);
  const popup = await page.evaluate(() => document.querySelectorAll(".maplibregl-popup").length);
  console.log("点击点位后弹窗数:", popup, "(应为 1)");

  console.log("\n页面 JS 报错:", errors.length ? errors.join("\n") : "无");
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
