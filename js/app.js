// SELECTORS
const inputField = document.querySelector('input');
const submitBtn = document.querySelector('#submitBtn');
const container = document.querySelector('.container');

class PopupContainer {
  constructor(stringMessage) {
    this.localStorage = localStorage;
    this.nodeList = container.childNodes;
    this.stringMessage = stringMessage;
    this.div = document.createElement('div');
    this.paragraph = document.createElement('p');
    this.buttonContainer = document.createElement('div');
    this.doneButton = document.createElement('button');
    this.deleteButton = document.createElement('button');
    this.doneSpan = document.createElement('span');
    this.deleteSpan = document.createElement('span');
  }

  appendToContainer() {
    container.appendChild(this.div);
    this.div.classList.add('popup');
    this.div.dataset.id = `${this.nodeList.length}`;
    this.div.appendChild(this.paragraph);
    this.paragraph.textContent = this.stringMessage;
    this.div.appendChild(this.buttonContainer);
    this.buttonContainer.classList.add('button-container');
    this.buttonContainer.appendChild(this.doneButton);
    this.doneButton.classList.add('button');
    this.doneButton.classList.add('done');
    this.doneButton.appendChild(this.doneSpan);
    this.doneSpan.classList.add('material-symbols-outlined');
    this.doneSpan.textContent = ' done ';
    this.buttonContainer.appendChild(this.deleteButton);
    this.deleteButton.classList.add('button');
    this.deleteButton.classList.add('delete');
    this.deleteButton.appendChild(this.deleteSpan);
    this.deleteSpan.classList.add('material-symbols-outlined');
    this.deleteSpan.textContent = ' delete ';
  }

  addToLocalStorage() {
    this.localStorage.setItem(`${this.nodeList.length}`, this.stringMessage);
  }

  removeFromLocalStorage(itemForRemove) {
    this.localStorage.removeItem(itemForRemove);
  }
}

const popupContainer = new PopupContainer();

// EVENT LISTENERS
submitBtn.addEventListener('click', () => {
  if (inputField.value === '') {
    return;
  } else {
    const popupContainer = new PopupContainer(inputField.value);
    popupContainer.appendToContainer();
    popupContainer.addToLocalStorage();
    inputField.value = '';
  }
  console.log(popupContainer);
});

// strikethrough todo text with doneBtn
container.addEventListener('click', (event) => {
  if (event.target.classList[0] === 'input') {
    return;
  } else if (event.target.firstChild.innerHTML === ' done ') {
    event.target.parentElement.parentElement.firstChild.innerHTML =
      event.target.parentElement.parentElement.firstChild.innerHTML.strike();
  } else if (event.target.innerHTML === ' done ') {
    event.target.parentElement.parentElement.parentElement.firstChild.innerHTML =
      event.target.parentElement.parentElement.parentElement.firstChild.innerHTML.strike();
  } else return;
});

//  remove parent element with deleteBtn
container.addEventListener('click', (event) => {
  if (event.target.classList[0] === 'input') {
    return;
  } else if (event.target.firstChild.innerHTML === ' delete ') {
    popupContainer.removeFromLocalStorage(
      event.target.parentElement.parentElement.dataset.id
    );
    event.target.parentElement.parentElement.remove();
  } else if (event.target.innerHTML === ' delete ') {
    popupContainer.removeFromLocalStorage(
      event.target.parentElement.parentElement.parentElement.dataset.id
    );
    event.target.parentElement.parentElement.parentElement.remove();
  } else return;
});

console.log(popupContainer);
