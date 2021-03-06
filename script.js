var apiUrl = 'https://62996bcd6f8c03a978428c7b.mockapi.io/todos'
let taskTitle = document.querySelector(".new-todo");

function start() {
  getTasks(function (tasks) {
    renderTasks(tasks);
  })

}

start();

function getTasks(callback) {
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(callback)
    .catch(function (err) {
      console.log(err)
    })
}

function renderTasks(tasks = []) {
  let content =
    '<ul class="todo-list">'
  tasks.forEach((task) => {
    content += `<li
           class="${(task.completed && "completed") || "view"}"
           id="${task.id}"
           ondblclick=editTask(${task.id})
           >
      <div class="${(task.completed && "completed") || "view"}">
           <input class="toggle" type="checkbox" ${task.completed && "checked"}
           onclick="toggle(${task.id})">
           <label>${task.title}</label>
           <button class="destroy" onclick="deleteTask(${task.id})"></button>
      </div>
      <input class="edit" value="${task.title}">
    </li>`;
  })
  if (tasks.length > 0) {
    document.getElementById("footer").style.display = 'block';
  } else {
    document.getElementById("footer").style.display = 'none';
  }

  content += "</ul>";

  document.querySelector(".main").innerHTML = content;
}

function addTask(data, callback) {
  var option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  fetch(apiUrl, option)
    .then(function (response) {
      response.json();
    })
    .then(callback);
}

function handleAddTask() {
  if (!taskTitle.value) {
    return false;
  }
  var data = {
    title: taskTitle.value,
    completed: false
  }
  addTask(data, function () {
    getTasks(function (tasks) {
      renderTasks(tasks);
    })
  })
  taskTitle.value = "";
}

function deleteTask(id) {
  var option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },

  };
  fetch(apiUrl + '/' + id, option)
    .then(function (response) {
      response.json();
    })
    .then(function () {
      getTasks(function (tasks) {
        renderTasks(tasks);
      })
    });

}

function editTask(id) {
  var task = document.getElementById(id)

  task.classList.add("editing");
  let taskInputField = task.querySelectorAll(".edit")[0];
  taskInputField.focus();

  taskInputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      if (!taskInputField.value) {

      } else {
        console.log(taskInputField.value);
        var option = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: taskInputField.value
          })
        };
        fetch(apiUrl + '/' + id, option)
          .then(function (response) {
            response.json();
          })
          .then(function (tasks) {
            getTasks(function (tasks) {
              renderTasks(tasks);
            })
          })

        task.classList.remove("editing");
      }
    }
  })

}

function toggle(id) {
  var toggle = document.getElementById(id).classList.toggle('completed')
  
  var option = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      completed: toggle
    })
  };
  fetch(apiUrl + '/' + id, option)
    .then(function (response) {
      response.json();
    })
    .then(function() {
      getTasks(function (tasks) {
        renderTasks(tasks);
      })
    });
}


