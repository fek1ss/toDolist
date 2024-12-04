let header = document.querySelector(".header");
const add_button = document.querySelector(".add-task-btn");
const input = document.querySelector(".input-text");
const tasks_container = document.getElementById("tasks");
const inputTime = document.getElementById("task-time"); // Получаем поле времени выполнения


const currentDate = new Date();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');

function currDate() {
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  return `
    <div class="date">${day}-${month}-${year}</div>
    <div class="time">${hours}:${minutes}</div>
  `;
}

function addDate() {
  header.innerHTML = currDate();
}

setInterval(addDate, 1000);

const notes = [];


function getNoteTemplate(obj, index) {
  return `
    <div class="task ${obj.comleted ? "completed" : ""}">
      <div class="checkbox">
        <span class="check" data-index="${index}" data-type="toggle">${obj.comleted ? "&check;" : ""}</span>
      </div>
      <div class="${obj.comleted ? 'text-decoration-line-through' : 'task-text'}">
        ${obj.title}
      </div>
      <div class="deadline">
        <div class="task-time">Created: ${obj.time}</div>
        <div class="task-deadline">Deadline: ${obj.deadline || "Not set"}</div>
      </div>
      
      <div class="buttons">
        <button class="edit btn" data-index="${index}" data-type="edit">edit</button>
        <button class="delete btn" data-index="${index}" data-type="remove">delete</button>
      </div>
    </div>
  `;
}

function render() {
  tasks_container.innerHTML = '';

  for (let i = 0; i < notes.length; i++) {
    tasks_container.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
  }
}
render();


function addButton() {
  if (input.value === '') {
    return;
  }

  const newNote = {
    title: input.value,
    comleted: false,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    deadline: inputTime.value || null
  };

  notes.push(newNote);
  render();
  input.value = '';
  inputTime.value = '';
}

add_button.onclick = function () {
  addButton();
};

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    addButton();
  }
});

tasks_container.onclick = function (event) {
  const type = event.target.dataset.type;
  const index = event.target.dataset.index;
  

  if (type === 'remove') {
    notes.splice(index, 1);
  }

  if (type === 'toggle') {
    notes[index].comleted = !notes[index].comleted;

    const taskElement = event.target.closest(".task");
    if (notes[index].comleted) {
      taskElement.classList.add("completed");
    } else {
      taskElement.classList.remove("completed");
    }
  }

  if (type === 'edit') {
    input.value = notes[index].title;
    notes.splice(index, 1);
  }

  tasks_container.innerHTML = '';
  for (let i = 0; i < notes.length; i++) {
    tasks_container.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
  }  

};