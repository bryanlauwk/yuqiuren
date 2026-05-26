## 综合优化（4 处）

### 1. 修 `StarOfTheWeek` 的空状态 bug
**问题**：当 `data` 为 null（rankings 还未加载完）时，`data?.isFallback` 是 undefined → 走到非 fallback 分支 → 显示"本场冠军 · 第 undefined 场"，stat 全是 —。

**改法** in `src/components/hero/StarOfTheWeek.tsx`:
- 把 meta 行的条件改为：`!data` → 显示 skeleton（灰条 pulse）；`data.isFallback` → "赛季领跑者"；否则 → "本场冠军 · 第 N 场"
- StatBox 也接 loading 状态显示 pulse 灰块而不是 "—"
- 整体加 min-height 保持 layout 稳定

### 2. 给 Hero 加 mini 数据条 → 升级现有 live stat chip
当前已有 `X PLAYERS · Y SESSIONS` chip，扩展为 3 段信息：
- 球员数
- 已完成场数
- 最近一场日期（`sessions[0].session_date`）

放在 chip 下方，加一个二级 CTA "查看场次记录 →" 链接到 `/sessions`，让左侧不再下沉到空白。

### 3. 排行榜上方加 summary 条
在 `LIVE STANDINGS · 2026` 分隔线右侧，加 3 个小数据徽章：球员数 · 场次 · 当前 #1 名字。让分隔条不只是装饰。

`src/pages/RankingPage.tsx` 改 `<div id="rankings-anchor">` 块。

### 4. Footer 变丰富
当前 footer 只有语言切换 + 版权，过空。改造：
- 左：站点 logo + 一句 slogan（"球不落地，永不放弃"）
- 中：快速导航（排行榜 / 场次记录 / 管理员登录）
- 右：语言切换 + 版权 + 当前赛季统计
- 改成 3 列网格，桌面端 `md:grid-cols-3`，移动端单列

`src/components/Footer.tsx` 整体重写。

### 不动的部分
- 数据逻辑、useRankings hook、表格组件
- 移动端布局保持不变（footer 自然 stack）
- 配色（5、6 两点先观察修复后效果再决定）