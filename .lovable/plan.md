## 合照卡片升级：悬停质感 + 多场轮播

### 移除
- 顶部标签条（"最新赛事合照 / LATEST MATCH PHOTO" + LIVE 指示）— 冗余

### 桌面版悬停动效（质感提升）
- 静态阴影：`shadow-[8px_8px_0_0_hsl(var(--accent))]`
- 悬停时：
  - 阴影加深并抬升 → `hover:shadow-[12px_12px_0_0_hsl(var(--accent))]`
  - 卡片轻微上浮 + 旋转归零 → `hover:-translate-y-1 hover:rotate-0`
  - 图片轻微 zoom → `img` 用 `group-hover:scale-[1.03]`
- 过渡：`transition-all duration-300 ease-out`
- 保留 scroll-driven rotate/translateY 作为基础 transform（悬停时用 CSS 覆盖）

### 多场轮播（核心新增）
选取最近 6 场有 `group_photo_url` 的场次：

**移动端**：水平滚动条（swipe）
- `flex overflow-x-auto snap-x snap-mandatory` 
- 每张卡片 `w-[280px] shrink-0 snap-center`
- 隐藏滚动条（`scrollbar-hide` 或内联 CSS）

**桌面端**：主图 + 缩略图网格
- 主展示区：第一张大图（4:3，宽 420px）
- 下方 2×2 或 1×4 缩略图小网格（80px 方块，可点击切换主图）
- 点击缩略图 → setState 更新 activeIndex，主图切换（带 fade 过渡）
- 悬停缩略图：边框由 muted → accent

### 技术细节
只改 `src/components/hero/LatestSessionPhoto.tsx`：
- 用 `useState<number>(0)` 管理 activeIndex
- `sessions.filter(s => s.group_photo_url).slice(0, 6)` 取候选
- 用 `useIsMobile()` 分叉 UI（已在项目中使用）
- 主图切换动画：`key={activeIndex}` + `animate-fade-in`
- 保留 loading / no-photo fallback（当无任何合照时）
- 不再依赖 rotate/translateY props 做主要形态；桌面网格用固定布局，仅保留一点手感倾斜给主图

不改 `ArenaHero.tsx`（props 接口保持兼容，即使桌面不再强调倾斜）。
不改后端 / schema。
