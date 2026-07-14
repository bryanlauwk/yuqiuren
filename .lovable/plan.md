# 本周之星多元化奖项方案

将 `StarOfTheWeek` 从"只展示榜首球员"升级为"每周轮换不同类别的荣誉"，让首页焦点更丰富、有惊喜感。

## 奖项类别（基于现有数据可计算，无需新增字段）

| 类别 | 中文标签 | 判定逻辑 |
|---|---|---|
| `champion` | 本场冠军 | 最新场次冠军（现有逻辑） |
| `leader` | 赛季领跑者 | 榜首（现有 fallback） |
| `rookie` | 最佳新人 | `is_new === true` 中积分最高者，或最近 2 场首次登场者 |
| `climber` | 最佳进步 | `rank_change` 正值最大者（本周排名上升最多） |
| `iron_man` | 全勤铁人 | `sessions_played` 最多的非榜首球员 |
| `hot_streak` | 连冠热浪 | 最近连续夺冠场次最多者（从 results 计算） |
| `potential` | 最具潜质 | 出场 ≤ 3 场但场均积分最高者 |

若某类别本周无合格候选，自动跳过。

## 轮换策略

- 计算所有本周"有效"的奖项候选列表（按上表顺序）。
- 用 `当前 ISO 周数 % 候选数` 选定本周展示的奖项——每周自动切换，同一周内稳定不闪烁。
- 冠军类别永远优先出现在有新场次的那一周，其余周从剩余池轮换。

## UI 变化（`StarOfTheWeek.tsx`）

保留现有海报结构（头像块 + 名称 + 三格 stat + 底部日期），只调整：

1. **头部条**：`STAR OF THE WEEK` → 动态奖项名（如 `最佳新人 / TOP ROOKIE`、`最佳进步 / TOP CLIMBER`）。LIVE 徽标保留。
2. **对角 accent 色**：按奖项换色调
   - champion/leader → accent（现状）
   - rookie → primary
   - climber → 绿色（`--finished` 已有）
   - iron_man → muted 深色
   - hot_streak → destructive（火焰红）
   - potential → accent + primary 双色叠加（保持一致 tokens）
3. **副标题行**：显示该奖项的关键指标，例如
   - 最佳进步 → `本周上升 5 位 / UP 5 SPOTS`
   - 铁人 → `出场 12 场 / 12 SESSIONS`
   - 潜质 → `场均 8.5 分 / 8.5 AVG`
4. **Stat 三格**：中间格改为奖项对应的"高光数字"，其余两格保持球员总分与冠军数，标签相应调整。
5. **角标 `#rank`**：保留，仍显示球员当前赛季排名。
6. **淡入过渡**：切换球员/奖项时用现有 `animate-fade-in-up`，避免生硬。

## 技术要点

- 全部计算在 `StarOfTheWeek` 内 `useMemo` 完成，输入仍是 `useRankings()` 返回的 `rankings / sessions / results / players`——不需要新增 hook、schema、迁移。
- 新增一个纯函数 `pickWeeklyAward(rankings, sessions, results)` 返回 `{ awardKey, player, headline, subtitle, statValue, statLabel, tint }`。
- 中英文文案加进 `src/i18n/translations.ts` 的 `home` 分组下新键 `awards.*`。
- ISO 周数用简单函数计算，无需引入 dayjs。

## 不改动

- `ArenaHero`、`RankingPage`、桌面/移动榜单、Supabase schema、类型定义。
- 海报的尺寸、边框、阴影、旋转/位移动画。

## 打开问题

若你希望"手动指定本周奖项"（管理员在 admin 面板选择），可以在此基础上再加一个 `weekly_spotlight` 表，本轮先做自动轮换。
