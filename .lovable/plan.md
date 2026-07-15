## 简化 LatestSessionPhoto 组件

移除杂项文字，让最新赛事合照更简洁，把照片本身作为主角。

### 保留
- 顶部小标签："最新赛事合照 / LATEST MATCH PHOTO" + LIVE 指示灯（缩小）
- 合照图片（主视觉）
- 照片左上角 `#matchIndex` 徽章
- 照片右下角日期徽章
- 底部 "查看更多 →" 链接

### 移除
- 场次名称（大标题 lime-slab）
- "冠军 · xxx" 副标题
- 三格统计块（场次 / 出席 / 冠军）
- 底部重复的日期文字

### 视觉调整
- 卡片改为「以图为主」：照片占比更大（去掉下方大段 meta 区）
- 底部只保留一条极简 footer：日期 + 查看更多链接
- 保持现有旋转/阴影/边框风格与 poster 手感

### 技术细节
只改 `src/components/hero/LatestSessionPhoto.tsx`：
- 删除 `champions`、`playerCount` 的 useMemo（不再显示）
- 删除 Meta 区块中的标题和 stat trio 网格
- 保留 `latest`、`matchIndex` 计算
- 卡片宽度维持 340px，照片仍为 aspect-square

不改动其它文件，不改后端。
