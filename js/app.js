// SELECTORS
const container = document.querySelector('.container');
const todoContainer = document.querySelector('.todo-container');
const inputField = document.querySelector('.input');
const submitBtn = document.querySelector('#submit');

// set local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// retreves data from local storage and repopulates todo's
if (tasks.length !== 0) {
  tasks.forEach((element) => {
    createTask(element);
  });
}

// EVENT LISTENERS
// submit button
submitBtn.addEventListener('click', () => {
  const inputValue = inputField.value;
  inputField.value = '';
  if (inputValue === '') {
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: inputValue,
  };

  // add task in local storage
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  createTask(task);
});

// create todo task
function createTask(tasksArray) {
  const id = tasksArray.id;
  const name = tasksArray.name;
  const todo = document.createElement('div');
  todo.setAttribute('id', id);
  todo.classList.add('popup');
  todo.innerHTML = `
      <p>${name}</>
      <div class="button-container">
        <button class="button done">
          <span class="material-symbols-outlined">
          done
          </span>
        </button>
        <button class="button delete">
          <span class="material-symbols-outlined">
          delete
          </span>
        </button>
      </div>
  `;

  todoContainer.appendChild(todo);
}

// remove todo task and remove data from local storage
todoContainer.addEventListener('click', (e) => {
  // if click on button
  if (e.target.className === 'button delete') {
    tasks = tasks.filter(
      (element) =>
        element.id !==
        parseInt(e.target.parentNode.parentNode.getAttribute('id'))
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    e.target.parentNode.parentNode.remove();
  }
  // if click on span
  else if (e.target.parentNode.className === 'button delete') {
    tasks = tasks.filter(
      (element) =>
        element.id !==
        parseInt(e.target.parentNode.parentNode.parentNode.getAttribute('id'))
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    e.target.parentNode.parentNode.parentNode.remove();
  }
});

// strikethrough text of finished todo task
todoContainer.addEventListener('click', (e) => {
  // if click on button
  if (e.target.className === 'button done') {
    strikedParagraph =
      e.target.parentNode.parentNode.firstElementChild.innerHTML =
        e.target.parentNode.parentNode.firstElementChild.innerHTML.strike();
  }
  // if click on span
  else if (e.target.parentNode.className === 'button done') {
    strikedParagraph =
      e.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML =
        e.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML.strike();
  }
});
