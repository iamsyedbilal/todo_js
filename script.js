document.addEventListener("DOMContentLoaded", function () {
  // ✅Select All The Targeted Elements
  const todoInput = document.querySelector("#todo-input");
  const todoBtn = document.querySelector("#add-todo");
  const todoList = document.querySelector("#tasks");

  // ✅Array to store the todo
  let storedTodo = JSON.parse(localStorage.getItem("todo")) || [];

  // ✅Render todo on page load
  renderTodos();

  // ✅Adding Click event on button
  todoBtn.addEventListener("click", function () {
    let todo = todoInput.value.trim();
    if (!todo) return;

    const todoObj = {
      text: todo,
      completed: false,
      _id: Date.now(),
    };

    storedTodo.push(todoObj);
    todoInput.value = "";
    addTodoInTheLocalStorage();
    renderTodos();
  });

  // ✅Function to add the todo in Local Storage
  function addTodoInTheLocalStorage() {
    return localStorage.setItem("todo", JSON.stringify(storedTodo));
  }

  // ✅Function to render all the todos
  function renderTodos() {
    todoList.innerHTML = "";
    if (storedTodo.length === 0) {
      const h1 = document.createElement("h1");
      h1.textContent = "No Todo available till now";
      todoList.appendChild(h1);
      return;
    }
    storedTodo.forEach((element) => {
      const li = document.createElement("li");
      li.setAttribute("data-id", element._id);
      li.innerHTML = `
    <span class="todo-text">${element.text}</span>
    <button class="delete-button">Delete</button>
    `;
      todoList.appendChild(li);
    });
  }

  // ✅Delete the Todo
  todoList.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    if (!li) return;
    const id = li.dataset.id;
    if (e.target.classList.contains("delete-button")) {
      storedTodo = storedTodo.filter((item) => item._id !== Number(id));
      li.remove();
      addTodoInTheLocalStorage();
      return;
    }

    if (e.target.classList.contains("todo-text")) {
      const updatedTodo = storedTodo.find((item) => item._id === Number(id));
      updatedTodo.completed = !updatedTodo.completed;
      li.classList.toggle("completed", updatedTodo.completed);
      addTodoInTheLocalStorage();
      return;
    }
  });

  // ✅Update Todo
  todoList.addEventListener("dblclick", function (e) {
    const li = e.target.closest("li");
    if (!li) return;
    const id = li.dataset.id;
    if (e.target.classList.contains("todo-text")) {
      const updatedTodo = storedTodo.find((item) => item._id === Number(id));
      if (updatedTodo) {
        let todo = prompt("Update the Todo:", updatedTodo.text);
        if (todo !== null && todo.trim() !== "") {
          console.log(todo);
          todo = todo.trim();
          li.querySelector(".todo-text").textContent = todo;
          addTodoInTheLocalStorage();
          return;
        }
      }
    }
  });
});
