---
name: pm-raci-watchouts
description: Builds a RACI matrix from the clarified stakeholder map and drafts role-specific "watch out for this" checklists (what sponsors, consultants, developers, and the PM itself commonly get wrong or forget). Use right after pm-project-clarify, or whenever ownership/responsibility on a running project is ambiguous.
metadata:
  classification: pm-designer-core
  version: "1.0.0"
  category: responsibility
  author: pm-designer
  composes: [foundation-build-risk-review]
---
<!-- PM_designer project-original skill -->
# 權責矩陣與注意事項 (pm-raci-watchouts)

把 `pm-project-clarify` 定出的關係人，轉成「誰對什麼負責」的 RACI 矩陣，並且針對每個角色給出「常踩的坑」提醒，而不只是一張空表格。

## 什麼時候用

- 剛跑完 `pm-project-clarify`，關係人角色已經清楚
- 專案中期發現責任歸屬吵不清楚（例如「這個決定到底該誰簽」）

## 執行方式

### 1. 讀取輸入

讀 `pm-workspace/00-intake-clarify.md` 的關係人清單；若已有 `02-wbs.md`，用其中的交付項/決策點當作 RACI 的列；若 WBS 還沒做，先用專案的主要交付物與決策點（從 clarify 文件的範圍段落推）當列。

### 2. 建立 RACI 矩陣

- 列：每個交付物或決策點（例如「需求確認」「預算核准」「驗收簽署」「技術方案選擇」）
- 欄：角色（老闆/贊助者、顧問、PM、開發/執行、交付對象/驗收方，依實際關係人調整）
- 每格填 R（Responsible 執行）/ A（Accountable 唯一負責，每列只能有一個 A）/ C（Consulted 需徵詢）/ I（Informed 需告知）
- 明確標出衝突點：同一列有兩個 A、或沒有任何 A 的情況，都要點出來要求使用者裁定

### 3. 每個角色的風險審視

對於矩陣中「A」和「R」角色，用 `foundation-build-risk-review`（`skills/vendor/pm-skills/foundation-build-risk-review/SKILL.md`）針對其關鍵交付/決策做一次快速風險審視，抓出「這個角色最可能因為什麼假設而搞砸」。

### 4. 產出各角色注意事項清單（本 skill 的核心價值）

不要只給通用 PM 教科書內容，要結合這個專案的關係人清單具體化。至少涵蓋：

**給老闆/贊助者的提醒**
- 是否清楚自己是唯一決策點，還是跟其他贊助者意見可能分歧？
- 是否已經溝通「這個時程/預算下能做到什麼程度」，避免後期期待落差

**給顧問的提醒**
- 意見是否已明確標示為「建議」而非「決議」，避免執行端誤把顧問意見當拍板
- 顧問的建議是否有跟老闆的優先順序衝突，衝突時誰仲裁

**給開發/執行團隊的提醒**
- 是否清楚驗收標準來自誰（贊助者 vs 交付對象可能不同人）
- 範圍變更時，是否有一個明確窗口（通常是 PM）過濾需求，而不是多頭指揮

**給 PM 自己的提醒**
- 是否把「顧問意見」「老闆決策」「開發承諾」三者的落差主動同步給彼此，而不是各自以為對方知道
- 每個 A（Accountable）角色是否真的知道自己是 A，而不是 PM 單方面認定

### 5. 寫回工作區

輸出寫入 `pm-workspace/01-stakeholders-raci.md`：RACI 矩陣 + 衝突點 + 各角色注意事項清單。

## 下一步

RACI 底定後，跑 `pm-wbs-kickoff`，用 RACI 的 R（執行者）作為 WBS 工作包的預設負責人。
