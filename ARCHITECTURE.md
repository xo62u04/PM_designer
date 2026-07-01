# 架構說明：AI PM 設計師的 Loop

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

建議每個專案在使用者自己的專案管理資料夾裡建立：

```
<project-root>/pm-workspace/
  00-intake-clarify.md       # pm-project-clarify 的輸出：目標、範圍、關係人初稿
  01-stakeholders-raci.md    # pm-raci-watchouts 的輸出：關係人清單、RACI矩陣、各角色注意事項
  02-wbs.md                  # pm-wbs-kickoff 的輸出：WBS、里程碑、風險
  03-status-log.md           # pm-meeting-loop 每輪會議 recap/synthesize 後更新的專案狀態總表
  meetings/
    2026-07-01-kickoff-agenda.md
    2026-07-01-kickoff-recap.md
    ...
```

所有 skill 在執行時都應該：
1. 先檢查這些檔案是否已存在，存在就讀取當作上下文，不要重問已經回答過的問題
2. 產出後寫回對應檔案（或提示使用者將輸出貼入對應檔案）
3. 在輸出結尾附上「下一步該跑哪個 skill」的提示，讓 loop 走得下去

## 為什麼用「Skill」而不是自己刻一個 App

這幾件事（會議記錄整理、RACI、WBS、關係人簡報）已經有品質不錯的開源實作（見下方第三方來源），刻意重造是浪費。這個專案的價值在於：

1. **把分散的技能串成一個針對「新人 PM」設計的完整 loop**（市面上沒有工具做到，見調研結論）
2. **補上市面上缺的兩塊**：新人 PM 上崗引導、「目標 / 關係人 / 交付對象」的釐清問答、以及 RACI 角色的「注意事項」清單 — 這些是新寫的 skill
3. **沿用 [agentic-project-management](https://github.com/sdi2200262/agentic-project-management) 的核心概念**：專案狀態存在 agent context 之外的結構化檔案（artifact）裡，而不是塞在一次對話的記憶裡 — 這裡沒有引用其程式碼，純粹借用「外部化狀態、可交接」的架構想法

## 檔案分工

- `skills/vendor/pm-skills/` — 原封不動搬進來的上游 skill（Apache-2.0，見 `THIRD_PARTY_NOTICES.md`），負責「會議 agenda / brief / recap / synthesize」「stakeholder briefing / update / summary」「OKR」「風險評估」「行動計畫」「問題陳述」這幾個已經做得很成熟的環節
- `skills/pm-onboarding/`、`pm-project-clarify/`、`pm-raci-watchouts/`、`pm-wbs-kickoff/`、`pm-meeting-loop/` — 這個專案新寫的 skill，負責把上面那些 vendor skill 串起來，並補上市面沒有的引導式問答與新人向的內容
