# -*- coding: utf-8 -*-
"""
首页构建说明（2026-08 起不再需要拼接步骤）。

新首页为自包含的单文件静态页：index.html（含内联 CSS 与 JS）。
本脚本不再改写 index.html，只做健康检查，防止误用旧版拼接逻辑覆盖新首页。

用法：python build.py
"""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
HTML = os.path.join(HERE, "index.html")
IMGDIR = os.path.join(HERE, "img")


def check():
    with open(HTML, "r", encoding="utf-8") as f:
        html = f.read()

    ok = True
    # 1. 必备区块存在
    required = [
        ("顶部导航", 'class="nav"'),
        ("首屏Hero", 'class="hero"'),
        ("一湖三脉", 'id="explore"'),
        ("穿越千年", 'id="timeline"'),
        ("数字地图", 'id="map"'),
        ("研学路线", 'id="routes"'),
        ("互动游戏", 'id="games"'),
        ("数字展厅", 'id="gallery"'),
        ("底部CTA", 'class="cta"'),
        ("地图脚本", "maplibregl.Map("),
    ]
    for name, key in required:
        if key not in html:
            print(f"  [X] 缺少：{name}（{key}）")
            ok = False
        else:
            print(f"  [OK] {name}")

    # 2. 图片引用均存在
    imgs = set(re.findall(r"\./img/([\w-]+\.jpg)", html))
    missing = [i for i in imgs if not os.path.exists(os.path.join(IMGDIR, i))]
    if missing:
        print(f"  [X] 缺失图片：{missing}")
        ok = False
    else:
        print(f"  [OK] 图片引用全部存在（{len(imgs)} 张）")

    # 3. 无“项目/新文科/比赛名”汇报字样（设计稿要求）
    #    注：不再检查「融绘贯通」——它现为公众号「融绘贯通」的真实账号名，
    #    在「关注公众号」弹窗中出现属必要内容（二维码即该账号），并非汇报字样。
    forbidden = ["新文科", "文史哲", "项目", "实践创新大赛", "denghui"]
    hits = [w for w in forbidden if w in html]
    if hits:
        print(f"  [X] 仍含汇报字样：{hits}（设计稿要求移除）")
        ok = False
    else:
        print("  [OK] 已去除「新文科/项目/文史哲」等汇报字样")

    print("\n结果：", "全部通过 [OK]" if ok else "存在待修复项 [X]")
    return ok


if __name__ == "__main__":
    print(f"检查 {HTML}\n")
    check()
