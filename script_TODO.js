let todos = [];
const field = document.getElementById("field");
const dateField = document.getElementById("dateField");
const todo_container = document.getElementById("todo_container");
const error_message = document.getElementById("error_message");

window.onload = function () {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    renderTodo();
};

field.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

function addTodo() {
    if (field.value && dateField.value) {
        todos.push({ value: field.value, date: dateField.value });
        localStorage.setItem("todos", JSON.stringify(todos));
        field.value = "";
        dateField.value = "";
        renderTodo();
        error_message.textContent = "";
    }
    else{
        error_message.textContent = "Please enter a todo & date before adding."; 
    }
}

function renderTodo() {
    if (todos.length > 0) {
        todo_container.innerHTML = "";
        todos.forEach((todo, index) => {
            todo_container.innerHTML += `
            <div >
                ${todo.value} | ${todo.date}
                <button class="delete" onclick="deleteTodo(${index})">Delete</button>
            </div>
            `;
        });
    } else {
        todo_container.innerHTML = "No todos";
    }
}

function deleteTodo(index) {
    let res = confirm("Do you want to delete?");
    if (res) {
        todos = todos.filter((_, i) => i !== index);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodo();
    }
}
