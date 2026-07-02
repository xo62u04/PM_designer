---
name: pm-project-clarify
description: Extracts the project goal, scope, success criteria, and full stakeholder map (decision-making sponsor/boss, consulting advisor with no authority, dev/build team, who the deliverable is owed to) from materials the PM already has — meeting notes, a feature/requirements list, a goal statement — and only asks the PM interview-style questions for what those materials leave unclear. Use at project kickoff, or whenever goals/ownership feel contested or unclear.
metadata:
  classification: pm-designer-core
  version: "1.0.0"
  category: intake
  author: pm-designer
  composes: [define-problem-statement, discover-stakeholder-summary, foundation-stakeholder-briefings]
---
<!-- PM_designer project-original skill -->
# 專案目標與關係人釐清 (pm-project-clarify)

新專案進來時，先把「為什麼做、做給誰看、誰說了算」問清楚，再去規劃 WBS。這個 skill 是本專案 loop 的第一步。

## 什麼時候用

- 一個新專案/新需求剛進來，還沒人系統性問過這些問題
- 專案卡住了，回頭發現「目標」或「誰是關係人」本身就有分歧
- 有既有的 `pm-workspace/00-intake-clarify.md`，需要在範圍變動時重新校對

## 輸入素材優先，不要無謂發問

這個 skill 預設使用者會直接餵素材，而不是從頭做逐題訪談。常見素材三類：

- **會議記錄**（逐字稿、Otter/Fireflies 輸出、手記）
- **專案功能清單**（PRD、需求清單、Jira/Backlog 匯出、規格書）
- **專案目標描述**（老闆的一段話、企劃書、OKR）

流程是「先從素材裡榨出答案，只對榨不出來的部分才問」，不是無條件跑完下面四類問題。

## 執行方式

### 1. 讀取既有內容與素材

若 `pm-workspace/00-intake-clarify.md` 已存在，先讀取。接著讀使用者提供的會議記錄/功能清單/目標描述，逐一對照下面四類問題，把能從素材直接推得或明確寫出的答案先填上，並標註來源（例如「依 2026-06-20 會議記錄」「依功能清單第3節」）。

### 2. 只對素材沒有回答的部分提問

四類問題中，凡是素材已經清楚回答的就不要再問；只把真正缺漏、素材裡模糊或矛盾的部分列成問題丟回給使用者。素材最常見的缺口是 **Who** 這一類（功能清單通常只講要做什麼，不會講清楚誰是決策者、誰只是顧問），要特別注意這塊即使素材看起來完整也大概率需要追問。

**Why（目標與驅動力）**
- 這個專案為什麼現在要做？是誰主動提出的？
- 不做會怎樣？（用來判斷急迫性與真實優先權）
- 成功的定義是什麼？用什麼指標驗收？

**Who（關係人角色，務必分開問，不要合併）**
- **老闆/贊助者（決策者）**：誰有權拍板、砍需求、批預算？可能不只一人，要問清楚意見不一致時聽誰的
- **顧問（Consultant）**：誰提供專業意見但沒有決策權？他們的意見是「建議」還是「必須採納」？
- **開發/執行團隊**：誰實際做事？他們的產能與既有承諾是什麼？
- **交付對象**：最終產出要交給誰驗收？是老闆本人、外部客戶、還是另一個部門？這個對象的驗收標準跟贊助者的期待是否一致？
- 這些角色是否有人身兼多職（例如老闆同時也是交付對象）？

**What（範圍與邊界）**
- 明確要做的、明確不做的（Out of scope）
- 已知的死線、里程碑
- 相依的其他專案/團隊

**Constraints（限制）**
- 預算、人力、既有技術債、政治敏感點

### 3. 呼叫上游 skill 產出正式文件

- 用 `define-problem-statement`（`skills/vendor/pm-skills/define-problem-statement/SKILL.md`）把 Why/What 整理成正式的問題陳述文件
- 用 `discover-stakeholder-summary`（`skills/vendor/pm-skills/discover-stakeholder-summary/SKILL.md`）把 Who 整理成關係人清單（需求、關切點、影響力）
- 若同一份內容需要對不同關係人分別包裝（例如給老闆看 vs 給開發看），用 `foundation-stakeholder-briefings`（`skills/vendor/pm-skills/foundation-stakeholder-briefings/SKILL.md`）

### 4. 寫回工作區

輸出寫入（或提示使用者存入）`pm-workspace/00-intake-clarify.md`，至少包含：
- 問題陳述（目標/成功指標/範圍）
- 關係人角色表：姓名/角色（老闆｜顧問｜開發｜交付對象）/決策權限/關切點
- 待確認清單（沒問清楚、需要後續追問的項目，不要留空白假裝已確認）

## 下一步

關係人角色定了之後，跑 `pm-raci-watchouts` 把責任分工做成 RACI，並產出各角色的注意事項清單。
