
## 本周之星海报（Star of the Week）

把 `ArenaHero` 右侧的 4 行迷你排行榜换成一张大幅"本周之星"海报卡，和左侧标题形成"杂志/球队海报"式对仗。

### 选谁

**最近一场比赛的冠军**（不是赛季榜第一）—— 这样这块永远有"新故事"，而且和下面的赛季总榜没有信息重复。

数据来源：
- 取 `tournament_sessions` 里日期最近的一场
- 在 `session_results` 里找 `session_id = 最近场次 && result_type = 'champion'`
- 关联 `players` 拿名字 + 头像
- 如果一场有多个冠军（双打场），取第一个；其余在卡片底部用小字"& 同获冠军：XXX"带出

如果还没有任何比赛，回退到赛季榜第一（保底）。

### 海报视觉

整张卡占满右栏（替换现有手机 mockup）：

```
┌───────────────────────────────┐
│  STAR OF THE WEEK    [LIVE]   │  ← 顶部小字 + 红色 LIVE 徽章
│                               │
│      ┌─────────────┐          │
│      │             │          │
│      │   大头像     │          │  ← 圆形/方形大头像，280×280
│      │   (full_avatar) │      │     带 cinematic 光晕
│      │             │          │
│      └─────────────┘          │
│                               │
│   DICKY LIM                   │  ← font-display 巨字，名字
│   冠军 · 第 X 场               │  ← 副标题：身份 + 场次序号
│                               │
│   ┌─────┬─────┬─────┐        │
│   │ 12  │  3  │ #1  │        │  ← 3 个数据格子：本场积分 / 累计冠军 / 当前榜位
│   │ PTS │ 🏆  │RANK │        │
│   └─────┴─────┴─────┘        │
│                               │
│   2026.05.24                  │  ← 比赛日期
└───────────────────────────────┘
```

风格延续现有 neo-brutalist：
- 2px 黑边 + 红色硬阴影 `shadow-[8px_8px_0_0_hsl(var(--accent))]`
- 头像背后用 `--accent` 红色斜切色块做"焦点光"
- 名字用 `font-display` + `lime-slab`（其实是蓝色 slab）高亮
- 整张卡保留原本的 scroll-tilt 视差动效（-2°→+3°）

### 涉及文件

**新增**
- `src/components/hero/StarOfTheWeek.tsx` — 海报卡组件，内部用 `useRankings` 已有的 `sessions` + 新增的最近场次冠军查询

**修改**
- `src/components/ArenaHero.tsx` — 删除 `phoneRows` + 整个 phone mockup 块，换成 `<StarOfTheWeek />`
- `src/hooks/useRankings.ts` — 暴露"最近一场冠军"派生数据（在已有 sessions/results 数据里 client-side 计算，不加新查询）
- `src/i18n/translations.ts` — 加 `home.starOfTheWeek` / `home.champion` / `home.matchN` / `home.points` / `home.rank` 翻译键

### 不做

- 不加新表、不动 RLS、不动后端
- 不动下面的完整排行榜
- 不动 admin 流程
