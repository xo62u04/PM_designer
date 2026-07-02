---
name: pm-onboarding
description: Orients a newly-hired or newly-assigned PM to their role, the PM toolchain they need access to, and this plugin's skill loop. Use when a PM is new to the company/team, is taking over an existing project, or wants a refresher on which pm-* skill to run at which stage of a project.
metadata:
  classification: pm-designer-core
  version: "1.0.0"
  category: onboarding
  author: pm-designer
---
<!-- PM_designer project-original skill -->
# PM 新人上崗 (pm-onboarding)

給剛上任、或剛接手一個既有專案的 PM 用的引導 skill。目標不是「教你當 PM 的理論」，而是幫你在第一週內把「這個組織 PM 該用什麼工具、走什麼流程、下一步該找誰」這件事釐清。

## 什麼時候用

- 新人 PM 剛入職或剛被指派一個新專案
- PM 接手一個已經在跑的專案，需要快速掌握現況
- 需要跟主管解釋「我打算怎麼上手」

## 執行方式

### 1. 先問組織現況（不要假設）

逐一確認以下問題，沒有答案的就列成「待確認」清單，不要自己腦補：

- **溝通/文件工具**：公司用什麼開會（Zoom/Meet/Teams）、什麼做會議記錄或轉錄（Otter/Fireflies/Krisp/純手記）、什麼放文件（Notion/Confluence/Google Docs）、什麼追蹤任務（Jira/Asana/ClickUp/Trello）
- **既有專案文件**：有沒有舊的專案簡報、WBS、需求文件、RACI、會議記錄可以先讀
- **組織位階**：誰是這個專案的老闆/贊助者（決策、簽核預算）、有沒有外部顧問（給意見、不做決策）、開發/執行團隊是誰、最終產出要交給誰（可能是老闆、客戶、或另一個部門）
- **既有節奏**：目前有沒有固定的週會/雙週會、review 節奏

### 2. 建立工作區

在專案資料夾建立 `pm-workspace/`（結構見專案根目錄的 `ARCHITECTURE.md`），準備給後續 skill 讀寫。如果專案已經在跑，先把既有文件整理進對應檔案，而不是從零開始問一次。

### 3. 給出第一週 / 第一個月的行動清單

輸出一份 checklist，至少包含：

**第一週**
- [ ] 取得所有工具存取權限（列出清單 + 負責申請的人）
- [ ] 找出並通讀既有專案文件（若無則標記「無，需要從 pm-project-clarify 開始」）
- [ ] 排 1-on-1 認識關鍵關係人（老闆、顧問、開發窗口）
- [ ] 跑一次 `pm-project-clarify`，把目標/範圍/關係人寫進 `00-intake-clarify.md`

**第一個月**
- [ ] 跑 `pm-raci-watchouts` 產出 RACI 與各角色注意事項
- [ ] 跑 `pm-wbs-kickoff` 產出或校對 WBS
- [ ] 開始用 `pm-meeting-loop` 跑會議前後流程
- [ ] 跟主管對齊一次「我理解的專案現況」，確認沒有認知落差

### 4. 說明 loop 怎麼接下去

明確告訴使用者這個 skill 只是入口，接下來依專案狀態導向：

- 全新專案、還沒人釐清過目標/關係人 → 下一步 `pm-project-clarify`
- 已經有目標/關係人但角色責任不清 → `pm-raci-watchouts`
- 目標關係人都清楚但沒有 WBS/時程 → `pm-wbs-kickoff`
- 一切都有了，現在要開始跑會議節奏 → `pm-meeting-loop`

## 常見新人 PM 誤區（主動提醒）

- 把「顧問的意見」當「老闆的決策」直接往下執行，沒有回頭確認誰真的拍板
- 沒有釐清「這個專案要交付給誰驗收」就開始規劃，導致驗收標準與規劃脫節
- 用會議記錄工具抓 action item，但沒有人把它跟 WBS 的進度對上，導致任務游離在外
- 沿用上一個公司的流程術語（例如 RACI、Scrum 儀式）但沒有先確認這個組織實際上怎麼運作

## 輸出

一份新人上崗 checklist + 待確認問題清單，並建議建立 `pm-workspace/` 目錄開始下一步。
