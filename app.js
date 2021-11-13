const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.todo-filter');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deletecheck);
filterOption.addEventListener('click',filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

function createTodo(todo)
{
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo)

    saveTodos(todo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-btn')
    todoDiv.appendChild(deleteButton)

    todoList.appendChild(todoDiv)
}

function recreateTodo(todo)
{
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo)

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-btn')
    todoDiv.appendChild(deleteButton)

    todoList.appendChild(todoDiv)
}

function addTodo(event) {
    
    if(todoInput.value!='')
    {
        event.preventDefault();
        createTodo(todoInput.value);

    todoInput.value = '';
    }
    else {
        event.preventDefault();
    }
}

function deletecheck(e){
   
    item = e.target;
    if(item.classList[0] === 'delete-btn')
    {
        const todo = item.parentElement;
        todo.classList.add('toBeDeleted');
        text = todo.innerText;
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
        deleteTodos(text);
        console.log(text);
    }

    if(item.classList[0] === 'complete-btn')
    {
        
        const todo = item.parentElement;
        console.log(todo.innerText)
        todo.classList.toggle('completed');
    }
    e.preventDefault();

}

function filterTodo(e){

    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        console.log(todo);
        if(e.target.value==='completed')
        {
            console.log(todo.classList)
            if(todo.classList.contains('completed'))
            {
                todo.style.display = 'flex';
            }
            else{
                todo.style.display = 'none';
            }
        }
        else if(e.target.value==='all')
        {
            todo.style.display = 'flex';
        }
        else {
            if(todo.classList.contains('completed'))
            {
                todo.style.display = 'none';
            }
            else{
                todo.style.display = 'flex';
            }
        }
    });
}

function saveTodos(todo)
{
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos=[];
    }
    else 
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));

}

function getTodos()
{
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos=[];
    }
    else 
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    } 
    todos.forEach(function(todo)
    {
        recreateTodo(todo);
    });
}

function deleteTodos(todo)
{
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos=[];
    }
    else 
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    } 
    todos.splice(todos.indexOf(todo),1)
    localStorage.setItem('todos',JSON.stringify(todos));
}