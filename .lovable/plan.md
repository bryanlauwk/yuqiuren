# 向「专业体育联赛 / ESPN」风格再收一轮

目标：去掉重复入口与观感奇怪的切换条，让页面更像 ESPN 的联赛页——克制的排版层级、清晰的分区标题条、数据优先。

## 一、去除重复与奇怪的元素

- 移除积分榜标题右侧的「总榜｜胜率｜赛事记录」控制条（它只有一个真实可用状态，另两个不可点，观感像坏掉的 tab）。
- Hero 右侧 CTA 只保留「查看积分榜」；去掉「赛事纪录」按钮，因为导航栏已有同名入口（重复）。
- 保留 Season Snapshot 三格数据（球员 / 场比赛 / 最高积分）。

## 二、ESPN 式分区标题条

- 把积分榜标题从「大标题 + 下边框」改成一条深色实心标题条：左侧小号 kicker（2026 SEASON · LEAGUE TABLE），下面大写压缩体标题，右侧显示「共 N 位球员」这类静态元信息而非假 tab。
- 同一套标题条样式用于赛事纪录页与球员名册页，保证跨页一致。

## 三、榜单表格更「数据台」

- 表头条改为更细的一行（高度略降，字号维持），列名保留 #／球员／场次／胜／胜率／积分。
- 行内副行（`场 · 胜 · 胜率`）与右侧列数据重复，改为只显示最近状态类信息（保留积分列为唯一强调数字），减少视觉噪音。
- Top 3 维持金／蓝／黑左侧色条与皇冠，但降低底色 tint 强度，使整体更接近正式榜单而非游戏界面。

## 四、页面节奏

- 统一 Hero 与榜单使用同一 `max-w-5xl` 内容宽度对齐左右边界。
- 分区之间间距统一（section 上下 padding 一致），去掉零散的额外留白。

## 技术要点

- 改动文件：`src/pages/RankingPage.tsx`（移除 tab 条、标题条改造、宽度对齐）、`src/components/ArenaHero.tsx`（移除重复 CTA）、`src/components/SectionHeading.tsx`（新增实心标题条变体）、`src/components/DesktopRankingTable.tsx` 与 `src/components/MobileRankingCard.tsx`（表头与副行精简、tint 降级）。
- 全部使用现有语义 token（foreground / accent / primary / muted-foreground），不写死颜色。
- 不改动计分逻辑、数据结构、RLS 或管理后台。
