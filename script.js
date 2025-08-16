// here show the date and tasks list for that date from the input section

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date-input");
  const todoInput = document.getElementById("todo-input   ");
  const todoForm = document.getElementById("todo-form");
  const selectedDate = document.getElementById("selected-date");
  const taskCount = document.getElementById("task-count");
  const taskContainer = document.createElement("div");
  taskContainer.id = "task-container";
  document.querySelector(".display-section").appendChild(taskContainer);
});

let tasks = {};

dateInput.addEventListener("change", () => {
  const date = dateInput.value;
  selectedDate.textContent = `Date: ${date}`;
  displayTasks(date);
}
);

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = dateInput.value;
  const taskText = todoInput.value.trim();

  if (date && taskText) 
  {
    if (!tasks[date]) 
    {
      tasks[date] = [];
    }
    tasks[date].push(taskText);
    todoInput.value = "";
    displayTasks(date);
  }
});

function displayTasks(date) {
  taskContainer.innerHTML = "";
  if (tasks[date]) 
  {
    tasks[date].forEach((task, index) => {
      const taskItem = document.createElement("div");
      taskItem.textContent = `${index + 1}. ${task}`;
      taskContainer.appendChild(taskItem);
    });
    taskCount.textContent = `Number of tasks: ${tasks[date].length}`;
  }
  else 
  {
    taskCount.textContent = "Number of tasks: 0";
  }
}

