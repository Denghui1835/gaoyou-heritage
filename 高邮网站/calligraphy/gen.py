# -*- coding: utf-8 -*-
"""生成手写毛笔书法字 SVG 变体"""
import os, html

OUT = os.path.dirname(os.path.abspath(__file__))

def variant(name, font_family, seed, scale, fly_strength, mask_alpha, font_weight="700"):
    """一个书法变体 SVG"""
    W, H = 2800, 460
    filter_id = "br" + name.replace("v","")
    svg = f'''<svg viewBox="0 0 {W} {H}" width="{W}" height="{H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="{W}" height="{H}" fill="#ffffff"/>
  <defs>
    <filter id="{filter_id}" x="-12%" y="-25%" width="124%" height="160%">
      <!-- 粗湍流：笔触毛边 -->
      <feTurbulence type="fractalNoise" baseFrequency="0.02 0.12" numOctaves="4" seed="{seed}" result="n1"/>
      <feDisplacementMap in="SourceGraphic" in2="n1" scale="{scale}" xChannelSelector="R" yChannelSelector="G" result="d1"/>
      <!-- 细湍流：墨色浓淡 / 飞白枯笔 -->
      <feTurbulence type="fractalNoise" baseFrequency="0.16 0.5" numOctaves="3" seed="{seed+3}" result="n2"/>
      <feColorMatrix in="n2" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  {fly_strength} 0 0 0 {mask_alpha}" result="m2"/>
      <feComposite in="d1" in2="m2" operator="in" result="d2"/>
      <!-- 墨晕：轻微羽化 + 压深 -->
      <feGaussianBlur in="d2" stdDeviation="1.1" result="b1"/>
      <feComponentTransfer in="b1" result="b2">
        <feFuncA type="table" tableValues="0 0.28 0.75 1 1"/>
      </feComponentTransfer>
      <!-- 边沿二次毛化：枯笔飞白小缺口 -->
      <feTurbulence type="fractalNoise" baseFrequency="0.05 0.22" numOctaves="2" seed="{seed+7}" result="n3"/>
      <feDisplacementMap in="b2" in2="n3" scale="{scale*0.55}" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
  <text x="{W/2}" y="{H*0.60}" font-family="{html.escape(font_family)},STXingkai,KaiTi,serif" font-weight="{font_weight}"
        font-size="300" text-anchor="middle" fill="#000000" filter="url(#{filter_id})" letter-spacing="0.02em">
    <tspan>遗产融绘</tspan>
    <tspan dx="70" font-size="120" dy="-120">·</tspan>
    <tspan dx="120" dy="120">魅力高邮</tspan>
  </text>
</svg>'''
    return svg

variants = {
    "v1": dict(font_family="FZShuTi",    seed=11, scale=18, fly_strength="0.45 0 0 0.7 0.15", mask_alpha="0.35"),
    "v2": dict(font_family="FZShuTi",    seed=23, scale=13, fly_strength="0.60 0 0 0.7 0.05", mask_alpha="0.25"),
    "v3": dict(font_family="STXingkai",  seed=17, scale=16, fly_strength="0.50 0 0 0.7 0.10", mask_alpha="0.30"),
    "v4": dict(font_family="STXingkai",  seed=41, scale=22, fly_strength="0.55 0 0 0.7 0.00", mask_alpha="0.20"),
    "v5": dict(font_family="FZShuTi",    seed=53, scale=24, fly_strength="0.65 0 0 0.7 0.00", mask_alpha="0.18"),
    "v6": dict(font_family="STXingkai",  seed=29, scale=20, fly_strength="0.40 0 0 0.7 0.20", mask_alpha="0.38"),
}

for n, p in variants.items():
    with open(os.path.join(OUT, f"{n}.svg"), "w", encoding="utf-8") as f:
        f.write(variant(n, **p))
    print(f"wrote {n}.svg  font={p['font_family']} seed={p['seed']} scale={p['scale']}")

# 汇总 HTML（白底，逐个截图）
html_parts = ['<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;background:#fff} svg{display:block;margin:0;padding:0}</style></head><body>']
for n in variants:
    html_parts.append(f'<div id="{n}">')
    html_parts.append(open(os.path.join(OUT, f"{n}.svg"), encoding="utf-8").read())
    html_parts.append('</div>')
html_parts.append('</body></html>')
with open(os.path.join(OUT, "all.html"), "w", encoding="utf-8") as f:
    f.write("".join(html_parts))
print("wrote all.html")
