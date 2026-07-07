## 改动
仅 `src/components/DesktopRankingTable.tsx`。

### 1. 移除 4 名后的灰度效果
删除头像 button 上的 `!isTopThree && 'grayscale group-hover:grayscale-0'`，所有球员头像保持原色。

### 2. 放大头像 + 增加间距
密度 token 调整：

| token | compact 旧 → 新 | comfortable 旧 → 新 |
|---|---|---|
| `avatar`（普通行） | `w-8 h-8` → `w-10 h-10` | `w-9 h-9` → `w-12 h-12` |
| 新增 `topAvatar`（前三名） | `w-11 h-11` | `w-14 h-14` |
| `gap`（头像与文字） | `gap-2.5` → `gap-3` | `gap-3` → `gap-4` |
| `rowPadY`（普通行） | `py-1.5` → `py-2` | `py-2` → `py-2.5` |
| `topRowPadY` | `py-2.5` → `py-3` | `py-3.5` → `py-4` |

前三名头像加 `border-2` 黑边 + `shadow-[2px_2px_0_0_hsl(var(--foreground))]` 强化视觉重量；普通行头像保留 `border` 单线。

### 3. 兼容性
- 保留 hover scale 110、圆角、点击 lightbox 逻辑。
- 密度切换不受影响。
- 列宽不变。

不动其他文件。
