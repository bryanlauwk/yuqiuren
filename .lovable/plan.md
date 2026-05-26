## 紧凑桌面排行榜改进

### 问题
桌面端 `DesktopRankingTable` 空白过多：行高很大（前3名 120px/100px，其余 80px）、Player 列独占过宽、边框粗重（2px）、不同排名球员的文字/头像大小差异大，导致视觉松散。

### 改动范围
仅修改前端展示层，不涉及数据逻辑或后端。

### 具体调整

**`src/components/DesktopRankingTable.tsx`**
- 统一行高：`py-5` → `py-2.5`，行高从约 100-120px 压缩到约 48-52px
- 统一头像尺寸：`w-14/h-14` vs `w-12/h-12` → 统一 `w-9 h-9`
- 统一文字大小：所有球员 `text-base`，不再因排名变大
- 缩小 Rank badge：`w-12 h-12 text-2xl` → `w-8 h-8 text-base`
- 边框减薄：`border-b-2` → `border-b`（1px），颜色从 `border-foreground/10` 改 `border-foreground/15`
- Top 3 指示：移除 `border-l-[8px]`，改用左侧 4px 细竖条 + 微妙背景色（`bg-accent/5` / `bg-primary/5`）
- 列宽微调：Rank `w-20`→`w-16`，Sessions/Wins `w-28`→`w-24`，Points `w-32`→`w-28`
- Header 字号从 `text-xs` 缩到 `text-[11px]`，高度更紧凑
- #1 的 Points 高亮 badge：缩小 padding，改用 accent 红色（与 #1 rank badge 一致）
- 其余球员 rank 数字颜色改为 `text-muted-foreground`

**`src/pages/RankingPage.tsx`**
- Loading skeleton 高度统一缩小：`h-[120px]` / `h-[100px]` / `h-[80px]` → 统一 `h-[52px]`

### 不变的部分
- 外边框 `border-2` + 硬阴影（neo-brutalist 风格核心）
- 整体动画和交互
- 移动端 `MobileRankingCard` 不受影响