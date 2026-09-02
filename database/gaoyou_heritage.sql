-- ============================================================
-- 高邮湖泊湿地多类型遗产数字活化平台 · 数据库建表脚本
-- 数据库：gaoyou_heritage（SQLite）
-- 用途：管理遗产点位、调研数据、照片资源、研学路线等
-- 创建日期：2026-08-27
-- ============================================================

-- 启用外键支持（SQLite）
PRAGMA foreign_keys = ON;

-- ============================================================
-- 1. 遗产三脉分类表（水之源 / 田之魂 / 人之韵）
-- ============================================================
CREATE TABLE IF NOT EXISTS heritage_vein (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,               -- 水之源 / 田之魂 / 人之韵
    name_en     TEXT,                           -- English subtitle
    category    TEXT    NOT NULL,               -- 灌溉工程遗产 / 农业文化遗产 / 非物质文化遗产
    summary     TEXT,                           -- 一句话概述
    description TEXT,                           -- 详细介绍
    icon_url    TEXT,                           -- 图标图片路径
    sort_order  INTEGER DEFAULT 0              -- 排序权重
);

-- ============================================================
-- 2. 遗产点位表（11处遗产点，含经纬度）
-- ============================================================
CREATE TABLE IF NOT EXISTS heritage_site (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,               -- 遗产点名称（如：车逻闸）
    vein_id     INTEGER,                       -- 所属脉络
    site_type   TEXT,                           -- 闸口 / 水坝 / 湖泊 / 农田 / 村落 / 民俗
    latitude    REAL,                           -- 纬度
    longitude   REAL,                           -- 经度
    level       TEXT,                           -- 世界遗产 / 国家级 / 省级 / 市级
    era         TEXT,                           -- 建成年代（如：明代、清代、当代）
    summary     TEXT,                           -- 一句话描述
    description TEXT,                           -- 详细介绍
    image_url   TEXT,                           -- 主图路径
    popup_info  TEXT,                           -- 地图弹窗内容（JSON格式）
    sort_order  INTEGER DEFAULT 0,
    FOREIGN KEY (vein_id) REFERENCES heritage_vein(id)
);

-- ============================================================
-- 3. 时间轴事件表（穿越千年）
-- ============================================================
CREATE TABLE IF NOT EXISTS timeline_event (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    era         TEXT    NOT NULL,               -- 古代 / 近现代 / 今日
    year_label  TEXT,                           -- 年份标签（如：明代永乐年间、2017年）
    title       TEXT    NOT NULL,               -- 事件标题
    description TEXT,                           -- 事件描述
    image_url   TEXT,                           -- 配图路径
    sort_order  INTEGER DEFAULT 0
);

-- ============================================================
-- 4. 调研问卷数据表（215份有效问卷）
-- ============================================================
CREATE TABLE IF NOT EXISTS survey_questionnaire (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    respondent_id   TEXT    NOT NULL,           -- 受访者编号（如：Q001）
    gender          TEXT,                       -- 性别
    age_group       TEXT,                       -- 年龄段
    education       TEXT,                       -- 学历
    occupation      TEXT,                       -- 职业
    residence       TEXT,                       -- 居住地（核心区/缓冲区/外围）
    is_local        INTEGER DEFAULT 1,          -- 是否本地居民 1=是 0=否
    survey_date     TEXT,                       -- 填写日期
    survey_location TEXT,                       -- 调研地点
    created_at      TEXT DEFAULT (datetime('now'))
);

-- ============================================================
-- 5. 问卷题目表（定义题目）
-- ============================================================
CREATE TABLE IF NOT EXISTS survey_question (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    q_code      TEXT    NOT NULL,               -- 题目编号（如：D1_1）
    dimension   TEXT    NOT NULL,               -- 所属维度
    question    TEXT    NOT NULL,               -- 题目内容
    q_type      TEXT    NOT NULL,               -- likert / single / multiple / open
    options     TEXT,                           -- 选项（JSON数组）
    max_score   INTEGER                        -- 李克特量表最大分值
);

-- ============================================================
-- 6. 问卷回答表（每份问卷的逐题回答）
-- ============================================================
CREATE TABLE IF NOT EXISTS survey_answer (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    questionnaire_id INTEGER NOT NULL,
    question_id      INTEGER NOT NULL,
    answer_value     TEXT,                      -- 回答值（分值/选项文本）
    answer_text      TEXT,                      -- 开放题文本回答
    FOREIGN KEY (questionnaire_id) REFERENCES survey_questionnaire(id),
    FOREIGN KEY (question_id) REFERENCES survey_question(id)
);

-- ============================================================
-- 7. 访谈记录表（10人次深度访谈）
-- ============================================================
CREATE TABLE IF NOT EXISTS interview_record (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    interviewee     TEXT    NOT NULL,           -- 受访人姓名/编号
    identity        TEXT,                       -- 身份（村干部/水利局/企业负责人等）
    organization    TEXT,                       -- 所属单位
    interview_date  TEXT,                       -- 访谈日期
    duration_min    INTEGER,                    -- 时长（分钟）
    location        TEXT,                       -- 访谈地点
    transcript      TEXT,                       -- 访谈文字记录
    key_findings    TEXT,                       -- 关键发现摘要
    audio_url       TEXT                        -- 录音文件路径
);

-- ============================================================
-- 8. 调研照片表（800+张调研照片）
-- ============================================================
CREATE TABLE IF NOT EXISTS survey_photo (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name   TEXT    NOT NULL,               -- 文件名
    file_path   TEXT    NOT NULL,               -- 相对路径
    site_id     INTEGER,                       -- 拍摄遗产点
    vein_id     INTEGER,                       -- 所属脉络
    category    TEXT,                           -- 遗产景观 / 生产活动 / 民俗文化 / 工程设施 / 调研过程
    description TEXT,                           -- 照片说明
    shoot_date  TEXT,                           -- 拍摄日期
    is_featured INTEGER DEFAULT 0,             -- 是否精选入展厅
    sort_order  INTEGER DEFAULT 0,
    FOREIGN KEY (site_id) REFERENCES heritage_site(id),
    FOREIGN KEY (vein_id) REFERENCES heritage_vein(id)
);

-- ============================================================
-- 9. 研学路线表（3条研学路线）
-- ============================================================
CREATE TABLE IF NOT EXISTS study_route (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,               -- 水脉寻踪 / 稻田密码 / 湖畔人家
    theme       TEXT    NOT NULL,               -- 路线主题
    color       TEXT,                           -- 主题色（用于前端展示）
    summary     TEXT,                           -- 路线概述
    description TEXT,                           -- 详细路线说明
    duration    TEXT,                           -- 建议时长
    distance_km REAL                            -- 建议距离
);

-- ============================================================
-- 10. 研学路线途经点表
-- ============================================================
CREATE TABLE IF NOT EXISTS route_stop (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    route_id    INTEGER NOT NULL,
    site_id     INTEGER,                       -- 关联遗产点
    stop_name   TEXT    NOT NULL,              -- 途经点名称
    stop_order  INTEGER NOT NULL,              -- 顺序
    activity    TEXT,                           -- 体验活动描述
    tips        TEXT,                           -- 温馨提示
    FOREIGN KEY (route_id) REFERENCES study_route(id),
    FOREIGN KEY (site_id)  REFERENCES heritage_site(id)
);

-- ============================================================
-- 11. 互动游戏表
-- ============================================================
CREATE TABLE IF NOT EXISTS game (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,               -- 小小水利师 / 稻田守护者 / 高邮歌谣
    name_en     TEXT,
    status      TEXT    NOT NULL DEFAULT '筹备中', -- 已上线 / 筹备中 / 开发中
    vein_id     INTEGER,                       -- 关联脉络
    cover_url   TEXT,                          -- 封面图
    description TEXT,                          -- 游戏介绍
    game_url    TEXT,                          -- 游戏页面链接
    sort_order  INTEGER DEFAULT 0,
    FOREIGN KEY (vein_id) REFERENCES heritage_vein(id)
);

-- ============================================================
-- 12. 展厅照片表（网站数字展厅展示）
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_photo (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    photo_id    INTEGER,                       -- 关联调研照片表
    title       TEXT    NOT NULL,              -- 图片标题
    caption     TEXT,                          -- 图片说明
    image_url   TEXT    NOT NULL,              -- 图片路径
    category    TEXT,                          -- 水之源 / 田之魂 / 人之韵 / 综合
    sort_order  INTEGER DEFAULT 0,
    FOREIGN KEY (photo_id) REFERENCES survey_photo(id)
);

-- ============================================================
-- 13. 数据统计汇总表（ECharts图表数据源）
-- ============================================================
CREATE TABLE IF NOT EXISTS stat_summary (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    chart_code  TEXT    NOT NULL,              -- 图表编号（如：CHART_01）
    chart_title TEXT    NOT NULL,              -- 图表标题
    chart_type  TEXT    NOT NULL,              -- bar / ring / grouped_bar / horizontal_bar
    data_json   TEXT    NOT NULL,              -- 图表数据（JSON）
    note        TEXT,                          -- 数据说明
    updated_at  TEXT DEFAULT (datetime('now'))
);

-- ============================================================
-- 14. 网站访问日志表（可选，统计浏览量）
-- ============================================================
CREATE TABLE IF NOT EXISTS visit_log (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    page_name   TEXT    NOT NULL,              -- 访问页面
    visit_time  TEXT DEFAULT (datetime('now')),
    device_type TEXT,                          -- desktop / mobile
    ip_hash     TEXT                           -- IP哈希（隐私保护）
);

-- ============================================================
-- 初始数据插入
-- ============================================================

-- 三脉分类
INSERT INTO heritage_vein (name, name_en, category, summary, sort_order) VALUES
('水之源', 'Water Source', '世界灌溉工程遗产', '水，是高邮文明的起点', 1),
('田之魂', 'Field Spirit', '中国重要农业文化遗产', '一粒米背后，是千年的生态智慧', 2),
('人之韵', 'People Rhythm', '非物质文化遗产', '人，是遗产真正的守护者', 3);

-- 遗产点位（11处）
INSERT INTO heritage_site (name, vein_id, site_type, latitude, longitude, level, era, summary, sort_order) VALUES
('车逻闸',             1, '闸口',  32.8510, 119.4680, '世界灌溉工程遗产', '明代', '里运河-高邮灌区核心闸口，至今仍发挥灌溉调节功能', 1),
('南关坝',             1, '水坝',  32.8320, 119.4520, '世界灌溉工程遗产', '清代', '灌区重要水利枢纽，调控里运河水位', 2),
('平津堰',             1, '水坝',  32.8670, 119.4750, '世界灌溉工程遗产', '明代', '古代运河水位调控工程遗存', 3),
('子婴闸',             1, '闸口',  32.8780, 119.4820, '世界灌溉工程遗产', '明代', '灌区北部重要节制闸', 4),
('界首小闸',           1, '闸口',  32.8890, 119.4900, '世界灌溉工程遗产', '清代', '界首段灌溉控制工程', 5),
('里运河-高邮灌区',    1, '灌区',  32.8600, 119.4600, '世界灌溉工程遗产', '明清', '2021年列入世界灌溉工程遗产名录，灌溉面积覆盖高邮全域', 6),
('高邮湖',             2, '湖泊',  32.8200, 119.4400, '中国重要农业文化遗产', '古代', '高邮湖泊湿地农业系统核心水域，稻鸭鱼蟹共生', 7),
('稻鸭鱼蟹共作田',     2, '农田',  32.8400, 119.4500, '中国重要农业文化遗产', '当代', '立体共作模式示范区，传承千年生态智慧', 8),
('沿湖村',             3, '村落',  32.8150, 119.4350, '非遗传承社区', '当代', '传统渔村，"最美渔村"转型样板', 9),
('高邮民歌传习所',     3, '民俗',  32.8560, 119.4650, '国家级非遗', '当代', '国家级非遗高邮民歌传习基地', 10),
('咸鸭蛋制作工坊',     3, '民俗',  32.8450, 119.4550, '省级非遗', '当代', '省级非遗咸鸭蛋传统制作技艺展示', 11);

-- 时间轴事件
INSERT INTO timeline_event (era, year_label, title, description, sort_order) VALUES
('古代', '明清时期',   '里运河-高邮灌区建成',         '里运河-高邮灌区水利工程逐步建成，闸口、水坝体系完善，灌溉覆盖高邮全域', 1),
('古代', '明清时期',   '稻鸭鱼蟹共作模式形成',         '高邮湖泊湿地农业系统形成独特的稻鸭鱼蟹立体共作生态模式', 2),
('古代', '清代',       '高邮民歌传承起源',             '高邮民歌在湖区渔民、农民生活中自然孕育并代代相传', 3),
('近现代', '20世纪中叶', '传统捕捞技艺鼎盛期',           '鱼鹰捕鱼、鱼虾蟹混养等传统技艺广泛应用于高邮湖渔业生产', 4),
('近现代', '20世纪末',   '城镇化冲击传统生产方式',       '工业化与城镇化加速，稻鸭共作等传统模式逐渐退出日常生产', 5),
('今日',  '2017年',     '入选中国重要农业文化遗产',     '高邮湖泊湿地农业系统入选第四批中国重要农业文化遗产名录', 6),
('今日',  '2021年',     '入选世界灌溉工程遗产',         '里运河-高邮灌区正式列入世界灌溉工程遗产名录', 7),
('今日',  '2025年',     '灌区遗产保护管理办法出台',     '高邮市正式出台《里运河-高邮灌区灌溉工程遗产保护管理办法》', 8),
('今日',  '2026年',     '数字活化平台上线',             '遗产融绘·魅力高邮数字活化平台正式上线，以数字化手段推动多类型遗产系统性保护', 9);

-- 研学路线
INSERT INTO study_route (name, theme, color, summary, duration, distance_km) VALUES
('水脉寻踪', '探索灌溉工程遗产', '#4a7480', '沿里运河-高邮灌区行走，探访古闸水坝，理解千年水利智慧如何滋养一方水土', '半天', 12.5),
('稻田密码', '体验共生生态智慧', '#2d6a4f', '走进高邮湖畔稻田，近距离观察稻鸭鱼蟹共作模式，体验千年生态循环农业', '一天',   8.0),
('湖畔人家', '感受非遗传承生活', '#a5653f', '走访沿湖村落，聆听高邮民歌，体验咸鸭蛋制作，感受活态非遗的魅力', '一天',   10.0);

-- 互动游戏
INSERT INTO game (name, name_en, status, vein_id, description, sort_order) VALUES
('小小水利师', 'Little Hydraulic Engineer', '已上线',   1, '以里运河-高邮灌区为背景，体验古代水利工程师的智慧，学习灌溉工程知识', 1),
('稻田守护者', 'Field Guardian',           '筹备中',   2, '扮演稻田守护者，管理稻鸭鱼蟹共作生态，学习农业文化遗产知识',         2),
('高邮歌谣',   'Gaoyou Ballads',           '筹备中',   3, '在高邮民歌旋律中探索湖区文化，学习非遗知识与民间故事',               3);

-- 问卷题目（李克特量表维度）
INSERT INTO survey_question (q_code, dimension, question, q_type, max_score) VALUES
('D1_1', '遗产认知-农业', '您对高邮湖泊湿地农业系统的了解程度', 'likert', 5),
('D1_2', '遗产认知-农业', '您对稻鸭鱼蟹共作模式的了解程度',     'likert', 5),
('D1_3', '遗产认知-灌区', '您对里运河-高邮灌区的了解程度',     'likert', 5),
('D1_4', '遗产认知-灌区', '您对灌区世界遗产身份的知晓程度',     'likert', 5),
('D1_5', '遗产认知-非遗', '您对高邮民歌的了解程度',             'likert', 5),
('D1_6', '遗产认知-非遗', '您对咸鸭蛋制作技艺的了解程度',       'likert', 5),
('D2_1', '保护意愿',     '您认为保护农业文化遗产的重要性',       'likert', 5),
('D2_2', '保护意愿',     '您愿意参与遗产保护活动的意愿',         'likert', 5),
('D3_1', '价值认同',     '高邮湖泊湿地农业系统对当地经济的价值', 'likert', 5),
('D3_2', '价值认同',     '里运河-高邮灌区对当地农业的价值',     'likert', 5);

-- 数据统计汇总（ECharts图表数据）
INSERT INTO stat_summary (chart_code, chart_title, chart_type, data_json, note) VALUES
('CHART_01', '多类型遗产认知分化', 'horizontal_bar',
 '[{"name":"农业文化遗产认知","value":35.2},{"name":"灌溉工程遗产认知","value":12.56},{"name":"非遗认知","value":88.37}]',
 '基于215份有效问卷，三类遗产公众认知度差异显著'),
('CHART_02', '灌区认知断层', 'ring',
 '[{"name":"从未听说","value":53.95},{"name":"仅闻其名","value":21.4},{"name":"到访未深入了解","value":12.09},{"name":"知晓世界遗产身份","value":12.56}]',
 '里运河-高邮灌区公众认知呈现明显断层'),
('CHART_03', '传统技艺认知差异', 'grouped_bar',
 '[{"name":"水产养殖","local":95,"external":42},{"name":"稻作耕种","local":92,"external":38},{"name":"稻鸭共作","local":75,"external":43.5},{"name":"鱼鹰捕鱼","local":72,"external":29}]',
 '本地居民与外界公众对传统技艺认知对比'),
('CHART_04', '价值认同度', 'horizontal_bar',
 '[{"name":"经济价值","value":83.9},{"name":"教育价值","value":72.9},{"name":"生态价值","value":61.0},{"name":"文化价值","value":55.3}]',
 '高邮湖泊湿地农业系统价值认同分布');

-- 展厅精选照片（示例，实际路径需对应img/目录）
INSERT INTO gallery_photo (title, caption, image_url, category, sort_order) VALUES
('高邮湖全景',     '高邮湖芦苇荡湿地全景',         './img/g1.jpg',  '综合', 1),
('稻田秋景',       '金秋稻田与鸭群',               './img/g2.jpg',  '田之魂', 2),
('车逻闸',         '里运河-高邮灌区车逻闸实景',     './img/g3.jpg',  '水之源', 3),
('南关大坝',       '南关大坝水利工程',               './img/g4.jpg',  '水之源', 4),
('渔民捕鱼',       '传统鱼鹰捕鱼场景',               './img/g5.jpg',  '人之韵', 5),
('高邮民歌',       '民歌传习所演唱活动',             './img/g6.jpg',  '人之韵', 6),
('咸鸭蛋制作',     '传统咸鸭蛋腌制工坊',             './img/g7.jpg',  '人之韵', 7),
('稻鸭共作',       '稻田中放养高邮鸭',               './img/g8.jpg',  '田之魂', 8),
('沿湖村',         '沿湖村渔村风貌',                 './img/g9.jpg',  '人之韵', 9),
('运河故道',       '大运河明清故道高邮段',           './img/g10.jpg', '水之源', 10),
('芦苇荡',         '高邮湖芦苇荡湿地',               './img/g11.jpg', '水之源', 11),
('农田灌溉',       '灌区农田灌溉实景',               './img/g12.jpg', '田之魂', 12),
('渔民祭祀',       '渔民祭祀文化场景',               './img/g13.jpg', '人之韵', 13),
('高邮鸭养殖',     '高邮鸭养殖基地',                 './img/g14.jpg', '田之魂', 14),
('平津堰',         '平津堰水利遗存',                 './img/g15.jpg', '水之源', 15),
('调研合影',       '调研团队在高邮湖',               './img/g16.jpg', '综合', 16);

-- ============================================================
-- 常用查询示例
-- ============================================================

-- 查看所有遗产点位（含脉络信息）
-- SELECT s.name, v.name AS vein, s.site_type, s.latitude, s.longitude, s.level
-- FROM heritage_site s LEFT JOIN heritage_vein v ON s.vein_id = v.id
-- ORDER BY v.sort_order, s.sort_order;

-- 统计各脉络遗产点数量
-- SELECT v.name, COUNT(s.id) AS site_count
-- FROM heritage_vein v LEFT JOIN heritage_site s ON v.id = s.vein_id
-- GROUP BY v.id;

-- 认知分化图表数据
-- SELECT chart_title, chart_type, data_json FROM stat_summary WHERE chart_code = 'CHART_01';
