## 目标
将 `DesktopRankingTable` 升级为"动感竞技场"风格：戏剧化的表头、点数进度条数据可视化、行内 hover 微交互。保留 brutalist 黑边 + 硬阴影身份，保留 top-3 渐变分隔行、密度切换、现有数据列。

## 改动范围
仅 `src/components/DesktopRankingTable.tsx`。不动数据、翻译、后端。

## 具体改动

### 1. 表头节奏优化
- 保留黑底表头，但在每个 `<TableHead>` 顶部加一条 `border-t border-foreground/30` 高光线，模拟金属倒角感。
- `#` 列头部改为斜体 `italic` + 更宽字距 `tracking-widest`。
- Points 列头前加一个小竖条装饰（`▎` 或 `▪` 字符）呼应 hero 的编辑器风格。

### 2. 积分列数据可视化（核心）
- 计算 `maxPoints = rankings[0].total_points`，每行 `pct = total_points / maxPoints`。
- Points 单元格替换为一个带黑边的进度条容器：
  - Top-3：`h-10`（comfortable）/ `h-8`（compact），黑色 3px 边框，内部 hsl 填色条（rank1=accent 100%，rank2=primary，rank3=muted-foreground），数字叠加在条上（rank1/2 用反色前景保证对比）。
  - 4+ 名：`h-7`/`h-6`，2px 边框，muted 底 + foreground/30 填色，数字右对齐。
- 第 1 名条右侧加一个 `MAX` 黑底黄字小徽章。
- 进度条使用 CSS `transition-[width] duration-700` + 挂载时 `width: 0 → target`（用 `useEffect` + 状态触发一次）。

### 3. 行内 hover 微交互
- 每个 `<TableRow>` 加 `transition-all duration-200`。Top-3 hover：`hover:-translate-y-0.5 hover:-translate-x-0.5` 配对应色的 `hover:shadow-[6px_6px_0_0_hsl(var(--accent/primary/muted-foreground))]`。
- 排名徽章 `group-hover:rotate-6`（rank1）/ `-rotate-3`（rank2）/ `rotate-12`（rank3）。
- 头像 `group-hover:scale-110 transition-transform`。
- 4+ 名行：头像默认 `grayscale`，`group-hover:grayscale-0`，行 hover 提亮 `bg-muted/40 → bg-card`。

### 4. Rank 徽章尺寸
- Top-3 徽章从 `w-8 h-8` 提升到 `w-10 h-10`（comfortable）保持视觉重量匹配新进度条高度。字号跟随。

### 5. 兼容性
- 密度切换：所有新元素通过密度 token（新增 `barH`、`badgeSize`、`hoverLift`）驱动。
- 少于 3 人：max 计算保护 `maxPoints || 1`。
- 保留现有 `leader-separator-1/2` 分隔行。
- 保留 `<Table>` 语义结构；进度条放在 `<TableCell>` 内，不破坏 `table-fixed`。
- pointsColW 从 `w-28` 加宽到 `w-40`（comfortable）/ `w-32`（compact）以容纳进度条。

## 技术细节
- 用 `useState + useEffect` 在挂载后 100ms 切换 `mounted` 状态触发进度条从 0 到目标宽度的动画。
- 保留 zebra、border、`table-fixed`。
- 所有颜色走 semantic tokens（`accent`, `primary`, `muted-foreground`, `foreground`），不用 `bg-amber-400`/`bg-blue-600` 硬编码。
- 不引入新依赖，不动 `index.css` 变量（复用现有）。

## 不做
- 不改移动端 `MobileRankingCard`。
- 不改 `RankingPage` 的头部条（22人/17场/#1 徽章）。
- 不引入 framer-motion（用 CSS transition 就够）。
- 不改数据获取、翻译。
