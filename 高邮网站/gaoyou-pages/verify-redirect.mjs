import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: "new",
  args: ["--no-sandbox"],
});
const base = "file:///" + process.cwd().replace(/\\/g, "/") + "/";

async function check(name, width, height, url, expectMobile) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, isMobile: width < 820, hasTouch: width < 820 });
  try {
    await page.goto(base + url, { waitUntil: "networkidle2", timeout: 30000 });
  } catch (e) { /* 跳转可能中断加载 */ }
  const finalUrl = page.url();
  const isMobile = finalUrl.includes("index-m.html");
  const pass = isMobile === expectMobile;
  console.log(`${pass ? "✅" : "❌"} ${name}  →  ${finalUrl.replace(base, "")}  (期望${expectMobile ? "手机版" : "电脑版"})`);
  await page.close();
}

await check("手机视口访问首页", 390, 844, "index.html", true);
await check("手机视口 + desktop=1", 390, 844, "index.html?desktop=1", false);
await check("桌面视口访问首页", 1440, 900, "index.html", false);
await check("手机视口直接访问手机版", 390, 844, "index-m.html", true);

await browser.close();
console.log("Done!");
