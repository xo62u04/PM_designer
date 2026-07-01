---
name: pm-wbs-kickoff
description: Runs the intake-to-WBS loop when a new project or phase is kicked off — asks the clarifying questions a work breakdown structure actually needs (deliverables, dependencies, constraints, owners), then produces a WBS with milestones and owners pulled from the project's RACI. Use at project/phase kickoff, or whenever a scope change requires re-planning.
metadata:
  classification: pm-designer-core
  version: "1.0.0"
  category: planning
  author: pm-designer
  composes: [foundation-prioritized-action-plan]
---
<!-- PM_designer project-original skill -->
# 新專案 WBS 規劃 (pm-wbs-kickoff)

新專案進案時，把已經釐清的目標/關係人/RACI 轉成可執行的 WBS，而不是憑空生成一份樹狀圖。

## 什麼時候用

- 已經跑完 `pm-project-clarify` 與 `pm-raci-watchouts`，現在要規劃怎麼做
- 專案進行中範圍變更，需要重新規劃 WBS

## 執行方式

### 1. 讀取輸入

讀 `pm-workspace/00-intake-clarify.md`（目標/範圍/死線）與 `01-stakeholders-raci.md`（誰是各項目的 R）。若這兩份不存在，先提示使用者回頭跑 `pm-project-clarify` / `pm-raci-watchouts`，不要在缺乏關係人資訊的狀況下硬生成 WBS（負責人會是空的）。

### 2. 規劃前的釐清問題

在生成 WBS 之前，確認：
- 主要交付物有哪些？（對應 clarify 文件的範圍段落）
- 交付物之間的相依關係與順序限制
- 已知的硬性死線／里程碑
- 團隊產能與既有承諾（避免規劃出不可能的時程）
- 驗收標準（來自交付對象，不是 PM 自己假設）

### 3. 產生 WBS

用 `foundation-prioritized-action-plan`（`skills/vendor/pm-skills/foundation-prioritized-action-plan/SKILL.md`）作為生成引擎，把上述輸入轉成結構化行動計畫，再整理成 WBS 階層：

```
專案
 └─ 階段 / 里程碑
     └─ 工作包（Work Package）
         └─ 任務（Task）：負責人（來自 RACI 的 R）｜預估工時｜相依項｜狀態
```

- 每個工作包的負責人預設帶入 RACI 表中的 R；若 RACI 沒有對應角色，標記「待指派」
- 標出關鍵路徑與風險最高的工作包（沿用 `foundation-prioritized-action-plan` 的風險/前提假設分析）
- 標示哪些任務卡在「等待顧問意見」或「等待老闆決策」，這類任務要特別標記，因為常常是進度卡住的真因

### 4. 寫回工作區

輸出寫入 `pm-workspace/02-wbs.md`：WBS 樹狀結構 + 里程碑時間軸 + 待指派清單 + 風險清單。

## 下一步

WBS 定案後，用 `pm-meeting-loop` 開第一場 kickoff 會議，把 WBS 的里程碑與待決事項變成會議 agenda。之後每次會議都回來更新這份 WBS 的狀態。
