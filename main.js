let taskTitle = document.querySelector(".new-todo");

let tasks = getTaskfromStorage();
renderTasks(tasks);

function getTaskfromStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}

function renderTasks(tasks = []) {
  let content =
    '<ul class="todo-list">'
  tasks.forEach((task, index) => {
    content += `<li
         class="${(task.completed && "completed") || "view"}"
         id="task-${index}"
         ondblclick=editTask(this)
         >
    <div class="${(task.completed && "completed") || "view"}">
         <input class="toggle" type="checkbox" ${task.completed && "checked"}
         onclick="toggle(${index})">
         <label>${task.title}</label>
         <button class="destroy" onclick="deleteTask(${index})"></button>
    </div>
    <input class="edit" value="${task.title}">
  </li>`;
  })
  if(tasks.length > 0) {
    document.getElementById("footer").style.display = 'block';
  }else {
    document.getElementById("footer").style.display = 'none';
  }

  content += "</ul>";

  document.querySelector(".main").innerHTML = content;
}

function addTask() {
  if (!taskTitle.value) {
    return false;
  }

  let tasks = getTaskfromStorage();
  tasks.push({ title: taskTitle.value, completed: false });
  taskTitle.value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(tasks);
}

function toggle(id) {
  let tasks = getTaskfromStorage();
  tasks[id].completed = !tasks[id].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
}

function toggleAll() {
  let tasks = getTaskfromStorage();
  tasks.forEach((task) => (task.completed = task.completed));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
}

function deleteTask(id) {
  let tasks = getTaskfromStorage();
  tasks.splice(id, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(getTaskfromStorage());
}

function editTask(task) {
  task.classList.add("editing");
  let taskInputField = task.querySelectorAll(".edit")[0];

  // Focus input field on double click
  taskInputField.focus();

  taskInputField.addEventListener("keypress", (e) => {
    // Get current task index in format task-x
    let currentIndex = task.id.split("-")[1];

    if (e.key === "Enter") {
      if (!taskInputField.value) {
        // Remove task if user input is empty
        deleteTask(currentIndex);
      } else {
        tasks = getTaskfromStorage()
        tasks[currentIndex].title = taskInputField.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      task.classList.remove("editing");

      // Re-render tasks
      renderTasks(tasks);
    }
  });
}

let clearAll = document.querySelector('.clear-completed')
clearAll.addEventListener('click',function(){
  let tasks=getTaskfromStorage()
  tasks.splice(0,tasks.length)
  localStorage.setItem('tasks',JSON.stringify(tasks))
  renderTasks(getTaskfromStorage())
})

let selected=document.querySelector('.selected')
let active=document.querySelector('.active')
let comp=document.querySelector('.comp')

selected.addEventListener('click',function(){
  let tasks=getTaskfromStorage()
  renderTasks(tasks)
})

active.addEventListener('click',function(){
  let tasks=getTaskfromStorage()
  let tasksActive=[]
  for(let i=0;i<tasks.length;i++){
      if(!tasks[i].completed){
      tasksActive.push(tasks[i])
      }
  }
  renderTasks(tasksActive)
})

comp.addEventListener('click',function(){
  let tasks=getTaskfromStorage()
    let tasksComp=[]
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].completed){
            tasksComp.push(tasks[i])
        }
    }
    renderTasks(tasksComp)
})

function completedTask() {
    let tasks=getTaskfromStorage()
    let tasksComp=[]
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].completed){
            tasksComp.push(tasks[i])
        }
    }
    renderTasks(tasksComp)
}
