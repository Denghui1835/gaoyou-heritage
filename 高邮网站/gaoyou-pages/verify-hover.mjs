import puppeteer from "puppeteer-core";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  page.on("pageerror", (e) => console.log("PAGE EXC:", e.message));
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.goto("http://localhost:48765/index.html", { waitUntil: "networkidle2", timeout: 40000 });
  await page.evaluate(() => document.getElementById("map").scrollIntoView({ block: "center" }));
  await delay(7000);

  // 统计当前被避让(隐藏标签)的 marker
  const hidden = await page.evaluate(() => {
    return [...document.querySelectorAll(".maplibregl-marker")]
      .filter((el) => { const l = el.querySelector(".ml"); return l && l.style.display === "none"; })
      .map((el) => el.textContent.trim());
  });
  console.log("当前被避让(隐藏标签)的点位:", hidden.length ? hidden.join("、") : "无");

  // hover 一个被隐藏标签的点位，标签应临时显示
  if (hidden.length) {
    const shown = await page.evaluate((name) => {
      const el = [...document.querySelectorAll(".maplibregl-marker")].find((e) => e.textContent.includes(name));
      el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      const l = el.querySelector(".ml");
      return l.style.display;
    }, hidden[0]);
    console.log(`hover「${hidden[0]}」后其标签 display = "${shown}"（应为空=显示）`);
    await page.evaluate(() => {
      [...document.querySelectorAll(".maplibregl-marker")].forEach((e) => e.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true })));
    });
    await delay(300);
    const after = await page.evaluate(() => {
      return [...document.querySelectorAll(".maplibregl-marker")]
        .filter((el) => { const l = el.querySelector(".ml"); return l && l.style.display === "none"; }).length;
    });
    console.log("mouseleave 后恢复避让（隐藏数应回到", hidden.length, "）：", after);
  }

  // 放大两级后，碰撞放松，可见标签应增多
  await page.evaluate(() => window.__gyMap.flyTo({ center: [119.43, 32.79], zoom: 13, pitch: 60, duration: 900 }));
  await delay(2500);
  const at13 = await page.evaluate(() => [...document.querySelectorAll(".maplibregl-marker")]
    .filter((el) => { const l = el.querySelector(".ml"); return l && l.style.display !== "none"; }).length);
  console.log(`zoom≈13 时可见标签数：${at13}（默认视角 7 个，应更多或持平）`);
  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
