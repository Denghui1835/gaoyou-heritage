import os

page = """<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="description" content="高邮湖泊湿地集农业文化遗产、世界灌溉工程遗产、非物质文化遗产于一体。"><link rel="icon" type="image/svg+xml" href="./favicon.svg"><title>遗产融绘 · 魅力高邮</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Serif+SC:wght@600;700;900&display=swap" rel="stylesheet"><style>
:root{--ink:#1a1a2e;--warm:#faf8f5;--card:#fff;--border:#e8e4df;--serif:'Noto Serif SC','Source Han Serif SC','STSong',serif;--sans:'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif;--grn:#2d6a4f;--blu:#1b6b93;--red:#b23b2c;--gld:#b8860b}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:var(--sans);background:var(--warm);color:var(--ink);line-height:1.85}
.sec{padding:64px 20px;max-width:680px;margin:0 auto}
.lbl{font-size:14px;letter-spacing:.3em;color:#a0a0a0;text-transform:uppercase;margin-bottom:12px}
.tt{font-family:var(--serif);font-size:28px;font-weight:700;line-height:1.4;margin-bottom:16px}
.sub{font-size:17px;color:#666;line-height:1.8;margin-bottom:32px}
.cd{background:var(--card);border-radius:16px;padding:32px 24px;margin-bottom:24px;box-shadow:0 1px 3px rgba(0,0,0,.04);border:1px solid var(--border)}
.ct{font-family:var(--serif);font-size:22px;font-weight:700;margin-bottom:8px}
.cp{font-size:16px;color:#555;line-height:1.9}
.tg{display:inline-block;font-size:13px;padding:4px 12px;border-radius:20px;margin:4px 4px 4px 0;font-weight:500}
.tg-g{background:#e8f5e9;color:var(--grn)}.tg-b{background:#e3f2fd;color:var(--blu)}.tg-r{background:#ffebee;color:var(--red)}
.sg{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:32px}
.si{text-align:center;padding:20px 12px;background:white;border-radius:12px;border:1px solid var(--border)}
.sn{font-family:var(--serif);font-size:32px;font-weight:700;line-height:1.1}
.sn-g{color:var(--grn)}.sn-b{color:var(--blu)}.sn-r{color:var(--red)}.sn-o{color:var(--gld)}
.sl{font-size:14px;color:#888;margin-top:4px}
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:40px 20px;background:linear-gradient(170deg,#0f0f1a 0%,#1a2740 40%,#1a3a2a 100%);position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 25% 60%,rgba(27,107,147,.12) 0%,transparent 55%),radial-gradient(ellipse at 65% 40%,rgba(45,106,79,.08) 0%,transparent 50%)}
.hb{color:rgba(255,255,255,.55);font-size:13px;letter-spacing:.25em;margin-bottom:24px}
.ht{font-family:var(--serif);font-size:42px;font-weight:900;letter-spacing:.04em;line-height:1.2;margin-bottom:12px;background:linear-gradient(180deg,#eef4fb 0%,#8ec8e3 35%,#4aab73 75%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hs{font-size:20px;font-weight:300;color:rgba(255,255,255,.7);margin-bottom:8px;letter-spacing:.05em}
.hl{font-size:16px;color:rgba(255,255,255,.35)}
.hd{width:48px;height:2px;background:linear-gradient(90deg,#4aab73,#1b6b93);margin:28px auto;border-radius:1px}
.hsc{position:absolute;bottom:40px;color:rgba(255,255,255,.3);font-size:14px;animation:float 2s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
.msec{padding:64px 0 48px;max-width:680px;margin:0 auto}.min{margin:0 20px}
.mc{width:100%;height:400px;border-radius:16px;overflow:hidden;border:1px solid var(--border);box-shadow:0 4px 24px rgba(0,0,0,.04);background:#e8f0f4}
.mlg{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;margin:20px 0 12px}
.mli{display:flex;align-items:center;gap:6px;font-size:14px;color:#666}
.md{width:10px;height:10px;border-radius:50%}
.md-b{background:var(--blu)}.md-g{background:var(--grn)}.md-r{background:var(--red)}
.mn{text-align:center;font-size:13px;color:#aaa;margin-top:12px}
.pc{border-left:3px solid transparent}
.pc:nth-child(1){border-left-color:var(--gld)}.pc:nth-child(2){border-left-color:var(--blu)}.pc:nth-child(3){border-left-color:var(--red)}
.pn{font-family:var(--serif);font-size:48px;font-weight:900;color:#e8e4df;line-height:1;margin-bottom:-8px}
.sol{font-size:13px;font-weight:700;letter-spacing:.1em;color:#999;text-transform:uppercase;margin:20px 0 6px}
.og{display:grid;gap:16px}
.oc{display:flex;align-items:flex-start;gap:16px;background:white;border-radius:12px;padding:24px;border:1px solid var(--border)}
.oi{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.oi-g{background:#e8f5e9;color:var(--grn)}.oi-b{background:#e3f2fd;color:var(--blu)}.oi-r{background:#ffebee;color:var(--red)}.oi-p{background:#f3e5f5;color:#7b1fa2}
.ot h4{font-size:17px;font-weight:600;margin-bottom:4px}.ot p{font-size:15px;color:#666;line-height:1.7}
.ch{display:flex;flex-direction:column;align-items:center;gap:8px;margin-top:8px}
.cs{background:white;border:1px solid var(--border);border-radius:12px;padding:16px 24px;width:100%;text-align:center}
.cs h4{font-size:17px;font-weight:600;margin-bottom:2px}.cs p{font-size:14px;color:#888}.ca{font-size:20px;color:#ccc}
.ft{text-align:center;padding:48px 20px 40px;border-top:1px solid var(--border)}
.ft h3{font-family:var(--serif);font-size:22px;font-weight:700;margin-bottom:8px}.ft p{font-size:14px;color:#999;line-height:1.7}
.chart-wrap{margin:16px 0}
.bar-row{display:flex;align-items:center;margin:6px 0;gap:8px;font-size:13px}
.bar-label{width:115px;text-align:right;color:#666;flex-shrink:0}
.bar-track{flex:1;height:26px;background:#f0f0f0;border-radius:4px;overflow:hidden}
.bar-fill{height:100%;border-radius:4px;display:flex;align-items:center;justify-content:flex-end;padding-right:6px;font-size:12px;font-weight:700;color:#fff;min-width:0}
.bar-val{width:48px;text-align:left;color:#555;font-size:13px;font-weight:600;flex-shrink:0}
.info-box{background:#fff;border-radius:12px;padding:16px;margin-top:12px;font-size:14px;line-height:1.8;color:#666;border:1px solid var(--border)}
.info-box strong{display:block;font-size:16px;color:var(--ink);margin-bottom:4px}
@media(min-width:768px){.ht{font-size:56px}.hs{font-size:24px}.tt{font-size:32px}.og{grid-template-columns:1fr 1fr}.ch{flex-direction:row}.bar-label{width:130px}}
</style></head><body>"""

head = page
footer = """<footer class="ft"><h3>融绘贯通</h3><p>2026 大学生新文科实践创新大赛 · 文史哲组<br>高邮湖泊湿地多类型遗产系统性保护项目</p><p style="margin-top:8px;font-size:12px;color:#bbb">&copy; 2026 融绘贯通项目团队</p></footer>"""

maps_js = """<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function(){
var m=L.map('map',{center:[32.82,119.42],zoom:11,zoomControl:true,attributionControl:false});
L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',{subdomains:'1234',maxZoom:18}).addTo(m);
var C={gate:'#1b6b93',farm:'#2d6a4f',culture:'#b23b2c'};
function d(c){return L.divIcon({className:'',html:'<div style="width:14px;height:14px;border-radius:50%;background:'+c+';box-shadow:0 0 10px '+c+'80;border:2px solid white;cursor:pointer"></div>',iconSize:[14,14],iconAnchor:[7,7]});}
function p(n,t,s){return '<b>'+n+'</b><br><small style="color:#999">'+t+'</small><br><span style="font-size:14px">'+s+'</span>';}
[{n:'车逻闸',a:32.738,o:119.468,y:'明/清',s:'灌区代表性闸口。'},{n:'南关坝',a:32.775,o:119.452,y:'明',s:'核心调控工程。'},{n:'子婴闸',a:32.948,o:119.368,y:'清',s:'灌区北部关键闸口。'},{n:'界首小闸',a:32.918,o:119.425,y:'清',s:'界首镇灌区闸口。'},{n:'平津堰',a:32.790,o:119.430,y:'唐',s:'始建于唐代的活态水利工程。'}].forEach(function(s){L.marker([s.a,s.o],{icon:d(C.gate)}).bindPopup(p(s.n,'灌区闸口',s.s)).addTo(m);});
[{n:'永安村稻鸭共作区',a:32.885,o:119.418,y:'核心区',s:'稻鸭鱼蟹共作核心实践区。'},{n:'沿湖村生态农业区',a:32.658,o:119.355,y:'缓冲区',s:'最美渔村，渔文化与农业融合示范区。'},{n:'高邮鸭养殖基地',a:32.792,o:119.455,y:'企业',s:'国家地理标志物种保种基地。'}].forEach(function(s){L.marker([s.a,s.o],{icon:d(C.farm)}).bindPopup(p(s.n,'农业遗产',s.s)).addTo(m);});
[{n:'高邮民歌传习所',a:32.782,o:119.445,y:'国家级',s:'高邮民歌传承基地。'},{n:'芦苇荡湿地公园',a:32.835,o:119.285,y:'景区',s:'高邮湖滩郊野公园。'},{n:'渔民祭祀文化区',a:32.845,o:119.350,y:'民俗',s:'开捕节、七公会等渔俗活动区。'}].forEach(function(s){L.marker([s.a,s.o],{icon:d(C.culture)}).bindPopup(p(s.n,'非遗文化',s.s)).addTo(m);});
L.polygon([[32.95,119.25],[32.98,119.35],[32.92,119.48],[32.85,119.52],[32.72,119.48],[32.62,119.42],[32.6,119.3],[32.68,119.2],[32.78,119.18],[32.88,119.22],[32.95,119.25]],{color:'#1b6b93',weight:2,opacity:.35,fillColor:'#1b6b93',fillOpacity:.06}).addTo(m);
[[[32.79,119.43],[32.738,119.468],[32.885,119.418]],[[32.775,119.452],[32.792,119.455],[32.782,119.445]],[[32.948,119.368],[32.918,119.425],[32.885,119.418]],[[32.885,119.418],[32.658,119.355],[32.845,119.35]]].forEach(function(c){L.polyline(c,{color:'#7eb8da',weight:1.5,opacity:.5,dashArray:'4 6'}).addTo(m);});
})();</script></body></html>"""

# Build the body sections
body = ""
# Hero
body += '<section class="hero"><div class="hb">2026 大学生新文科实践创新大赛 · 文史哲组</div><h1 class="ht">融绘贯通</h1><p class="hs">多类型遗产系统性保护利用的路径探索与实践</p><div class="hd"></div><p class="hl">高邮湖泊湿地 — 农业文化遗产 · 世界灌溉工程遗产 · 非物质文化遗产</p><div class="hsc">向下探索 ▼</div></section>'

# Section 1: Three heritages
body += '<section class="sec"><div class="lbl">项目简介</div><h2 class="tt">三类遗产，共生共存</h2><p class="sub">高邮湖泊湿地是国内罕见的多类型遗产高度复合区——农业文化遗产、世界灌溉工程遗产、非物质文化遗产在「水—田—人」的脉络中深度交织，构成一个活态的文化生态系统。</p>'

body += '<div class="cd" style="border-left:3px solid var(--grn)"><div class="ct" style="color:var(--grn)">中国重要农业文化遗产 <span style="font-size:14px;color:#999;font-weight:400">· 2017 年入选</span></div><p class="cp">以<b>「稻鸭鱼蟹」立体共作</b>模式为核心，是传统农耕文明的活态见证。公众整体认知度仅 16.7%，但<b>当地村民对传统技艺的认知率极高</b>——水产养殖 93.5%、稻作耕种 91.2%、稻鸭共作 75.8%。</p><div style="margin-top:12px"><span class="tg tg-g">稻鸭鱼蟹共作</span><span class="tg tg-g">水产养殖</span><span class="tg tg-g">鱼鹰捕鱼</span><span class="tg tg-g">种质资源</span></div></div>'

body += '<div class="cd" style="border-left:3px solid var(--blu)"><div class="ct" style="color:var(--blu)">世界灌溉工程遗产 <span style="font-size:14px;color:#999;font-weight:400">· 2021 年入选</span></div><p class="cp">里运河-高邮灌区是古代利用河湖水位调控灌溉的<b>工程典范</b>。平津堰（唐）、南关坝（明）至今仍发挥灌溉作用。但<b>53.95% 受访者从未听说该灌区</b>，仅 1% 对其功能有深入了解。</p><div style="margin-top:12px"><span class="tg tg-b">平津堰（唐）</span><span class="tg tg-b">南关坝（明）</span><span class="tg tg-b">车逻闸</span><span class="tg tg-b">子婴闸</span></div></div>'

body += '<div class="cd" style="border-left:3px solid var(--red)"><div class="ct" style="color:var(--red)">非物质文化遗产 <span style="font-size:14px;color:#999;font-weight:400">· 国家级+省级</span></div><p class="cp">高邮民歌（国家级非遗）入选小学教材，咸鸭蛋制作技艺（省级非遗）闻名全国。知晓率 88.37%，但认知停留在「鸭蛋」「民歌」标签——七公会知晓率仅 10%。</p><div style="margin-top:12px"><span class="tg tg-r">高邮民歌</span><span class="tg tg-r">咸鸭蛋制作</span><span class="tg tg-r">十二红</span><span class="tg tg-r">七公会</span></div></div>'

body += '<div class="sg"><div class="si"><div class="sn sn-g">215</div><div class="sl">份有效问卷<br><span style="font-size:12px;color:#aaa">回收率 90.7%</span></div></div><div class="si"><div class="sn sn-b">10</div><div class="sl">人次深度访谈<br><span style="font-size:12px;color:#aaa">含政府/企业/村民</span></div></div><div class="si"><div class="sn sn-r">800+</div><div class="sl">张实地照片<br><span style="font-size:12px;color:#aaa">多次田野调查</span></div></div><div class="si"><div class="sn sn-o">53.95%</div><div class="sl">从未听说灌区<br><span style="font-size:12px;color:#aaa">里运河-高邮灌区</span></div></div></div></section>'

# Section 2: Data Insights (inline SVG-style CSS bar charts)
body += '<section class="sec"><div class="lbl">实地调研数据分析</div><h2 class="tt">调研发现 · 数据说话</h2><p class="sub">基于 215 份有效问卷、10 人次深度访谈及实地观察，揭示高邮多类型遗产认知与保护的真实状况。</p>'

# Chart 1: Awareness
body += '<div class="cd"><div class="ct" style="font-size:18px">公众对各类型遗产认知度严重分化</div>'
body += '<div class="chart-wrap">'
body += '<div class="bar-row"><span class="bar-label">农业文化遗产</span><div class="bar-track"><div class="bar-fill" style="width:16.7%;background:#2d6a4f"></div></div><span class="bar-val">16.7%</span></div>'
body += '<div class="bar-row"><span class="bar-label">非遗(民歌/鸭蛋)</span><div class="bar-track"><div class="bar-fill" style="width:88.4%;background:#b23b2c">88.4%</div></div><span class="bar-val"></span></div>'
body += '<div class="bar-row"><span class="bar-label">大运河(扬州段)</span><div class="bar-track"><div class="bar-fill" style="width:37.2%;background:#b8860b"></div></div><span class="bar-val">37.2%</span></div>'
body += '<div class="bar-row"><span class="bar-label">里运河-高邮灌区</span><div class="bar-track"><div class="bar-fill" style="width:12.6%;background:#1b6b93"></div></div><span class="bar-val">12.6%</span></div>'
body += '</div><div class="info-box"><strong>关键发现</strong>非遗知晓率 88.4% 遥遥领先，灌溉工程遗产认知度最低。认知格局呈「少数符号被放大、多数内涵被遮蔽」态势。</div></div>'

# Chart 2: Skills
body += '<div class="cd"><div class="ct" style="font-size:18px">当地村民对传统技艺的认知率</div>'
body += '<div class="chart-wrap">'
body += '<div class="bar-row"><span class="bar-label">水产养殖</span><div class="bar-track"><div class="bar-fill" style="width:93.5%;background:#2d6a4f">93.5%</div></div><span class="bar-val"></span></div>'
body += '<div class="bar-row"><span class="bar-label">稻作耕种</span><div class="bar-track"><div class="bar-fill" style="width:91.2%;background:#27ae60">91.2%</div></div><span class="bar-val"></span></div>'
body += '<div class="bar-row"><span class="bar-label">稻鸭共作</span><div class="bar-track"><div class="bar-fill" style="width:75.8%;background:#b8860b">75.8%</div></div><span class="bar-val"></span></div>'
body += '<div class="bar-row"><span class="bar-label">鱼鹰捕鱼</span><div class="bar-track"><div class="bar-fill" style="width:72.3%;background:#d4a017">72.3%</div></div><span class="bar-val"></span></div>'
body += '<div class="bar-row"><span class="bar-label">鱼类混养</span><div class="bar-track"><div class="bar-fill" style="width:70.5%;background:#e6b800">70.5%</div></div><span class="bar-val"></span></div>'
body += '</div><div class="info-box"><strong>关键发现</strong>水产养殖、稻作耕种认知率均超 90%。但 <b>50 岁以下群体对传统模式了解显著不足</b>——古法因成本高而绝迹，传承出现断层。</div></div>'

# Chart 3: Value
body += '<div class="cd"><div class="ct" style="font-size:18px">公众对农业系统价值的认同</div>'
body += '<div class="pie-info" style="text-align:center;font-size:14px;color:#666;line-height:2.2;margin-top:8px">'
body += '<span style="color:#1b6b93;font-weight:700;font-size:24px">83.9%</span><br>认为可促进就业与经济发展<br><br>'
body += '<span style="color:#2d6a4f;font-weight:700;font-size:24px">72.9%</span><br>认为可提供观光休闲与科普教育<br><br>'
body += '<span style="color:#b8860b;font-weight:700;font-size:24px">61.0%</span><br>认为可调节气候、涵养水源'
body += '</div><div class="info-box"><strong>关键发现</strong>公众虽了解不多但对遗产价值认同度高——83.9%认同经济价值，72.9%认同教育意义，61.0%认同生态价值。</div></div>'

# Chart 4: Radar
body += '<div class="cd"><div class="ct" style="font-size:18px">系统性保护五大维度评估</div>'
body += '<div class="chart-wrap">'
body += '<div class="bar-row"><span class="bar-label">公众认知度</span><div class="bar-track"><div class="bar-fill" style="width:18%;background:#b23b2c"></div></div><span class="bar-val">18%</span></div>'
body += '<div class="bar-row"><span class="bar-label">跨群体交流</span><div class="bar-track"><div class="bar-fill" style="width:25%;background:#c0392b"></div></div><span class="bar-val">25%</span></div>'
body += '<div class="bar-row"><span class="bar-label">部门协同</span><div class="bar-track"><div class="bar-fill" style="width:20%;background:#e74c3c"></div></div><span class="bar-val">20%</span></div>'
body += '<div class="bar-row"><span class="bar-label">青年参与</span><div class="bar-track"><div class="bar-fill" style="width:30%;background:#e67e22"></div></div><span class="bar-val">30%</span></div>'
body += '<div class="bar-row"><span class="bar-label">整体性认知</span><div class="bar-track"><div class="bar-fill" style="width:15%;background:#c0392b"></div></div><span class="bar-val">15%</span></div>'
body += '</div><div class="info-box"><strong>关键发现</strong>各项指标均处极低水平——多类型遗产的系统性保护仍有巨大提升空间。</div></div>'

# Chart 5: Fragmented knowledge
body += '<div class="cd"><div class="ct" style="font-size:18px">知识碎片化：外界对传统技艺的认知</div>'
body += '<div class="chart-wrap">'
body += '<div class="bar-row"><span class="bar-label">从未接触</span><div class="bar-track"><div class="bar-fill" style="width:83%;background:#b23b2c">41.57%</div></div><span class="bar-val"></span></div>'
body += '<div class="bar-row"><span class="bar-label">稻鸭共作</span><div class="bar-track"><div class="bar-fill" style="width:87%;background:#2d6a4f">43.5%</div></div><span class="bar-val"></span></div>'
body += '<div class="bar-row"><span class="bar-label">鱼鹰捕鱼</span><div class="bar-track"><div class="bar-fill" style="width:58%;background:#27ae60">29.0%</div></div><span class="bar-val"></span></div>'
body += '<div class="bar-row"><span class="bar-label">鱼类混养</span><div class="bar-track"><div class="bar-fill" style="width:22.6%;background:#1b6b93"></div></div><span class="bar-val">11.3%</span></div>'
body += '<div class="bar-row"><span class="bar-label">鱼虾蟹混养</span><div class="bar-track"><div class="bar-fill" style="width:13%;background:#2980b9"></div></div><span class="bar-val">6.5%</span></div>'
body += '<div class="bar-row"><span class="bar-label">鱼鸭混养</span><div class="bar-track"><div class="bar-fill" style="width:19.4%;background:#3498db"></div></div><span class="bar-val">9.7%</span></div>'
body += '</div><div class="info-box"><strong>关键发现</strong>41.57% 非本地受访者从未接触任何传统技艺。认知集中于稻鸭共作和鱼鹰捕鱼两项视觉冲击力强的项目，其余技术鲜为人知。</div></div>'
body += '</section>'

# Section 3: Map
body += '<section class="msec"><div class="lbl" style="text-align:center;padding:0 20px">核心交互体验</div><h2 class="tt" style="text-align:center;padding:0 20px">共生地图 · 水田人</h2><p class="sub" style="text-align:center;padding:0 20px">灌区闸口调节水位 → 灌溉湿地农田 → 孕育稻鸭鱼蟹 → 滋养非遗文化。点击彩色标记，探索三类遗产的空间分布与共生密码。</p>'
body += '<div class="mlg"><div class="mli"><span class="md md-b"></span>灌区闸口</div><div class="mli"><span class="md md-g"></span>农业遗产</div><div class="mli"><span class="md md-r"></span>非遗文化</div><div class="mli"><span style="width:14px;height:0;border-top:1.5px dashed #7eb8da;display:inline-block"></span>水脉关联</div></div>'
body += '<div class="min"><div class="mc" id="map"></div></div>'
body += '<div class="mn">数据来源：高邮实地调研 · 11 个点位 · 含灌区闸口/农业基地/非遗场所</div></section>'

# Section 4: Three Pain Points
body += '<section class="sec"><div class="lbl">调研诊断</div><h2 class="tt">三重困境 · 精准把脉</h2><p class="sub">从「水文生态—农业生产—文化习俗」三个维度系统揭示遗产内在关联，识别三大核心痛点并提出差异化解决方案。</p>'

body += '<div class="cd pc"><div class="pn">01</div><div class="ct" style="color:var(--gld)">文化疏离</div><p class="cp" style="margin-bottom:12px"><b>传承主体之间缺乏共同的文化认同基础。</b></p><p class="cp">农民、渔民、非遗传承人交流极少。禁捕后渔民转产上岸，不同群体各守一方文化却不知它们本为一体。</p><div class="sol">▸ 应对方案</div><p class="cp">建立数字平台，以地图可视化呈现三类遗产空间分布与交互关联，让群体直观感知共生格局。</p></div>'

body += '<div class="cd pc"><div class="pn">02</div><div class="ct" style="color:var(--blu)">阐释断裂</div><p class="cp" style="margin-bottom:12px"><b>多类型遗产缺乏统一的历史文化叙事。</b></p><p class="cp">有了堰闸才有灌溉，有了灌溉才有稻鸭，有了稻鸭才有民歌——可没人讲述这条完整的故事线。</p><div class="sol">▸ 应对方案</div><p class="cp">打造「从闸口到餐桌」文旅 IP，统合三类遗产讲述统一的高邮文化叙事。</p></div>'

body += '<div class="cd pc"><div class="pn">03</div><div class="ct" style="color:var(--red)">代际断层</div><p class="cp" style="margin-bottom:12px"><b>青年群体对本地遗产的认知与参与度偏低。</b></p><p class="cp">50 岁以下群体对传统生产模式了解不足。古法稻鸭共作因成本高绝迹，民歌婚俗在年轻人中知晓率骤降。41.57% 非本地受访者从未接触任何传统技艺。</p><div class="sol">▸ 应对方案</div><p class="cp">设计交互式数字游戏，将调水、稻鸭共作、民歌传唱转化为沉浸式叙事体验。</p></div></section>'

# Section 5: Outputs
body += '<section class="sec"><div class="lbl">项目成果</div><h2 class="tt">四大产出 · 融绘贯通</h2><p class="sub">各项产出统一于「遗产融绘，魅力高邮」文旅 IP，形成可识别可传播的区域文化品牌。</p>'
body += '<div class="og">'
body += '<div class="oc"><div class="oi oi-b">&#x1F5A5;</div><div class="ot"><h4>「遗产融绘」网站</h4><p>地图可视化呈现遗产空间分布与交互关联。</p></div></div>'
body += '<div class="oc"><div class="oi oi-g">&#x1F9ED;</div><div class="ot"><h4>主题游学路线 · 研学课程</h4><p>「从闸口到餐桌」的故事线串联三类遗产。</p></div></div>'
body += '<div class="oc"><div class="oi oi-r">&#x1F3AE;</div><div class="ot"><h4>交互式数字游戏</h4><p>将调水、稻鸭共作、民歌传唱转化为沉浸式叙事。</p></div></div>'
body += '<div class="oc"><div class="oi oi-p">&#x1F4E1;</div><div class="ot"><h4>全媒体传播矩阵</h4><p>公众号 + 社媒 + 统一文旅IP，形成区域文化品牌。</p></div></div>'
body += '</div>'

body += '<div style="margin-top:40px"><div class="cd" style="text-align:center"><h3 style="font-family:var(--serif);font-size:20px;font-weight:700;margin-bottom:16px">项目逻辑链</h3>'
body += '<div class="ch"><div class="cs"><h4>田野调研</h4><p>215 份问卷 · 10 人访谈</p></div><div class="ca">→</div><div class="cs"><h4>三重困境</h4><p>文化疏离·阐释断裂·代际断层</p></div><div class="ca">→</div><div class="cs"><h4>三大对策</h4><p>数字平台·文旅IP·交互游戏</p></div><div class="ca">→</div><div class="cs"><h4>四大产出</h4><p>网站·研学·游戏·传播</p></div><div class="ca">→</div><div class="cs"><h4>文化品牌</h4><p>「遗产融绘，魅力高邮」</p></div></div>'
body += '</div></div></section>'

# Assemble
full = head + body + footer + maps_js

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(full)

print(f'OK: {len(full)} bytes')
print(f'  Charts: {"bar-row" in full}')
print(f'  Map: {"Gaode" in full or "autonavi" in full}')
print(f'  Hero: {"hero" in full}')
print(f'  No ECharts CDN: {"echarts" not in full}')
