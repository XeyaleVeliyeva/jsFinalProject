
const upDown = document.querySelector(".upDown");
const addBtn = document.querySelector(".addBtn");
const inpText = document.querySelector(".inpText");
const input = inpText.querySelector("input");
const extraTextContainer = document.querySelector(".extraTextContainer");
const extraWrapper = document.querySelector(".extraWrapper");
const clearBtn = document.querySelector(".inpText button");
const add = document.querySelector(".add");

let todos = [];
let isAsc = true;
let isSorted = false;

clearBtn.addEventListener("click", () => {
  if (input.value === "") {
    inpText.style.display = "none";
  } else {
    input.value = "";
  }
});

upDown.addEventListener("click", () => {
  isAsc = !isAsc;
  isSorted = true;
  upDown.src = isAsc ? "./img/down.svg" : "./img/up.svg";
  renderSortedTodos();
});

addBtn.addEventListener("click", () => {
  inpText.style.display = "flex";
});

add.addEventListener("click", () => {
  const value = input.value.trim();
  if (value === "") return;

  todos.push(value);
  input.value = "";
  inpText.style.display = "none";
  isSorted = false;
  renderTodos();
});

function renderTodos() {
  extraTextContainer.innerHTML = "";

  todos.forEach((text) => {
    const todo = createTodoElement(text);
    extraTextContainer.appendChild(todo);
  });

  toggleWrapperDisplay();
}

function renderSortedTodos() {
  const sorted = [...todos];
  sorted.sort((a, b) => isAsc ? a.localeCompare(b) : b.localeCompare(a));

  extraTextContainer.innerHTML = "";

  sorted.forEach((text) => {
    const todo = createTodoElement(text);
    extraTextContainer.appendChild(todo);
  });

  toggleWrapperDisplay();
}

function createTodoElement(text) {
  const todo = document.createElement("div");
  todo.className = "extraText";

  const p = document.createElement("p");
  p.textContent = text;

  const delBtn = document.createElement("button");
  delBtn.innerHTML = '<img src="./img/xbtn.svg" alt="" />';
  delBtn.className = "inpTextBtn";

  delBtn.addEventListener("click", () => {
    todos = todos.filter((t) => t !== text);
    isSorted ? renderSortedTodos() : renderTodos();
  });

  todo.appendChild(p);
  todo.appendChild(delBtn);

  return todo;
}

function toggleWrapperDisplay() {
  if (todos.length === 0) {
    extraWrapper.style.display = "none";
    inpText.style.display = "flex";
  } else {
    extraWrapper.style.display = "block";
  }
}

