// 待辦清單應用程式：只使用原生 JavaScript，資料存放在 localStorage
(function () {
  const STORAGE_KEY = "todo-list-items";
  const THEME_STORAGE_KEY = "todo-list-theme";

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const emptyHint = document.getElementById("empty-hint");
  const remainingCount = document.getElementById("remaining-count");
  const clearCompletedButton = document.getElementById("clear-completed");
  const themeToggle = document.getElementById("theme-toggle");
  const filtersContainer = document.getElementById("todo-filters");

  let currentFilter = "all";

  // 從 localStorage 讀取資料，若沒有資料則回傳空陣列
  function loadTodos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  // 將目前的待辦清單存回 localStorage
  function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  let todos = loadTodos();

  // 套用深色/淺色主題，並將選擇存入 localStorage
  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  // 初始化主題：優先使用使用者先前的選擇，否則跟隨系統設定
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      applyTheme(savedTheme);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  themeToggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  clearCompletedButton.addEventListener("click", () => {
    const completedCount = todos.filter((todo) => todo.completed).length;
    if (completedCount === 0) {
      return;
    }

    const confirmed = window.confirm(
      `確定要清除 ${completedCount} 項已完成的待辦事項嗎?`
    );
    if (!confirmed) {
      return;
    }

    todos = todos.filter((todo) => !todo.completed);
    saveTodos(todos);
    render();
  });

  // 依據目前篩選條件過濾出要顯示的待辦事項
  function getFilteredTodos() {
    if (currentFilter === "active") {
      return todos.filter((todo) => !todo.completed);
    }
    if (currentFilter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }

  function getEmptyHint() {
    if (todos.length === 0) {
      return "還沒有任何待辦事項,新增一個吧!";
    }
    if (currentFilter === "active") {
      return "目前沒有未完成的事項。切換到「全部」查看所有待辦事項。";
    }
    if (currentFilter === "completed") {
      return "目前沒有已完成的事項。切換到「全部」查看所有待辦事項。";
    }
    return "目前沒有符合條件的事項。";
  }

  filtersContainer.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");
    if (!btn) {
      return;
    }
    currentFilter = btn.dataset.filter;
    filtersContainer
      .querySelectorAll(".filter-btn")
      .forEach((el) => el.classList.toggle("active", el === btn));
    render();
  });

  // 依據目前的 todos 重新渲染整個清單畫面
  function render() {
    list.replaceChildren();

    const visibleTodos = getFilteredTodos();

    // 清單為空時顯示符合目前篩選條件的提示文字，否則隱藏
    emptyHint.textContent = getEmptyHint();
    emptyHint.style.display = visibleTodos.length === 0 ? "block" : "none";

    visibleTodos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "todo-item" + (todo.completed ? " completed" : "");
      li.dataset.id = todo.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "todo-checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => toggleTodo(todo.id));

      const text = document.createElement("span");
      text.className = "todo-text";
      text.textContent = todo.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "btn-delete";
      deleteBtn.textContent = "刪除";
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

      li.appendChild(checkbox);
      li.appendChild(text);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });

    // 更新未完成項目數量
    const remaining = todos.filter((todo) => !todo.completed).length;
    remainingCount.textContent = `未完成：${remaining} 項`;
    clearCompletedButton.disabled = !todos.some((todo) => todo.completed);
  }

  // 新增一筆待辦事項
  function addTodo(text) {
    todos.push({
      id: Date.now().toString(),
      text: text,
      completed: false,
    });
    saveTodos(todos);
    render();
  }

  // 切換某筆待辦事項的完成狀態
  function toggleTodo(id) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(todos);
    render();
  }

  // 刪除某筆待辦事項
  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos(todos);
    render();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();

    // 輸入空白內容時不新增
    if (!text) {
      return;
    }

    addTodo(text);
    input.value = "";
    input.focus();
  });

  initTheme();
  render();
})();
