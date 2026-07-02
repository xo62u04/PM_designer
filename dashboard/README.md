# PM Designer 儀表板

純檢視、不含 AI 生成的本地儀表板。讀取 `../data/<owner>/<project>/pm-workspace/*.json`（由 `../skills/pm-raci-watchouts`、`pm-wbs-kickoff`、`pm-meeting-loop` 產出），畫成 RACI 表、WBS 看板、action item 逾期清單、會議時間軸。

## 跑法

```bash
npm install
npm run dev
```

開 http://localhost:3000。預設讀這個 repo 的 `../data/`（內建 `demo/sample-project` 範例資料）；要指到別的資料夾，設定環境變數：

```bash
PM_DESIGNER_DATA_ROOT=/path/to/your/data npm run dev
```

## 資料 schema

見 `lib/types.ts`。詳細的資料夾慣例（`<owner>/<project-slug>/pm-workspace/...`）與各檔案由哪個 skill 產出，見根目錄的 `../ARCHITECTURE.md`。
