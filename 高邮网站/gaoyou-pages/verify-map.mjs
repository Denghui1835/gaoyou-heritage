import puppeteer from "puppeteer-core";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  page.on("console", (msg) => { if (msg.type() === "error") console.log("PAGE ERR:", msg.text()); });
  page.on("pageerror", (e) => console.log("PAGE EXC:", e.message));
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.goto("http://localhost:48765/index.html", { waitUntil: "networkidle2", timeout: 40000 });
  await page.evaluate(() => document.getElementById("map").scrollIntoView({ block: "center" }));
  await delay(7000); // 等飞入动画(4.5s)完全结束

  // ① 飞入终点：相机 + 全点位是否在画面内 + 可见标签数 + 重叠检测
  const r1 = await page.evaluate(() => {
    const m = window.__gyMap;
    const box = document.getElementById("heritage-map").getBoundingClientRect();
    const els = [...document.querySelectorAll(".maplibregl-marker")];
    const info = els.map((el) => {
      const r = el.getBoundingClientRect();
      const lbl = el.querySelector(".ml");
      return {
        name: el.textContent.trim().slice(0, 8),
        labelVisible: lbl ? lbl.style.display !== "none" : null,
        inside: r.left >= box.left - 6 && r.right <= box.right + 6 && r.top >= box.top - 6 && r.bottom <= box.bottom + 6,
      };
    });
    const visible = info.filter((x) => x.labelVisible !== false);
    const visMarkers = els.filter((el) => { const l = el.querySelector(".ml"); return !l || l.style.display !== "none"; });
    const overlaps = [];
    for (let i = 0; i < visMarkers.length; i++)
      for (let j = i + 1; j < visMarkers.length; j++) {
        const a = visMarkers[i].getBoundingClientRect(), b = visMarkers[j].getBoundingClientRect();
        const ax = a.left + a.width / 2, ay = a.top + a.height, bx = b.left + b.width / 2, by = b.top + b.height;
        if (Math.abs(ax - bx) < (a.width + b.width) / 2 - 2 && Math.abs(ay - by) < 30) overlaps.push(`${visMarkers[i].textContent.trim()} ↔ ${visMarkers[j].textContent.trim()}`);
      }
    return {
      camera: { center: m.getCenter(), zoom: m.getZoom(), pitch: m.getPitch() },
      container: { w: Math.round(box.width), h: Math.round(box.height) },
      allInside: info.every((x) => x.inside),
      outside: info.filter((x) => !x.inside).map((x) => x.name),
      totalMarkers: info.length,
      visibleLabels: visible.filter((x) => x.labelVisible !== false).length,
      overlapPairs: overlaps,
    };
  });
  console.log("① 飞入后:", JSON.stringify(r1, null, 2));

  // ② 单一弹窗：依次点击两个不同点位，弹窗应只剩一个
  const popupTest = await page.evaluate(async () => {
    const mk = document.querySelectorAll(".maplibregl-marker");
    if (mk.length < 2) return { err: "markers<2" };
    // 直接触发点击（maplibre marker 点击默认开关 popup）
    mk[0].click(); mk[1].click();
    await new Promise((r) => setTimeout(r, 600));
    return document.querySelectorAll(".maplibregl-popup").length;
  });
  console.log("② 连点两个点位后弹窗数:", popupTest, "(应为 1)");

  // ③ 复位按钮：先把相机推远，再点“回到全景”，应回到全适配视角
  await page.evaluate(() => window.__gyMap.flyTo({ center: [119.45, 32.85], zoom: 13, pitch: 70, duration: 400 }));
  await delay(1200);
  const camFar = await page.evaluate(() => { const m = window.__gyMap; return { zoom: m.getZoom(), pitch: m.getPitch() }; });
  await page.evaluate(() => {
    [...document.querySelectorAll("button")].find((b) => b.textContent.includes("回到全景")).click();
  });
  await delay(2600);
  const cam2 = await page.evaluate(() => { const m = window.__gyMap; return { zoom: m.getZoom(), pitch: m.getPitch(), center: m.getCenter() }; });
  console.log("③ 推远后相机:", JSON.stringify(camFar));
  console.log("③ 点击「回到全景」后相机:", JSON.stringify(cam2), "(应回到 z10.8/p55)");
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
