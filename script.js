const tasksList = document.querySelector(".tasks");
const input = document.getElementById("input");
const button = document.getElementById("addTodo");
const completedTasks = document.getElementById("completed");
const pending = document.getElementById("pending");
const all = document.getElementById("all");
const clearBtn = document.getElementById("clearAll");
const added = document.getElementById("added");
const removed = document.getElementById("removed");
const completed = [];
let arr = [];

const updateCounts = () => {
    const totalTasksCount = arr.length;
    const completedCount = completed.length;
    const pendingCount = totalTasksCount - completedCount;

    completedTasks.innerText = `Completed ${completedCount}`;
    pending.innerText = `Pending ${pendingCount}`;
    all.innerText = `All ${totalTasksCount}`;
};

const getData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    return data.slice(0, 10);
};

getData().then((data) => {
    data.forEach((item) => {
        addTodoItem(item.title, item.id);
    });
});

function addTodoItem(title, id) {
    if (title !== '') {
        const listItem = document.createElement("li");
        listItem.dataset.id = id;

        // Add fade-in animation class
        listItem.classList.add("item-added-animation");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener('change', () => {
            toggleTodoCompleted(listItem, title);
        });
        const todoText = document.createElement("span");
        todoText.textContent = title;
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
            deleteTodoItem(id);
        });
        listItem.appendChild(checkbox);
        listItem.appendChild(todoText);
        listItem.appendChild(deleteButton);
        listItem.classList.add("task");
        tasksList.appendChild(listItem);

        arr.push({ title, id });
        updateCounts();
    } else {
        alert("Please Enter Something");
    }
}


function toggleTodoCompleted(listItem, title) {
    listItem.classList.toggle("completed");
    if (listItem.classList.contains("completed")) {
        completed.push(title);
    } else {
        const index = completed.indexOf(title);
        if (index !== -1) {
            completed.splice(index, 1);
        }
    }
    updateCounts();
}

button.addEventListener('click', () => {
    const todo = input.value;
    const id = Math.floor(Math.random() * 1000);
    addTodoItem(todo, id);
    added.style.opacity=1;
    setTimeout(() => {
        added.style.opacity=0;
    },1000);
    input.value = '';
});

function deleteTodoItem(id) {
    const listItem = document.querySelector(`.task[data-id="${id}"]`);
    if (listItem) {
        listItem.remove();
        const index = arr.findIndex(item => item.id === id);
        if (index !== -1) {
            arr.splice(index, 1);
            updateCounts();
        }
    }
    removed.style.opacity=1;
    setTimeout(()=>{
        removed.style.opacity=0;
    },1000);
}

clearBtn.addEventListener('click', () => {
    tasksList.innerHTML = '';
    arr = []; 
    completed.length = 0;
    updateCounts();
});
