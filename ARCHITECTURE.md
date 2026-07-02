# 架構說明：AI PM 設計師的 Loop

## 輸入模式：餵素材，不是逐題訪談

這套 loop 預設 PM 手上已經有三類素材，直接餵給對應 skill：

1. **會議記錄**（逐字稿、轉錄工具輸出、手記）→ 主要餵給 `pm-meeting-loop`
2. **專案功能清單**（PRD、Backlog、規格書）→ 主要餵給 `pm-wbs-kickoff`（也可給 `pm-project-clarify` 判斷範圍）
3. **專案目標描述**（老闆的一段話、企劃書）→ 主要餵給 `pm-project-clarify`

每個 skill 的第一步都是「先從素材裡榨答案」，只對榨不出來、素材模糊或矛盾的部分才回頭問使用者——尤其是「誰是決策者 vs 誰只是顧問」這種功能清單/會議記錄通常不會寫清楚的資訊，這塊即使素材看起來完整也要當作大概率的缺口去追問。逐題訪談是 fallback，不是預設路徑。

## 概念

這個專案不是一個「一次生成」的工具，而是一組會互相餵資料的 **Skill**，串成一個 PM 每接一個新專案都會走一輪、之後每次開會再走一小輪的 loop：

```
             ┌─────────────────────────────────────────────┐
             │                                               │
   新人上崗 → 專案釐清 → 關係人/RACI → WBS 規劃 → 會議 loop ──┘
 pm-onboarding  pm-project-  pm-raci-   pm-wbs-    pm-meeting-loop
                clarify      watchouts  kickoff    (agenda→recap→追蹤→回饋)
```

- **一次性（專案起始時走一遍）**：`pm-onboarding` → `pm-project-clarify` → `pm-raci-watchouts` → `pm-wbs-kickoff`
- **重複性（每次會議都走一遍，並回饋進 WBS/RACI）**：`pm-meeting-loop`

每個 skill 都讀寫同一組專案工作區檔案，這樣後面的 skill 才能接住前面 skill 的產出，而不是每次都從零開始問。

## 專案工作區慣例

每個專案在 `<owner>/<project-slug>/pm-workspace/` 底下建立，`owner` 是使用者自己的（本地單一使用者的話固定用一個資料夾名即可，例如自己的名字或 `me`）；這個 `<owner>/<project-slug>/` 分層是刻意的，即使現在是個人本地使用、沒有登入系統，日後要接多人也不用重構資料夾結構，只要在上面加一層帳號驗證即可：

```
<owner>/<project-slug>/
  project.json                 # { "name": "顯示用的專案名稱" }
  pm-workspace/
    00-intake-clarify.md       # pm-project-clarify 的輸出：目標、範圍、關係人初稿
    01-stakeholders-raci.md    # pm-raci-watchouts 的輸出（人看）
    01-stakeholders-raci.json  # 同上，機器可讀版本，給 dashboard 用
    02-wbs.md                  # pm-wbs-kickoff 的輸出（人看）
    02-wbs.json                # 同上，機器可讀版本
    03-status-log.md           # pm-meeting-loop 累積的專案狀態總表（人看）
    03-status-log.json         # 同上，機器可讀版本
    meetings/
      2026-07-01-kickoff-agenda.md
      2026-07-01-kickoff-recap.md
      2026-07-01-kickoff.json  # 該場會議的 action item / 決策，機器可讀版本
      ...
```

每個機器可讀 `.json` 都對應一份給人看的 `.md`，兩者內容必須一致——`.md` 給人在編輯器/git 裡讀，`.json` 給 `dashboard/` 儀表板讀。schema 定義在 `dashboard/lib/types.ts`，各 skill 的「寫回工作區」段落裡有各自欄位的說明與範例。

所有 skill 在執行時都應該：
1. 先檢查這些檔案是否已存在，存在就讀取當作上下文，不要重問已經回答過的問題
2. 產出後同時寫回 `.md`（人看）與 `.json`（機器可讀，儀表板用）兩份檔案，不要只寫其中一份
3. 在輸出結尾附上「下一步該跑哪個 skill」的提示，讓 loop 走得下去

## 儀表板（`dashboard/`）

`dashboard/` 是一個純檢視、不含 AI 生成的本地 Next.js 網頁，讀取上述 `<owner>/<project-slug>/pm-workspace/*.json`，畫成 RACI 表、WBS 看板、action item 清單（含逾期提醒）、會議時間軸。它只負責「把已經產出的資料視覺化」，不負責產生內容——內容還是由上面幾個 skill 在 Claude Code 裡產生。

- 資料根目錄預設是這個 repo 的 `data/`（可用環境變數 `PM_DESIGNER_DATA_ROOT` 指向別的路徑，例如你實際在用的專案資料夾）
- 個人本地使用，沒有登入系統；`data/demo/sample-project/` 是內建的範例資料，方便直接 `npm run dev` 看效果
- 跑法：`cd dashboard && npm install && npm run dev`，預設 http://localhost:3000

## 為什麼用「Skill」而不是自己刻一個 App

這幾件事（會議記錄整理、RACI、WBS、關係人簡報）已經有品質不錯的開源實作（見下方第三方來源），刻意重造是浪費。這個專案的價值在於：

1. **把分散的技能串成一個針對「新人 PM」設計的完整 loop**（市面上沒有工具做到，見調研結論）
2. **補上市面上缺的兩塊**：新人 PM 上崗引導、「目標 / 關係人 / 交付對象」的釐清問答、以及 RACI 角色的「注意事項」清單 — 這些是新寫的 skill
3. **沿用 [agentic-project-management](https://github.com/sdi2200262/agentic-project-management) 的核心概念**：專案狀態存在 agent context 之外的結構化檔案（artifact）裡，而不是塞在一次對話的記憶裡 — 這裡沒有引用其程式碼，純粹借用「外部化狀態、可交接」的架構想法

## 檔案分工

- `skills/vendor/pm-skills/` — 原封不動搬進來的上游 skill（Apache-2.0，見 `THIRD_PARTY_NOTICES.md`），負責「會議 agenda / brief / recap / synthesize」「stakeholder briefing / update / summary」「OKR」「風險評估」「行動計畫」「問題陳述」這幾個已經做得很成熟的環節
- `skills/pm-onboarding/`、`pm-project-clarify/`、`pm-raci-watchouts/`、`pm-wbs-kickoff/`、`pm-meeting-loop/` — 這個專案新寫的 skill，負責把上面那些 vendor skill 串起來，並補上市面沒有的引導式問答與新人向的內容
