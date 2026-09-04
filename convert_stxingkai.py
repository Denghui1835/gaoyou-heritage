# -*- coding: utf-8 -*-
import os
from fontTools.ttLib import TTFont

src = r"C:\Windows\Fonts\STXINGKA.TTF"
out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, "stxingkai.woff2")

f = TTFont(src)
cmap = f.getBestCmap()
chars = "遗产融绘魅力高邮"
missing = [c for c in chars if ord(c) not in cmap]
print("missing:", missing if missing else "none")
f.flavor = "woff2"
f.save(out)
print("woff2 sizeKB:", round(os.path.getsize(out) / 1024, 1))
