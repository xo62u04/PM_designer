# PM Designer — AI PM 設計師

一套 Claude Code Skill，串成一個 loop，協助新人 PM：

1. 上崗（了解組織要用的工具與流程）
2. 釐清新專案的目標、關係人（老闆/顧問/開發/交付對象）
3. 建立權責矩陣（RACI）與各角色注意事項
4. 產出新專案的 WBS
5. 跑會議前後 loop（agenda → recap → 追蹤 → 回饋 → 跨會議綜合分析）

## 為什麼這樣做

調研後發現，市面上（開源與 SaaS）沒有任何單一產品把這五件事串成一個給新人 PM 用的完整流程：會議記錄類工具（Otter/Fireflies 等）最成熟但不懂專案脈絡；WBS 產生器是單次生成不迭代；RACI 多半是靜態模板；onboarding 知識庫是企業內部客製。

因此這個專案：

- **沿用**已經做得很成熟的部分：把 [product-on-purpose/pm-skills](https://github.com/product-on-purpose/pm-skills)（Apache-2.0）裡跟會議記錄、關係人溝通相關的 11 個 skill 直接搬進 `skills/vendor/pm-skills/`（原文照抄，未修改，見 `THIRD_PARTY_NOTICES.md`）
- **新寫**市面上缺的部分：`pm-onboarding`、`pm-project-clarify`、`pm-raci-watchouts`、`pm-wbs-kickoff`、`pm-meeting-loop` 五個 skill，把上面 vendor 進來的能力串成一個 loop
- **借用概念**（不是程式碼）：[agentic-project-management](https://github.com/sdi2200262/agentic-project-management) 把專案狀態外部化成結構化檔案、可在對話之間交接的作法，套用成 `pm-workspace/` 的檔案慣例

詳細架構與 loop 圖見 [`ARCHITECTURE.md`](./ARCHITECTURE.md)。

## Skill 一覽

| Skill | 對應需求 | 說明 |
|---|---|---|
| `pm-onboarding` | 新人上崗、PM 工具與流程 | 第一週/第一個月 checklist，並導向下一個該跑的 skill |
| `pm-project-clarify` | 釐清目標與關係人 | 引導式提問：老闆/顧問/開發/交付對象分開釐清 |
| `pm-raci-watchouts` | 各權責注意事項 | 產出 RACI 矩陣 + 每個角色常踩的坑 |
| `pm-wbs-kickoff` | 新專案 WBS 規劃 | 從已釐清的目標/RACI 生成有負責人的 WBS |
| `pm-meeting-loop` | 會議記錄/追蹤/抓時間 | agenda → recap → 回饋進 WBS → 跨會議綜合分析 |

## 安裝／使用

這是一個 Claude Code plugin（`.claude-plugin/plugin.json`），把整個 repo 加入 Claude Code 的 plugin 路徑後，即可用 `/pm-onboarding`、`/pm-project-clarify` 等方式呼叫各 skill，或讓 Claude 依描述自動選用。

新專案建議的跑法順序：

```
pm-onboarding → pm-project-clarify → pm-raci-watchouts → pm-wbs-kickoff → (重複) pm-meeting-loop
```

## 授權

本專案原創部分沿用你所選擇的授權；vendor 進來的 `skills/vendor/pm-skills/` 內容為 Apache-2.0，詳見該目錄的 `LICENSE`、`NOTICE.md` 與根目錄 `THIRD_PARTY_NOTICES.md`。
