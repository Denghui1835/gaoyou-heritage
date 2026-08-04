# -*- coding: utf-8 -*-
page = """<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="description" content="高邮湖泊湿地集农业文化遗产、世界灌溉工程遗产、非物质文化遗产于一体。"><link rel="icon" type="image/svg+xml" href="./favicon.svg"><title>遗产融绘 · 魅力高邮</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Serif+SC:wght@600;700;900&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"><style>
:root{--ink:#1a1a2e;--warm:#faf8f5;--card:#fff;--border:#e6e1d8;--serif:'Noto Serif SC','Source Han Serif SC','STSong',serif;--sans:'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif;--grn:#2d6a4f;--blu:#1b6b93;--red:#b23b2c;--gld:#b8860b}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:var(--sans);background:var(--warm);color:var(--ink);line-height:1.85;font-size:16px}

/* Layout */
.sec{padding:80px 24px;max-width:960px;margin:0 auto}
.lbl{font-size:14px;letter-spacing:.3em;color:#a0a0a0;text-transform:uppercase;margin-bottom:12px;font-weight:500}
.tt{font-family:var(--serif);font-size:30px;font-weight:700;line-height:1.4;margin-bottom:16px;color:var(--ink)}
.sub{font-size:17px;color:#666;line-height:1.9;margin-bottom:40px;max-width:640px}

/* Cards */
.cd{background:var(--card);border-radius:16px;padding:32px 28px;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.03);border:1px solid var(--border);transition:transform .2s,box-shadow .2s}
.cd:hover{transform:translateY(-2px);box-shadow:0 4px 24px rgba(0,0,0,.06)}
.ct{font-family:var(--serif);font-size:22px;font-weight:700;margin-bottom:10px}
.cp{font-size:16px;color:#555;line-height:1.95}

/* Tags */
.tg{display:inline-block;font-size:13px;padding:4px 14px;border-radius:20px;margin:4px 4px 4px 0;font-weight:500;letter-spacing:.02em}
.tg-g{background:#e8f5e9;color:var(--grn)}.tg-b{background:#e3f2fd;color:var(--blu)}.tg-r{background:#ffebee;color:var(--red)}

/* 3-col grid for desktop */
.grid3{display:grid;gap:20px;grid-template-columns:1fr}
@media(min-width:768px){.grid3{grid-template-columns:repeat(3,1fr)}}
.grid2{display:grid;gap:20px;grid-template-columns:1fr}
@media(min-width:768px){.grid2{grid-template-columns:repeat(2,1fr)}}
.grid4{display:grid;gap:16px;grid-template-columns:1fr}
@media(min-width:500px){.grid4{grid-template-columns:repeat(2,1fr)}}
@media(min-width:768px){.grid4{grid-template-columns:repeat(4,1fr)}}

.stat-item{text-align:center;padding:24px 16px;background:white;border-radius:14px;border:1px solid var(--border)}
.stat-num{font-family:var(--serif);font-size:36px;font-weight:700;line-height:1.2}
.stat-num.g{color:var(--grn)}.stat-num.b{color:var(--blu)}.stat-num.r{color:var(--red)}.stat-num.o{color:var(--gld)}
.stat-label{font-size:14px;color:#888;margin-top:6px}

/* Hero */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:40px 24px;background:linear-gradient(170deg,#0f0f1a 0%,#1a2740 40%,#1a3a2a 100%);position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 30% 60%,rgba(27,107,147,.12) 0%,transparent 55%),radial-gradient(ellipse at 70% 40%,rgba(45,106,79,.08) 0%,transparent 50%),radial-gradient(ellipse at 50% 50%,rgba(255,255,255,.02) 0%,transparent 70%)}
.hb{color:rgba(255,255,255,.55);font-size:14px;letter-spacing:.3em;margin-bottom:32px}
.ht{font-family:var(--serif);font-size:52px;font-weight:900;letter-spacing:.06em;line-height:1.2;margin-bottom:16px;background:linear-gradient(180deg,#eef4fb 0%,#8ec8e3 35%,#4aab73 75%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hs{font-size:22px;font-weight:300;color:rgba(255,255,255,.7);margin-bottom:10px;letter-spacing:.05em}
.hl{font-size:16px;color:rgba(255,255,255,.35)}
.hd{width:56px;height:2px;background:linear-gradient(90deg,#4aab73,#1b6b93);margin:32px auto;border-radius:1px}
.hsc{position:absolute;bottom:48px;color:rgba(255,255,255,.25);font-size:15px;animation:float 2s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}

/* Map */
.msec{padding:80px 0 64px;max-width:960px;margin:0 auto}
.min{margin:0 24px}
.mc{width:100%;height:480px;border-radius:16px;overflow:hidden;border:1px solid var(--border);box-shadow:0 4px 24px rgba(0,0,0,.06);background:#e8f0f4}
.mlg{display:flex;flex-wrap:wrap;gap:20px;justify-content:center;margin:20px 0 16px}
.mli{display:flex;align-items:center;gap:6px;font-size:14px;color:#666}
.md{width:12px;height:12px;border-radius:50%}.md-b{background:var(--blu)}.md-g{background:var(--grn)}.md-r{background:var(--red)}
.mn{text-align:center;font-size:13px;color:#aaa;margin-top:14px}

/* Pain cards */
.pc{border-left:4px solid transparent}
.pc:nth-child(1){border-left-color:var(--gld)}.pc:nth-child(2){border-left-color:var(--blu)}.pc:nth-child(3){border-left-color:var(--red)}
.pn{font-family:var(--serif);font-size:52px;font-weight:900;color:#e8e4df;line-height:1;margin-bottom:-6px;pointer-events:none}
.sol{font-size:13px;font-weight:700;letter-spacing:.12em;color:#999;text-transform:uppercase;margin:18px 0 6px}

/* Output cards */
.oc{display:flex;align-items:flex-start;gap:18px;background:white;border-radius:14px;padding:28px;border:1px solid var(--border);transition:transform .2s,box-shadow .2s}
.oc:hover{transform:translateY(-2px);box-shadow:0 4px 20px rgba(0,0,0,.05)}
.oi{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0}
.oi-g{background:#e8f5e9;color:var(--grn)}.oi-b{background:#e3f2fd;color:var(--blu)}.oi-r{background:#ffebee;color:var(--red)}.oi-p{background:#f3e5f5;color:#7b1fa2}
.ot h4{font-size:17px;font-weight:600;margin-bottom:4px}.ot p{font-size:15px;color:#666;line-height:1.8}

/* Chain */
.ch{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:12px;flex-wrap:wrap}
.cs{background:white;border:1px solid var(--border);border-radius:12px;padding:18px 24px;text-align:center}
.cs h4{font-size:16px;font-weight:600;margin-bottom:3px}.cs p{font-size:13px;color:#888}
.ca{font-size:20px;color:#ccc}

/* Charts */
.chart-box{width:100%;height:350px}
.info-box{background:#f9f8f5;border-radius:12px;padding:16px 20px;margin-top:14px;font-size:14px;line-height:1.9;color:#666}
.info-box strong{display:block;font-size:16px;color:var(--ink);margin-bottom:4px}

/* Footer */
.ft{text-align:center;padding:56px 24px 48px;border-top:1px solid var(--border);background:var(--card)}
.ft h3{font-family:var(--serif);font-size:22px;font-weight:700;margin-bottom:10px}.ft p{font-size:14px;color:#999;line-height:1.8}

/* Responsive hero */
@media(min-width:768px){.ht{font-size:72px}.hs{font-size:26px}.tt{font-size:36px}}
@media(min-width:1024px){.ht{font-size:84px}}

.leaflet-popup-content{font-family:var(--sans);font-size:15px;line-height:1.8}
.leaflet-popup-content b{font-size:16px}
</style></head><body>"""

hero = """<section class="hero"><div class="hb">2026 大学生新文科实践创新大赛 · 文史哲组</div><h1 class="ht">融绘贯通</h1><p class="hs">多类型遗产系统性保护利用的路径探索与实践</p><div class="hd"></div><p class="hl">高邮湖泊湿地 — 集农业文化遗产 · 世界灌溉工程遗产 · 非物质文化遗产于一体</p><div class="hsc">向下滚动探索 ▼</div></section>"""

# === Section 1: Three Heritages ===
s1 = '<section class="sec"><div class="lbl">项目简介</div><h2 class="tt">三类遗产，共生共存</h2><p class="sub">高邮湖泊湿地是国内罕见的多类型遗产高度复合区——农业文化遗产、世界灌溉工程遗产、非物质文化遗产在「水—田—人」的脉络中深度交织，构成一个活态的文化生态系统。</p>'

s1 += '<div class="grid3">'
s1 += '<div class="cd" style="border-top:4px solid var(--grn)"><div class="ct" style="color:var(--grn)">农业文化遗产<br><span style="font-size:14px;color:#999;font-weight:400">中国重要农业文化遗产 · 2017 年入选</span></div><p class="cp">以<b>「稻鸭鱼蟹」立体共作</b>模式为核心，是传统农耕文明的活态见证。公众认知度仅 16.7%，但<b>当地村民对传统技艺认知率极高</b>——水产养殖 93.5%、稻作耕种 91.2%、稻鸭共作 75.8%。</p><div style="margin-top:14px"><span class="tg tg-g">稻鸭鱼蟹共作</span><span class="tg tg-g">水产养殖</span><span class="tg tg-g">鱼鹰捕鱼</span><span class="tg tg-g">种质资源</span></div></div>'
s1 += '<div class="cd" style="border-top:4px solid var(--blu)"><div class="ct" style="color:var(--blu)">灌溉工程遗产<br><span style="font-size:14px;color:#999;font-weight:400">世界灌溉工程遗产 · 2021 年入选</span></div><p class="cp">里运河-高邮灌区是古代利用河湖水位调控灌溉的<b>工程典范</b>。平津堰（唐）、南关坝（明）至今仍发挥灌溉作用。但<b>53.95% 受访者从未听说该灌区</b>，仅 1% 对其功能有了解。</p><div style="margin-top:14px"><span class="tg tg-b">平津堰（唐）</span><span class="tg tg-b">南关坝（明）</span><span class="tg tg-b">车逻闸</span><span class="tg tg-b">子婴闸</span></div></div>'
s1 += '<div class="cd" style="border-top:4px solid var(--red)"><div class="ct" style="color:var(--red)">非物质文化遗产<br><span style="font-size:14px;color:#999;font-weight:400">国家级 + 省级非遗项目</span></div><p class="cp">高邮民歌（国家级非遗）入选小学教材，咸鸭蛋制作技艺（省级非遗）闻名全国。知晓率 88.37%，但认知停留在「鸭蛋」「民歌」标签——七公会知晓率仅 10%。</p><div style="margin-top:14px"><span class="tg tg-r">高邮民歌</span><span class="tg tg-r">咸鸭蛋制作</span><span class="tg tg-r">十二红</span><span class="tg tg-r">七公会</span></div></div>'
s1 += '</div>'

s1 += '<div class="grid4" style="margin-top:24px">'
s1 += '<div class="stat-item"><div class="stat-num g">215</div><div class="stat-label">份有效问卷</div><div style="font-size:12px;color:#bbb;margin-top:2px">回收率 90.7%</div></div>'
s1 += '<div class="stat-item"><div class="stat-num b">10</div><div class="stat-label">人次深度访谈</div><div style="font-size:12px;color:#bbb;margin-top:2px">含政府/企业/村民</div></div>'
s1 += '<div class="stat-item"><div class="stat-num r">800+</div><div class="stat-label">张实地照片</div><div style="font-size:12px;color:#bbb;margin-top:2px">多次田野调查</div></div>'
s1 += '<div class="stat-item"><div class="stat-num o">53.95%</div><div class="stat-label">从未听说灌区</div><div style="font-size:12px;color:#bbb;margin-top:2px">里运河-高邮灌区</div></div>'
s1 += '</div></section>'

# === Section 2: Charts (ECharts) ===
s2 = '<section class="sec" style="background:#faf9f6;max-width:100%;padding-left:0;padding-right:0"><div style="max-width:960px;margin:0 auto;padding:0 24px"><div class="lbl">实地调研数据分析</div><h2 class="tt">调研发现 · 数据说话</h2><p class="sub">基于 215 份有效问卷、10 人次深度访谈及实地观察，揭示高邮多类型遗产认知与保护的真实状况。</p></div>'

# Chart grid - 2 cols on desktop
s2 += '<div class="grid2" style="max-width:960px;margin:0 auto;padding:0 24px">'

# Chart 1: Awareness
s2 += '<div class="cd"><div class="ct" style="font-size:18px">公众对各类型遗产认知度严重分化</div><div class="chart-box" id="c1"></div><div class="info-box"><strong>⚡ 关键发现</strong>非遗知晓率 88.4% 遥遥领先，农业文化遗产仅 16.7%，灌溉工程遗产认知度最低——仅 12.6% 知晓其世界遗产身份。认知格局呈「少数符号被放大、多数内涵被遮蔽」态势。</div></div>'

# Chart 2: Skills
s2 += '<div class="cd"><div class="ct" style="font-size:18px">当地村民对传统技艺的认知率</div><div class="chart-box" id="c2"></div><div class="info-box"><strong>⚡ 关键发现</strong>水产养殖、稻作耕种认知率均超 90%，传统技艺在社区中具活态传承基础。但 <b>50 岁以下群体对传统模式了解显著不足</b>——古法因成本高而绝迹，传承出现断层。</div></div>'

# Chart 3: Value pie
s2 += '<div class="cd"><div class="ct" style="font-size:18px">公众对农业系统价值的认同</div><div class="chart-box" id="c3"></div><div class="info-box"><strong>⚡ 关键发现</strong>83.9% 认同经济价值（促进就业与发展），72.9% 认同教育意义（观光休闲/科普），61.0% 认同生态价值（调节气候/涵养水源）。公众虽了解不多，但价值认同度高。</div></div>'

# Chart 4: Radar
s2 += '<div class="cd"><div class="ct" style="font-size:18px">系统性保护五大维度评估</div><div class="chart-box" id="c4"></div><div class="info-box"><strong>⚡ 关键发现</strong>红线为当前水平，蓝虚线为理想目标。公众认知度（18%）、整体性认知（15%）、部门协同（20%）均极低——多类型遗产的系统性保护仍有巨大提升空间。</div></div>'

# Chart 5: Fragmented knowledge
s2 += '<div class="cd" style="grid-column:1/-1"><div class="ct" style="font-size:18px">知识碎片化：外界对传统技艺的认知</div><div class="chart-box" id="c5"></div><div class="info-box"><strong>⚡ 关键发现</strong>41.57% 的非本地受访者从未接触任何传统技艺。在有所了解的受访者中，认知集中于稻鸭共作（43.5%）和鱼鹰捕鱼（29.0%）两项视觉冲击力强的项目，其余技术鲜为人知。</div></div>'

s2 += '</div></section>'

# === Section 3: Map ===
s3 = '<section class="msec"><div class="lbl" style="text-align:center;padding:0 24px">核心交互体验</div><h2 class="tt" style="text-align:center;padding:0 24px">共生地图 · 水田人</h2><p class="sub" style="text-align:center;padding:0 24px;margin-left:auto;margin-right:auto">灌区闸口调节水位 → 灌溉湿地农田 → 孕育稻鸭鱼蟹 → 滋养非遗文化。<br>点击彩色标记，探索 11 处遗产点位的空间分布与「水—田—人」共生关系。</p>'
s3 += '<div class="mlg"><div class="mli"><span class="md md-b"></span>灌区闸口（5 处）</div><div class="mli"><span class="md md-g"></span>农业遗产（3 处）</div><div class="mli"><span class="md md-r"></span>非遗文化（3 处）</div><div class="mli"><span style="display:inline-block;width:16px;height:0;border-top:1.5px dashed #7eb8da"></span>水脉关联</div></div>'
s3 += '<div class="min"><div class="mc" id="map"></div></div>'
s3 += '<div class="mn">数据来源：高邮实地调研 · 2025 年 8 月 / 2026 年 1 月 · 含灌区闸口 / 农业基地 / 非遗场所</div></section>'

# === Section 4: Pain Points ===
s4 = '<section class="sec"><div class="lbl">调研诊断</div><h2 class="tt">三重困境 · 精准把脉</h2><p class="sub">从「水文生态—农业生产—文化习俗」三个维度系统揭示遗产之间的内在关联，识别三大核心痛点并提出差异化解决方案。</p>'

s4 += '<div class="grid3">'
s4 += '<div class="cd pc" style="background:#fffef9"><div class="pn">01</div><div class="ct" style="color:var(--gld)">文化疏离</div><p class="cp" style="margin-bottom:12px"><b>传承主体之间缺乏共同的文化认同基础。</b></p><p class="cp">农民、渔民、非遗传承人三个群体交流极少。农民对渔俗「七公会」「开捕节」了解甚少，渔民对农耕节庆参与有限。长江禁捕后大量渔民转产上岸，与搬迁地村民日渐生疏——不同群体各守一方文化，却不知它们本为一体。</p><div class="sol">▸ 应对方案</div><p class="cp">建立「遗产融绘」数字平台，以三维地图可视化呈现三类遗产空间分布与交互关联，让不同群体直观感知共生格局，为文化认同构建认知基础。</p></div>'
s4 += '<div class="cd pc" style="background:#f9fcfd"><div class="pn">02</div><div class="ct" style="color:var(--blu)">阐释断裂</div><p class="cp" style="margin-bottom:12px"><b>多类型遗产之间缺乏统一的历史文化叙事。</b></p><p class="cp">水利、农业、文旅、渔政各自为政，旅游开发以单一遗产为核心。有了堰闸才有灌溉，有了灌溉才有稻鸭，有了稻鸭才有民歌——可没人讲述这条完整的故事线。遗产之间的内在关联在管理层面被弱化。</p><div class="sol">▸ 应对方案</div><p class="cp">打造综合文旅 IP，设计「从闸口到餐桌」多类型遗产主题游学路线。以故事线串联三类遗产，统一讲述高邮的文化叙事，修复阐释断裂。</p></div>'
s4 += '<div class="cd pc" style="background:#fef9f9"><div class="pn">03</div><div class="ct" style="color:var(--red)">代际断层</div><p class="cp" style="margin-bottom:12px"><b>青年群体对本地遗产的认知与参与度偏低。</b></p><p class="cp">50 岁以下群体对传统生产模式了解明显不足。古法稻鸭共作因利润低而绝迹，代之以现代集约化养殖。民歌、婚俗、七公会等非遗在年轻人中知晓率骤降。41.57% 非本地受访者从未接触任何传统技艺，文化记忆面临传承危机。</p><div class="sol">▸ 应对方案</div><p class="cp">设计交互式数字游戏，将灌区调水、稻鸭共作、民歌传唱等知识转化为可体验的叙事内容，引导青年在沉浸式互动中理解遗产价值，培植文化认同。</p></div>'
s4 += '</div></section>'

# === Section 5: Outputs ===
s5 = '<section class="sec" style="background:#faf9f6;max-width:100%;padding-left:0;padding-right:0"><div style="max-width:960px;margin:0 auto;padding:0 24px"><div class="lbl">项目成果</div><h2 class="tt">四大产出 · 融绘贯通</h2><p class="sub">以上成果并非相互独立，而是统一于「遗产融绘，魅力高邮」文旅 IP，最终形成可识别、可传播的区域文化品牌，为全国多类型遗产交叠区域提供可复制的范式。</p>'

s5 += '<div class="grid2">'
s5 += '<div class="oc"><div class="oi oi-b">🖥</div><div class="ot"><h4>「遗产融绘，魅力高邮」网站</h4><p>以三维地图等多种形式综合展示高邮湖泊湿地多类型遗产资源分布与交互关联，搭建公众认知的数字化入口。</p></div></div>'
s5 += '<div class="oc"><div class="oi oi-g">🧭</div><div class="ot"><h4>主题游学路线 · 研学课程</h4><p>「从闸口到餐桌」的故事线串联三类遗产，统一讲述高邮的文化故事，提供可落地的研学方案。</p></div></div>'
s5 += '<div class="oc"><div class="oi oi-r">🎮</div><div class="ot"><h4>交互式数字游戏</h4><p>将灌区调水、稻鸭共作、民歌传唱等知识转化为可体验的叙事内容，引导青年在沉浸式互动中理解遗产价值。</p></div></div>'
s5 += '<div class="oc"><div class="oi oi-p">📡</div><div class="ot"><h4>全媒体传播矩阵</h4><p>创立「遗产融汇，魅力高邮」公众号和其他社媒账号，全平台热度达到一定水平，形成区域文化品牌。</p></div></div>'
s5 += '</div>'

s5 += '<div style="margin-top:48px"><div class="cd" style="text-align:center;padding:40px 32px"><h3 style="font-family:var(--serif);font-size:22px;font-weight:700;margin-bottom:20px">从遗产认知到文化品牌——项目逻辑链</h3>'
s5 += '<div class="ch"><div class="cs"><h4>田野调研</h4><p>215 份问卷 · 10 人访谈</p></div><div class="ca">→</div><div class="cs"><h4>三重困境</h4><p>文化疏离 · 阐释断裂 · 代际断层</p></div><div class="ca">→</div><div class="cs"><h4>三大对策</h4><p>数字平台 · 文旅IP · 交互游戏</p></div><div class="ca">→</div><div class="cs"><h4>四大产出</h4><p>网站 · 研学 · 游戏 · 传播</p></div><div class="ca">→</div><div class="cs"><h4>文化品牌</h4><p>「遗产融绘，魅力高邮」</p></div></div>'
s5 += '</div></div></div></section>'

footer = """<footer class="ft"><h3>融绘贯通</h3><p>2026 大学生新文科实践创新大赛 · 文史哲组<br>高邮湖泊湿地多类型遗产系统性保护项目<br><br>项目以青年实践响应文化强国战略，服务乡村振兴，<br>践行新文科「融创赋能、实践致新」的育人目标。</p><p style="margin-top:10px;font-size:12px;color:#bbb">&copy; 2026 融绘贯通项目团队 &nbsp;|&nbsp; 数据来源：高邮实地调研（2025.08 / 2026.01）</p></footer>
"""

# === JavaScript: ECharts + Leaflet ===
js = """<script src="https://cdn.bootcdn.net/ajax/libs/echarts/5.5.0/echarts.min.js"></script>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function(){
var az=function(id,o){var c=echarts.init(document.getElementById(id));c.setOption(o);window.addEventListener('resize',function(){c.resize();});};

az('c1',{tooltip:{trigger:'axis'},grid:{left:'5%',right:'12%',top:'5%',bottom:'5%',containLabel:true},xAxis:{type:'value',max:100,axisLabel:{formatter:'{value}%',fontSize:13}},yAxis:{type:'category',data:['农业文化遗产','非遗(民歌/鸭蛋)','大运河(扬州段)','里运河-高邮灌区'],axisLabel:{fontSize:13,color:'#475569'}},series:[{type:'bar',data:[{value:16.7,itemStyle:{color:'#2d6a4f'}},{value:88.4,itemStyle:{color:'#b23b2c'}},{value:37.2,itemStyle:{color:'#b8860b'}},{value:12.6,itemStyle:{color:'#1b6b93'}}],barWidth:26,itemStyle:{borderRadius:[0,4,4,0]},label:{show:true,position:'right',formatter:'{c}%',fontSize:14,color:'#475569',fontWeight:'bold'}}]});

az('c2',{tooltip:{trigger:'axis'},grid:{left:'5%',right:'12%',top:'5%',bottom:'5%',containLabel:true},xAxis:{type:'value',max:100,axisLabel:{formatter:'{value}%',fontSize:13}},yAxis:{type:'category',data:['水产养殖','稻作耕种','稻鸭共作','鱼鹰捕鱼','鱼类混养'],axisLabel:{fontSize:13,color:'#475569'}},series:[{type:'bar',data:[{value:93.5,itemStyle:{color:'#2d6a4f'}},{value:91.2,itemStyle:{color:'#2d6a4f'}},{value:75.8,itemStyle:{color:'#b8860b'}},{value:72.3,itemStyle:{color:'#b8860b'}},{value:70.5,itemStyle:{color:'#b8860b'}}],barWidth:22,itemStyle:{borderRadius:[0,4,4,0]},label:{show:true,position:'right',formatter:'{c}%',fontSize:14,color:'#475569',fontWeight:'bold'}}]});

az('c3',{tooltip:{trigger:'item'},legend:{bottom:0,textStyle:{fontSize:13,color:'#64748b'}},series:[{type:'pie',radius:['52%','76%'],center:['50%','42%'],itemStyle:{borderRadius:6,borderColor:'#fff',borderWidth:2},label:{show:true,fontSize:13,color:'#475569'},emphasis:{scale:true,scaleSize:8},data:[{value:83.9,name:'促进就业与经济发展'},{value:72.9,name:'观光休闲/科普教育'},{value:61.0,name:'调节气候/涵养水源'}]}],color:['#1b6b93','#2d6a4f','#b8860b']});

az('c4',{radar:{center:['50%','52%'],radius:'62%',indicator:[{name:'公众认知度',max:100},{name:'跨群体交流',max:100},{name:'部门协同',max:100},{name:'青年参与',max:100},{name:'整体性认知',max:100}],axisName:{fontSize:12,color:'#64748b'}},series:[{type:'radar',data:[{value:[18,25,20,30,15],name:'当前水平',areaStyle:{color:'rgba(192,57,43,.15)'},lineStyle:{color:'#b23b2c',width:2},itemStyle:{color:'#b23b2c'}},{value:[70,70,70,70,70],name:'理想水平',areaStyle:{color:'rgba(27,107,147,.08)'},lineStyle:{color:'#1b6b93',width:2,type:'dashed'},itemStyle:{color:'#1b6b93'}}]}]});

az('c5',{tooltip:{trigger:'axis'},grid:{left:'5%',right:'12%',top:'5%',bottom:'5%',containLabel:true},xAxis:{type:'value',max:50,axisLabel:{formatter:'{value}%',fontSize:13}},yAxis:{type:'category',data:['从未接触','稻鸭共作','鱼鹰捕鱼','鱼类混养','鱼虾蟹混养','鱼鸭混养'],axisLabel:{fontSize:13,color:'#475569'}},series:[{type:'bar',data:[{value:41.57,itemStyle:{color:'#b23b2c'}},{value:43.5,itemStyle:{color:'#2d6a4f'}},{value:29.0,itemStyle:{color:'#2d6a4f'}},{value:11.3,itemStyle:{color:'#1b6b93'}},{value:6.5,itemStyle:{color:'#1b6b93'}},{value:9.7,itemStyle:{color:'#1b6b93'}}],barWidth:22,itemStyle:{borderRadius:[0,4,4,0]},label:{show:true,position:'right',formatter:'{c}%',fontSize:14,color:'#475569',fontWeight:'bold'}}]});

// ===== LEAFLET MAP =====
var m=L.map('map',{center:[32.82,119.42],zoom:11,zoomControl:true,attributionControl:false});
L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',{subdomains:'1234',maxZoom:18,attribution:'高德地图'}).addTo(m);
var C={gate:'#1b6b93',farm:'#2d6a4f',culture:'#b23b2c'};
function d(c){return L.divIcon({className:'',html:'<div style="width:16px;height:16px;border-radius:50%;background:'+c+';box-shadow:0 0 12px '+c+'80;border:2.5px solid white;cursor:pointer;transition:transform .2s" onmouseover="this.style.transform=\\'scale(1.4)\\'" onmouseout="this.style.transform=\\'scale(1)\\'"></div>',iconSize:[16,16],iconAnchor:[8,8]});}
function p(n,t,s){return '<b>'+n+'</b><br><small style="color:#999">'+t+'</small><br><span style="font-size:14px;color:#555">'+s+'</span>';}

[{n:'平津堰',a:32.79,o:119.43,y:'唐',s:'始建于唐代的活态水利工程，大运河扬州段最古老的水利设施之一。'},
 {n:'南关坝',a:32.775,o:119.452,y:'明',s:'灌区核心调控工程，位于高邮城南，古代水利智慧的典范。'},
 {n:'车逻闸',a:32.738,o:119.468,y:'明/清',s:'里运河-高邮灌区代表性闸口，至今仍发挥灌溉调控作用。'},
 {n:'子婴闸',a:32.948,o:119.368,y:'清',s:'灌区北部关键闸口，调节里运河与灌区之间的水位。'},
 {n:'界首小闸',a:32.918,o:119.425,y:'清',s:'界首镇附近灌区闸口，服务周边农业灌溉。'}].forEach(function(s){L.marker([s.a,s.o],{icon:d(C.gate)}).bindPopup(p(s.n,'灌区闸口 · '+s.y,s.s)).addTo(m);});

[{n:'永安村稻鸭共作区',a:32.885,o:119.418,y:'核心区',s:'界首镇永安村，稻鸭鱼蟹共作模式的核心实践区，传统农技传承基地。'},
 {n:'沿湖村生态农业区',a:32.658,o:119.355,y:'缓冲区',s:'方巷镇沿湖村，「最美渔村」，渔文化与生态农业融合发展示范区。'},
 {n:'高邮鸭养殖基地',a:32.792,o:119.455,y:'企业',s:'国家地理标志物种高邮鸭的保种与养殖基地。'}].forEach(function(s){L.marker([s.a,s.o],{icon:d(C.farm)}).bindPopup(p(s.n,'农业遗产 · '+s.y,s.s)).addTo(m);});

[{n:'高邮民歌传习所',a:32.782,o:119.445,y:'国家级',s:'国家级非遗高邮民歌的传承基地，《数鸭蛋》入选中小学音乐教材。'},
 {n:'芦苇荡湿地公园',a:32.835,o:119.285,y:'景区',s:'高邮湖滩郊野公园，集生态观光与非遗展示于一体。'},
 {n:'渔民祭祀文化区',a:32.845,o:119.35,y:'民俗',s:'开捕节、七公会等传统渔俗的主要活动区域。'}].forEach(function(s){L.marker([s.a,s.o],{icon:d(C.culture)}).bindPopup(p(s.n,'非遗文化 · '+s.y,s.s)).addTo(m);});

// Lake polygon
L.polygon([[32.95,119.25],[32.98,119.35],[32.92,119.48],[32.85,119.52],[32.72,119.48],[32.62,119.42],[32.6,119.3],[32.68,119.2],[32.78,119.18],[32.88,119.22],[32.95,119.25]],{color:'#1b6b93',weight:2.5,opacity:.4,fillColor:'#1b6b93',fillOpacity:.08}).addTo(m);

// Connection lines
[[[32.79,119.43],[32.738,119.468],[32.885,119.418]],
 [[32.775,119.452],[32.792,119.455],[32.782,119.445]],
 [[32.948,119.368],[32.918,119.425],[32.885,119.418]],
 [[32.885,119.418],[32.658,119.355],[32.845,119.35]]].forEach(function(c){L.polyline(c,{color:'#7eb8da',weight:2,opacity:.45,dashArray:'5 8'}).addTo(m);});
})();
</script></body></html>"""

full = page + hero + s1 + s2 + s3 + s4 + s5 + footer + js

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(full)

print(f'OK: {len(full)} bytes')
print(f'  ECharts: {"echarts" in full}')
print(f'  Leaflet map: {"L.map" in full}')
print(f'  Hero: {"hero" in full}')
