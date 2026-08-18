# Johnny Education Centre — Company Website

小朋友私人教育中心官方網站（主頁 + 課程頁佔位）。

## 技術棧

- Next.js 16（App Router，static export）
- React 19 + TypeScript
- Tailwind CSS v4
- lucide-react 圖示

## 內容

- 公司簡介
- 教學理念（小班互動 / 遊戲式學習 / 建立自信 / 科技啟蒙）
- 精選課程 ×4（AI 小小探索班、兒童 Python 啟蒙班、小學全科提升班、創意繪畫小達人班）— 含收費、Learn More 連到課程頁（目前為佔位頁）
- 師資介紹（Johnny Ip 校長）
- 聯絡方式 + 營業時間
- Footer

## 本地開發

```bash
npm install
npm run dev      # http://localhost:3000
```

## 建置

```bash
npm run lint
npx tsc --noEmit
npm run build    # 輸出到 out/（static export）
```

## 已放入素材

| 位置 | 素材 | 說明 |
|---|---|---|
| `public/images/logo.png` | ✅ 公司標誌 | 537×556 透明 PNG |
| `public/images/courses/*.jpg` | ✅ 課程相片 ×4 | 900×599 JPEG（已壓縮） |

> 課程相片對應：`ai-explorer`、`python-kids`、`primary-boost`、`creative-art`（依傳送順序）

## 待補充素材

- `src/lib/site.ts` → `contact`：真實電話 / WhatsApp / 地址（目前為文件中的範例資料）
- 如之後要換課程相片，直接覆蓋 `public/images/courses/<slug>.jpg` 即可

## 部署

已設定 `output: "export"`，之後可部署到 GitHub Pages 或其他靜態主機。
（如部署到子路徑，需在 `next.config.ts` 加上 `basePath`。）
