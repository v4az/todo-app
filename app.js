const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todolistUL = document.getElementById('todo-list');

let allTodos = getTodo();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if(todoText.length > 0) {
        const todoObject = {
            Text: todoText,
            completed: false,
        }
        allTodos.push(todoObject);
        
        const newTodoIndex = allTodos.length - 1;
        const newTodoItem = createTodoItem(todoObject, newTodoIndex);
        todolistUL.append(newTodoItem);
        
        saveTodo();
        todoInput.value = "";
    }
};


function createTodoItem(todo, todoIndex) {
    const todoLi = document.createElement("li");
    const todotext = todo.Text;
    todoLi.className="todo";
    todoLi.innerHTML=`
            <input type="checkbox" id="todo-${todoIndex}">
            <label for="todo-${todoIndex}" class="checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
            </label>
            <label for="todo-${todoIndex}" class="todo-text">
                ${todotext}
            </label>
            <button class="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>

    `;

    const deletebutton = todoLi.querySelector(".delete-button");
    deletebutton.addEventListener("click", ()=> {
        deleteTodoItem(todoIndex);
    });

    const checkbox = todoLi.querySelector('input');
    checkbox.addEventListener('change', ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodo();
    })
    checkbox.checked = todo.completed;
    return todoLi;
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodo();
    updateTodoList();
}

function updateTodoList() {
    todolistUL.innerHTML="";
    allTodos.forEach((todo, todoIndex)=>{
        const todoItem = createTodoItem(todo, todoIndex);
        todolistUL.append(todoItem);
    })
}

function saveTodo(){
    const todojson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todojson);
}

function getTodo(){
    const todo = localStorage.getItem("todos") || "[]";
    return JSON.parse(todo);
}