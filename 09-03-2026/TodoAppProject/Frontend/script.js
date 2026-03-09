const api = "http://localhost:5100/api/Todo";

let currentFilter = "all";

async function loadTodos(){

const response = await fetch(api);
const data = await response.json();

const list = document.getElementById("taskList");
list.innerHTML = "";

data.forEach(todo => {

const li = document.createElement("li");

if(todo.isCompleted)
li.classList.add("completed");

const checkbox = document.createElement("input");
checkbox.type="checkbox";
checkbox.checked = todo.isCompleted;

checkbox.onchange = async () => {

await fetch(`${api}/${todo.id}`,{
method:"PUT",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
id:todo.id,
title:todo.title,
isCompleted:checkbox.checked
})
});

loadTodos();

};

const span = document.createElement("span");
span.innerText = todo.title;

const buttons = document.createElement("div");

buttons.innerHTML = `
<button onclick="editTask(${todo.id}, '${todo.title}')">Edit</button>
<button onclick="deleteTask(${todo.id})">Delete</button>
`;

li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(buttons);

list.appendChild(li);

});

filterTasks(currentFilter);

}

async function addTask(){

const title = document.getElementById("taskInput").value;
const priority = document.getElementById("priority").value;

if(title === "") return;

await fetch(api,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title:title + " (" + priority + ")",
isCompleted:false
})
});

document.getElementById("taskInput").value="";

loadTodos();
}

async function deleteTask(id){

await fetch(`${api}/${id}`,{
method:"DELETE"
});

loadTodos();
}

async function editTask(id,title){

const newTitle = prompt("Edit task",title);

if(newTitle === null) return;

await fetch(`${api}/${id}`,{
method:"PUT",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
id:id,
title:newTitle,
isCompleted:false
})
});

loadTodos();
}

function searchTask(){

const search = document.getElementById("searchBox").value.toLowerCase();
const tasks = document.querySelectorAll("#taskList li");

tasks.forEach(task => {

const text = task.innerText.toLowerCase();

if(text.includes(search))
task.style.display="flex";
else
task.style.display="none";

});

}

function filterTasks(type){

currentFilter = type;

const tasks = document.querySelectorAll("#taskList li");

tasks.forEach(task => {

if(type==="all")
task.style.display="flex";

else if(type==="active" && !task.classList.contains("completed"))
task.style.display="flex";

else if(type==="completed" && task.classList.contains("completed"))
task.style.display="flex";

else
task.style.display="none";

});

}

function toggleDarkMode(){
document.body.classList.toggle("dark");
}

loadTodos();