const taskList = document.getElementById("task-list");
const dateInput = document.getElementById("date-input");
const todoInput = document.getElementById("todo-input");

const tasksByDate = {};

// Load tasks from localStorage when page loads
window.addEventListener("load", () => {
  const savedTasks = localStorage.getItem("tasksByDate");
  if (savedTasks) {
    Object.assign(tasksByDate, JSON.parse(savedTasks));
    displayTasks();
  }
});

document.getElementById("todo-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const date = dateInput.value;
  const task = todoInput.value.trim();

  if (!date || !task) return;

  if (!tasksByDate[date]) tasksByDate[date] = [];
  tasksByDate[date].push({ text: task, completed: false });

  todoInput.value = "";
  displayTasks();
  saveTasks();
});

function displayTasks() {
  taskList.innerHTML = "";

  for (const date in tasksByDate) {
    const dateBlock = document.createElement("li");
    dateBlock.innerHTML = `<strong>${date}</strong>`;
    const ul = document.createElement("ul");

    tasksByDate[date].forEach((taskObj, index) => {
      const li = document.createElement("ul");

      // Checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = taskObj.completed;

      checkbox.addEventListener("change", () => {
        taskObj.completed = checkbox.checked;
        li.style.textDecoration = checkbox.checked ? "line-through" : "none";
        saveTasks();
      });

      if (taskObj.completed) {
        li.style.textDecoration = "line-through";
      }

      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(" " + taskObj.text));

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.style.marginLeft = "10px";
      delBtn.addEventListener("click", () => {
        tasksByDate[date].splice(index, 1);
        displayTasks();
        saveTasks();
      });

      li.appendChild(delBtn);
      ul.appendChild(li);
    });

    dateBlock.appendChild(ul);
    taskList.appendChild(dateBlock);
  }
}

// Function to save tasks to localstorage
function saveTasks() {
  localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
}
