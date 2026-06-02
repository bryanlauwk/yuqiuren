
# 场次集锦视频功能

为每场比赛加入 12+ 个 YouTube 精彩集锦视频，呈现方式力求不影响现有美观。

## 整体方案

- **不在卡片上直接展示视频**，避免拉高卡片高度、破坏现有三列网格。
- 卡片右下角新增一个克制的 chip 按钮：`▶ 12 段精彩集锦`，仅当该场次有视频时才显示。
- 点击后弹出全屏 Dialog 画廊（沿用现有 `PhotoLightbox` 的暗色风格），左侧主播放区 + 右侧（或下方）缩略图列表。
- 站内嵌入播放，使用「lite-youtube」思路：首屏只渲染 YouTube 缩略图 + 播放按钮覆盖层，用户点击后才挂载 `<iframe>`，避免 12 个 iframe 同时加载拖慢页面。
- 管理员后台逐条添加链接，可设置可选标题与顺序。

## 数据模型

新建表 `public.session_highlights`：

- `session_id` (uuid, 关联 tournament_sessions)
- `youtube_url` (text, 完整 URL 或 ID)
- `title` (text, nullable, 例如 "决赛 Game 3" )
- `sort_order` (int, default 0)
- 标准 id / created_at

RLS：
- 所有人可读（与 sessions 一致）
- 仅 `admin` 角色可增删改
- GRANT：`anon` SELECT，`authenticated` 全权，`service_role` 全权

## 前端改动

```text
src/
├─ components/
│  ├─ HighlightsGallery.tsx          [新增] Dialog 画廊 + 主播放器 + 缩略图列表
│  ├─ LiteYouTubeEmbed.tsx           [新增] 点击前只显示缩略图，点击后挂载 iframe
│  └─ admin/
│     └─ SessionHighlightsEditor.tsx [新增] 管理员录入/排序/删除集锦
├─ pages/
│  └─ SessionHistoryPage.tsx         [改] 卡片底部加 “▶ N 段集锦” chip，触发 Gallery
├─ hooks/
│  └─ useRankings.ts                 [改] 一并拉取 session_highlights 并按 session_id 分组
├─ types/ranking.ts                  [改] 加 SessionHighlight 类型
└─ i18n/translations.ts              [改] zh-CN/en 字串：集锦/添加链接/暂无视频 等
```

管理员后台 `src/components/admin/SessionHistory.tsx` 在每张 session 行的 icon 工具栏增加一个 `Video` 图标按钮，点击打开 `SessionHighlightsEditor`，输入框支持粘贴 YouTube URL，自动解析视频 ID，列表可拖动排序。

## 视觉细节（保持「Cinematic Arena」基调）

- chip 样式：透明黑底 + 细描边 + `text-primary` 红色播放三角，hover 微发光，与现有 champion/runner_up badge 同等克制。
- Gallery Dialog：黑色背景、栗色描边，主区域 16:9，右侧（或下方）4 列缩略图，当前选中加红色 ring。
- 缩略图统一用 YouTube 的 `hqdefault.jpg`，左上角小序号 `01 / 12`。
- 移动端：Dialog 全屏，缩略图改为下方横向滑动条。
- 卡片本身高度不变（chip 与现有 "总分" 行并排）。

## 性能与防呆

- 仅在用户点击 chip 后才加载缩略图；点击单个缩略图才挂载 iframe（`youtube-nocookie.com`、`rel=0`）。
- 输入 URL 时做 ID 解析（支持 `youtu.be/`、`watch?v=`、`shorts/`、纯 ID），无效则提示。
- 卡片上的 chip 数字始终反映实际条数，0 条则不渲染 chip。

## 不动的部分

- 不改排行榜、不动评分逻辑、不动现有照片 Lightbox 行为。
- 不引入第三方 YouTube 组件库，自行实现 lite embed，约 40 行。
