## 再次精简 LatestSessionPhoto

进一步去除重复元素，桌面版改为长方形照片。

### 移除
- 照片左上角 `#matchIndex` 徽章（重复）
- 照片右下角日期徽章（与 footer 日期重复）
- 底部 footer 整行（日期 + 查看更多）

### 保留
- 顶部标签条："最新赛事合照 / LATEST MATCH PHOTO" + LIVE 指示
- 合照图片（唯一主视觉）

### 桌面版改长方形
- 照片容器从 `aspect-square` 改为 `aspect-[4/3]`（横向长方形，更适合团体合照）
- 卡片宽度维持 340px（桌面 hero 右侧仍居中显示）

### 技术细节
只改 `src/components/hero/LatestSessionPhoto.tsx`：
- 删除 `matchIndex` useMemo 及相关 JSX
- 删除照片上的两个绝对定位徽章
- 删除底部 footer div 及 `Link` import（如无其他用途）
- `aspect-square` → `aspect-[4/3]`
- 保留 loading / no-photo fallback

不改动其它文件。
