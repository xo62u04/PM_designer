# 第三方來源與授權

本專案結合了自行開發的內容與外部開源專案的內容，以下逐一列出。

## 1. product-on-purpose/pm-skills（已 vendor 進本專案）

- 來源：https://github.com/product-on-purpose/pm-skills
- 授權：Apache License 2.0（版權：2026 Jonathan，全文見 `skills/vendor/pm-skills/LICENSE`）
- 引入方式：直接複製以下 11 個 skill 目錄下的 `SKILL.md`，內容未經修改（保留原始 frontmatter 與檔案內的授權註記）：
  - `foundation-meeting-agenda`
  - `foundation-meeting-brief`
  - `foundation-meeting-recap`
  - `foundation-meeting-synthesize`
  - `foundation-stakeholder-briefings`
  - `foundation-stakeholder-update`
  - `discover-stakeholder-summary`
  - `foundation-okr-writer`
  - `foundation-prioritized-action-plan`
  - `foundation-build-risk-review`
  - `define-problem-statement`
- 用途：對應本專案的「會議記錄/追蹤」（需求6）與「關係人溝通」（需求3）環節，由本專案新寫的 `pm-meeting-loop`、`pm-project-clarify`、`pm-raci-watchouts` skill 呼叫使用。
- 未引入的部分：該專案其餘 57 個 skill、`agents/`、`commands/`、`_workflows/`、`docs/` 網站等，因與本專案六大需求無直接關聯，故未 vendor。若日後需要（例如 `develop-adr`、`deliver-prd`），可用同樣方式個別加入。

## 2. sdi2200262/agentic-project-management（僅供架構概念參考，未引入程式碼）

- 來源：https://github.com/sdi2200262/agentic-project-management
- 授權：MPL-2.0（v0.4.0 起）
- 引入方式：**沒有複製任何檔案或程式碼**。本專案只借用其「Planner → Manager → Worker、專案狀態外部化成結構化 artifact、可交接」的架構概念，套用在 `ARCHITECTURE.md` 所描述的 `pm-workspace/` 檔案慣例上。因為沒有使用其原始碼，不受 MPL-2.0 的檔案層級 copyleft 義務約束；此處列出僅為誠實揭露靈感來源。

## 3. 本專案新增內容

以下為本專案原創撰寫，市面調研後確認沒有對應的開源或 SaaS 產品可直接沿用：

- `skills/pm-onboarding/SKILL.md`
- `skills/pm-project-clarify/SKILL.md`
- `skills/pm-raci-watchouts/SKILL.md`
- `skills/pm-wbs-kickoff/SKILL.md`
- `skills/pm-meeting-loop/SKILL.md`（編排邏輯為原創，但流程中會呼叫上述第 1 項的 vendor skill）
