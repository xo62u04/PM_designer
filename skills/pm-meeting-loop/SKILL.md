---
name: pm-meeting-loop
description: Runs the recurring pre-meeting/post-meeting loop for a project — builds the agenda from open WBS items and stakeholder context, turns the transcript/notes into a recap with owners and due dates, writes those updates back into the WBS and status log, pushes translated updates to non-attendee stakeholders, and periodically synthesizes patterns across meetings. Use before and after every project meeting for the life of the project.
metadata:
  classification: pm-designer-core
  version: "1.0.0"
  category: meetings
  author: pm-designer
  composes: [foundation-meeting-agenda, foundation-meeting-brief, foundation-meeting-recap, foundation-meeting-synthesize, foundation-stakeholder-update]
---
<!-- PM_designer project-original skill -->
# 會議 Loop：Agenda → Recap → 追蹤 → 回饋 (pm-meeting-loop)

這是專案進行中會不斷重複的一輪。每次開會前後都跑一次，讓會議記錄不再是「開完就沒人看」的文件，而是直接回饋進 WBS 與關係人溝通。

## 什麼時候用

- 任何專案會議（週會、里程碑review、決策會議、老闆彙報、顧問諮詢）的會前與會後
- 需要跨多場會議看趨勢/追蹤 open item 是否一直沒解決時

## 執行方式

### 會前：產出 Agenda（必要時加 Brief）

1. 讀 `pm-workspace/02-wbs.md` 找出目前逾期/卡住/即將到里程碑的項目，讀 `01-stakeholders-raci.md` 確認這場會議該找誰（誰是這些項目的 A/R，是否需要顧問或老闆到場）
2. 用 `foundation-meeting-agenda`（`skills/vendor/pm-skills/foundation-meeting-agenda/SKILL.md`）產生 agenda，會議類型依對象選（例如對老闆用 stakeholder-review/exec-briefing、對開發用 planning/working-session、專案第一場用 project-kickoff）
3. 若是對老闆/顧問的高風險彙報（例如要爭取資源、報告延誤），額外用 `foundation-meeting-brief`（`skills/vendor/pm-skills/foundation-meeting-brief/SKILL.md`）做 PM 自己的私下佈局準備，這份不對外分享
4. 存成 `pm-workspace/meetings/<日期>-<主題>-agenda.md`

### 會後：產出 Recap 並抓時間/追蹤

1. 拿到逐字稿或手記（Zoom/Meet/Otter/Fireflies/純文字皆可），用 `foundation-meeting-recap`（`skills/vendor/pm-skills/foundation-meeting-recap/SKILL.md`）產生 recap，它會自動比對前面產生的 agenda，標出「原訂議程 vs 實際討論」的落差
2. 從 recap 抓出的每個 action item，必須明確標：負責人、截止日、對應到 WBS 的哪個工作包
3. 記錄本場會議的「抓時間」資訊：預定時長 vs 實際時長、哪個議題超時。若同一個議題連續兩場會議都超時，在輸出中主動提示這代表議程規劃或範圍有問題
4. 存成 `pm-workspace/meetings/<日期>-<主題>-recap.md`

### 回饋：更新 WBS 與狀態總表

1. 把 recap 抓到的 action item / 決策，寫回 `pm-workspace/02-wbs.md` 對應任務的狀態（完成/進行中/卡住/新增）
2. 更新 `pm-workspace/03-status-log.md`：本次會議摘要、決策清單、未解決事項、下次追蹤日期
3. 若 recap 中出現新的關係人或範圍變化（例如冒出一個沒被列進 RACI 的決策者），提示使用者回頭跑 `pm-project-clarify` 或 `pm-raci-watchouts` 補上——這是 loop 往回走的地方，不要放著不管

### 定期：跨會議綜合分析

每累積 4-6 場會議、或使用者明確要求時，用 `foundation-meeting-synthesize`（`skills/vendor/pm-skills/foundation-meeting-synthesize/SKILL.md`）讀取一批 recap，找出：反覆卡住沒解決的議題、關係人立場是否有變化、決策是否前後矛盾。這是抓「這件事開會三次都沒進展」這種問題的機制。

### 對非與會者的溝通

用 `foundation-stakeholder-update`（`skills/vendor/pm-skills/foundation-stakeholder-update/SKILL.md`）把會議結論翻成給老闆/顧問/其他部門看的版本（依對象調整詳細程度與用詞），確保沒到場的關係人不會資訊落後。

## 輸出總覽

- `pm-workspace/meetings/<日期>-<主題>-agenda.md`
- `pm-workspace/meetings/<日期>-<主題>-recap.md`
- `pm-workspace/meetings/<日期>-<主題>.json` — 給 `dashboard/` 儀表板讀的機器可讀版本（schema 見 `dashboard/lib/types.ts` 的 `MeetingRecord`），recap 完成後寫入或更新：

  ```json
  {
    "date": "2026-07-01", "topic": "週會", "type": "planning",
    "plannedMinutes": 30, "actualMinutes": 50,
    "decisions": ["..."],
    "actionItems": [
      { "id": "a1", "description": "...", "owner": "開發組", "dueDate": "2026-07-10", "status": "open", "linkedWbsId": "wp3" }
    ]
  }
  ```

  `status` 只能是 `open`｜`done`；`linkedWbsId` 對應到 `02-wbs.json` 裡的工作包 `id`，找不到對應項目就省略這個欄位，不要瞎猜。這個檔名不含 `-agenda`/`-recap` 後綴，方便跟同一場會議的兩份 md 區分。

- 更新後的 `pm-workspace/02-wbs.md`、`03-status-log.md`，以及對應的 `02-wbs.json`（工作包狀態隨 recap 更新時同步改 `status`）、`03-status-log.json`（schema 見 `StatusLog`：`{"entries":[{"date","summary","openItems","decisions","nextCheckIn"}]}`）
- 視情況：對外的 stakeholder update、跨會議 synthesize 報告
