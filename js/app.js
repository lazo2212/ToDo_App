// SELECTORS
const container = document.querySelector('.container');
const inputField = document.querySelector('.input');
const submitBtn = document.querySelector('#submit');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// retreves data from local storage and repopulates todo's
if (tasks.length !== 0) {
  tasks.forEach((element) => {
    createTask(element);
  });
}

// EventListener
submitBtn.addEventListener('click', () => {
  const inputValue = inputField.value;

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
  todo.innerHTML = `
    <div id="${id}" class="popup">
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
    </>
  `;

  container.appendChild(todo);
}

container.addEventListener('click', (e) => {
  const newTasksArray = tasks.filter(
    (element) =>
      element.id !== parseInt(e.target.parentNode.parentNode.getAttribute('id'))
  );
  localStorage.setItem('tasks', JSON.stringify(newTasksArray));

  if (e.target.className === 'button delete') {
    e.target.parentNode.parentNode.remove();
  } else if (e.target.parentNode.className === 'button delete') {
    e.target.parentNode.parentNode.parentNode.remove();
  }
});
