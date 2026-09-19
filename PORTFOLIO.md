# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以純前端技術實作，透過 GitHub Copilot 的 Agent Mode、MCP 與可重複執行的 agentic workflow，逐步完成介面、互動功能與 issue 修正流程。

## 線上展示

https://<你的帳號>.github.io/<你的repo名稱>/

## 功能

- 新增待辦事項，空白內容不會建立項目
- 勾選或取消勾選待辦事項的完成狀態
- 已完成項目會顯示刪除線與淡化樣式
- 刪除單筆待辦事項
- 清除所有已完成的待辦事項，執行前會顯示確認對話框
- 沒有已完成項目時，清除按鈕會停用
- 依「全部」、「未完成」與「已完成」篩選清單
- 篩選結果為空時顯示對應提示，避免誤以為資料遭到刪除
- 即時顯示未完成項目數量
- 支援淺色與深色模式切換
- 未手動選擇主題時，會依照作業系統的深色模式設定初始化
- 記住主題與待辦資料，重新整理後仍可保留
- 支援手機螢幕尺寸

## 技術

- 使用 HTML、CSS 與原生 JavaScript
- 不使用框架、第三方套件或外部 CDN
- 不需要建置工具，可直接在瀏覽器開啟
- 使用 CSS 變數管理介面色彩與深色模式
- 使用瀏覽器 `localStorage` 儲存待辦資料與主題偏好

## 開發方式

這個專案在 GitHub Copilot 實戰工作坊中逐步完成：

- **GitHub Copilot Agent Mode**：以需求描述為起點，協助建立待辦清單的 HTML、CSS 與 JavaScript，並進行跨檔案修改。
- **MCP**：透過 `.vscode/mcp.json` 設定 Microsoft Learn 與 GitHub MCP Server，讓 Copilot 能查詢 Microsoft 官方文件並讀取 GitHub issue。
- **Agentic workflow**：以 `.github/copilot-instructions.md` 定義專案規範，並以 `.github/prompts/fix-issue.prompt.md` 定義從讀取 issue、提出計畫、建立分支、修改、驗證到建立 Pull Request 的流程。

## 我學到什麼

1. Agent Mode 會根據目標探索檔案、修改程式並執行工作，因此需求描述與驗證條件需要寫得清楚。
2. MCP 能把本機專案以外的文件與 GitHub issue 納入 Copilot 的工作上下文。
3. 透過分支、commit 與 Pull Request，可以讓 AI 協作的修改保留清楚的變更紀錄。
4. 將專案規範與常見任務寫成可重複使用的 Markdown prompt，有助於維持一致的工作流程。
5. 使用 `localStorage` 與瀏覽器原生 API，可以在不引入框架與套件的情況下完成基本的資料持久化與互動功能。
