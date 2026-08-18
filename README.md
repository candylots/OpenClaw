# 待辦清單 Todo App ✅

現代設計的 Todo List Web App：新增、編輯、刪除、完成標記。

🔗 線上版本：<https://candylots.github.io/OpenClaw/>

## 功能

- ➕ 新增任務（Enter 快速新增）
- ✏️ 內聯編輯（Enter 儲存 / Esc 取消）
- 🗑️ 刪除任務（含確認對話框）
- ☑️ 完成標記（含刪除線樣式）
- 🔍 篩選：全部 / 進行中 / 已完成
- 📊 完成進度條與剩餘統計
- 🌙 深色 / 淺色模式（跟隨系統）
- 💾 資料僅儲存於瀏覽器 LocalStorage，跨分頁即時同步
- 📱 響應式設計，行動裝置友善

## 技術棧

- [Next.js 16](https://nextjs.org/)（App Router，static export）
- React 19 + TypeScript
- Tailwind CSS v4
- [shadcn/ui](https://ui.shadcn.com/)（Base UI）＋ lucide-react 圖示
- [Zod](https://zod.dev/)（輸入與 LocalStorage 資料驗證）
- [next-themes](https://github.com/pacocoursey/next-themes)（深色模式）
- LocalStorage 做為資料儲存（無後端、無資料庫）

## 本地開發

```bash
npm install
npm run dev      # http://localhost:3000
```

## 品質檢查與建置

```bash
npm run lint     # ESLint
npx tsc --noEmit # TypeScript type check
npm run build    # 產生 static export 到 out/
```

## 部署

靜態輸出（`out/`）透過 GitHub Actions 自動部署到 GitHub Pages：
`.github/workflows/deploy.yml`。流程使用 GitHub 內建 `GITHUB_TOKEN`，
不需要任何額外機密。

- 網址：<https://candylots.github.io/OpenClaw/>
- `basePath` 設為 `/OpenClaw`，所有 asset 路徑自動前綴

## 資料隱私

所有任務資料只存在使用者的瀏覽器 LocalStorage，**不會**上傳到任何伺服器。
清除瀏覽器資料即可完全移除。
