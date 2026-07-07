## 问题
截图显示：排名号码徽章（红/蓝色方块）与球员头像之间几乎贴在一起，右侧名字与头像也偏近；行与行的分隔条较厚，整体节奏拥挤。

## 只改一个文件
`src/components/DesktopRankingTable.tsx`，仅调 spacing / gap / 分隔条 token，不动列宽结构、颜色语义、动画。

### 1. 号码 ↔ 头像 之间加呼吸
- `firstPadX`: `pl-5 pr-4` → `pl-5 pr-6`（rank 列右侧 padding 加大，把徽章推离头像）
- 头像所在 cell 的 `cellPadX` 保持 `px-4`，但内部 flex 的 `gap` 由 `gap-5` → `gap-6`（头像 ↔ 名字更松）

### 2. 前三名徽章微缩，避免视觉压迫
- `topRankBadge`: `w-14 h-14 text-xl` → `w-12 h-12 text-lg`（仍明显大于 4+ 名的 `w-9 h-9`，但不再逼近头像尺寸）
- `rankBadge`（4+）保持 `w-9 h-9 text-lg`

### 3. 头像与名字节奏
- 前三头像 `topAvatar`: `w-20 h-20` → `w-[72px] h-[72px]`（略收，配合徽章缩小后整体协调）
- 4+ 名 `avatar` 保持 `w-16 h-16`

### 4. 行间分隔与行高
- `sepH`: `h-2` → `h-1.5`（前二名下方渐变分隔条更纤细）
- `topRowPadY`: `py-4` → `py-3.5`，`rowPadY`: `py-3.5` → `py-3`（配合徽章缩小，整体上下更均衡）

### 5. 名字与升降箭头
- 名字与 `getRankChangeDisplay` 之间 `gap-2` → `gap-2.5`，让 ↑3 / ↓2 与名字分离更清晰

### 6. 数字列微调（保持之前对齐规则）
- `sessionsPadX`: `pl-8 pr-4` → `pl-10 pr-4`（头像 → sessions 列拉开更多，避免第一排数字贴头像观感）

## 不动
- 表格列宽 / `table-fixed`
- 颜色、border、shadow 语义
- 进度条填充动画、MAX 徽章
- 移动端、其他文件、翻译

## 验证
改完用 Playwright 截桌面端 `http://localhost:8080/` 排行区，肉眼确认号码与头像之间有明显留白、整体节奏舒展。
