## 改动
仅 `src/components/DesktopRankingTable.tsx`，只调密度 token，行高由头像自然撑开（移除 `py-*` 上下 padding 的硬约束，改用 `min-h` 保底 + 头像尺寸驱动）。

### 头像尺寸放大
| token | compact | comfortable |
|---|---|---|
| `avatar`（4+ 名） | `w-10 h-10` → `w-12 h-12` | `w-12 h-12` → `w-16 h-16` |
| `topAvatar`（前三） | `w-11 h-11` → `w-14 h-14` | `w-14 h-14` → `w-20 h-20` |

### 行高自适应
- 删除 `rowPadY` / `topRowPadY` 上的固定 `py-2/2.5/3/4`，改为 `py-1.5` 的最小 padding，让 flex 容器和头像自然撑开高度。
- 头像 `flex-shrink-0`，`TableCell` 保持 `align-middle`，行高会随头像 = `min(内容, avatar+padding)` 自动增长。
- 分隔条 `sepH` 保持不变。

### 前三名徽章 & 进度条同步放大
| token | compact | comfortable |
|---|---|---|
| `topRankBadge` | `w-9 h-9` → `w-11 h-11` | `w-10 h-10` → `w-14 h-14 text-xl` |
| `rankBadge`（4+） | `w-7 h-7` | `w-8 h-8` → `w-9 h-9` |
| `topBarH` | `h-8` → `h-10` | `h-10` → `h-12` |
| `barH` | `h-6` → `h-7` | `h-7` → `h-9` |

### 兼容
- 表格 `table-fixed` 列宽不变。
- 其他样式（hover 抬升、渐变分隔、MAX 徽章、进度条动画）保留。
- 不动移动端和其他文件。
