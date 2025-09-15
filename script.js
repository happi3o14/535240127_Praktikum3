const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");

button.addEventListener("click", addTask);

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const text = input.value.trim();

  if (text === "") {
    errorMsg.textContent = "Please fill the task!";
    return;
  }
  errorMsg.textContent = "";

  createTask(text, false);
  input.value = "";
  saveTask();
}

function createTask(teks, selesai) {
  const li = document.createElement("li");

  const content = document.createElement("div");
  content.classList.add("task-content");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = selesai;
  checkbox.addEventListener("change", function() {
    li.classList.toggle("completed", checkbox.checked);
    saveTask();
  });

  const span = document.createElement("span");
  span.textContent = teks;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", function() {
    li.remove();
    saveTask();
  });

  content.appendChild(checkbox);
  content.appendChild(span);

  li.appendChild(content);
  li.appendChild(delBtn);

  if (selesai) {
    li.classList.add("completed");
  }

  list.appendChild(li);
}

function saveTask() {
  const allTask = [];
  const items = document.querySelectorAll("#taskList li");

  items.forEach(function(li) {
    allTask.push({
      teks: li.querySelector("span").textContent,
      selesai: li.checkbox.checked
    });
  });

  localStorage.setItem("tugasList", JSON.stringify(allTask));
}

function loadTask() {
  const data = localStorage.getItem("tugasList");
  if (data) {
    const all = JSON.parse(data);
    all.forEach(function(item) {
      createTask(item.teks, item.selesai);
    });
  }
}

document.addEventListener("DOMContentLoaded", loadTask);
