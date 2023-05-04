import './styles.css';
import { ShowElement, HideElement } from './javascript.js';

let tasks = [];

const enterIcon = document.getElementById('enter-icon');
const addField = document.getElementById('add-field');
const cleanBtn = document.getElementById('clean-btn');
const listContainer = document.getElementById('list-container');
let ShowList;

if (localStorage.getItem('to_do_list') !== null) {
  tasks = JSON.parse(localStorage.getItem('to_do_list'));
}

const UpdateStorage = () => localStorage.setItem('to_do_list', JSON.stringify(tasks));

const UpdateIndex = (x) => {
  for (let i = x; i < tasks.length; i += 1) {
    tasks[i].index = i;
  }
  UpdateStorage();
  ShowList();
};

const EditFun = (varX) => {
  const editArrItem = tasks.filter((item) => item.index === varX);
  return editArrItem[0].description;
};

const DelFun = (varX) => {
  tasks = tasks.filter((item) => item.index !== varX);
};

const OkFun = (varX, val) => {
  tasks = tasks.filter((item) => {
    if (item.index === varX) {
      item.description = val;
    }
    return true;
  });
};

const CheckFun = (varI, check) => {
  tasks[varI].completed = check;
};

ShowList = () => {
  listContainer.innerHTML = '';
  for (let i = 0; i < tasks.length; i += 1) {
    const listItem = document.createElement('li');
    const checkIcon = document.createElement('input');
    const span = document.createElement('span');
    const editField = document.createElement('input');

    const x = tasks[i].index;
    checkIcon.type = 'checkbox';
    checkIcon.checked = tasks[i].completed;
    span.innerHTML = tasks[i].description;
    editField.style.flexGrow = 1;

    const delIcon = document.createElement('i');
    delIcon.classList.add('bi', 'bi-trash');
    delIcon.style.fontSize = '2rem';

    const editIcon = document.createElement('i');
    editIcon.classList.add('bi', 'bi-pencil');
    editIcon.style.fontSize = '2rem';

    const okIcon = document.createElement('i');
    okIcon.classList.add('bi', 'bi-check');
    okIcon.style.fontSize = '2rem';

    const xIcon = document.createElement('i');
    xIcon.classList.add('bi', 'bi-x');
    xIcon.style.fontSize = '2rem';

    const dotsIcon = document.createElement('i');
    dotsIcon.classList.add('bi', 'bi-three-dots-vertical');
    dotsIcon.style.fontSize = '1rem';

    listItem.appendChild(checkIcon);
    listItem.appendChild(span);
    listItem.appendChild(editField);
    listItem.appendChild(delIcon);
    listItem.appendChild(editIcon);
    listItem.appendChild(okIcon);
    listItem.appendChild(xIcon);
    listItem.appendChild(dotsIcon);

    HideElement([editField, delIcon, editIcon, okIcon, xIcon]);

    listContainer.appendChild(listItem);

    checkIcon.addEventListener('change', () => {
      CheckFun(i, checkIcon.checked);
      UpdateStorage();
    });
    dotsIcon.addEventListener('click', () => {
      ShowElement([checkIcon, span, delIcon, editIcon, xIcon]);
      HideElement([editField, okIcon, dotsIcon]);
    });

    xIcon.addEventListener('click', () => {
      ShowElement([checkIcon, span, dotsIcon]);
      HideElement([editField, delIcon, editIcon, okIcon, xIcon]);
    });

    editIcon.addEventListener('click', () => {
      editField.value = EditFun(x);
      ShowElement([editField, okIcon, xIcon]);
      HideElement([checkIcon, span, delIcon, editIcon, dotsIcon]);
    });

    delIcon.addEventListener('click', () => {
      listItem.remove();
      DelFun(x);
      UpdateStorage();
      UpdateIndex(x);
    });

    okIcon.addEventListener('click', () => {
      OkFun(x, editField.value);
      UpdateStorage();
      span.innerHTML = editField.value;
      ShowElement([checkIcon, span, dotsIcon]);
      HideElement([editField, delIcon, editIcon, okIcon, xIcon]);
    });
  }
};

ShowList();

enterIcon.addEventListener('click', () => {
  if (tasks.length !== 0) {
    tasks.push({
      description: addField.value,
      completed: false,
      index: tasks[tasks.length - 1].index + 1,
    });
  } else {
    tasks.push({
      description: addField.value,
      completed: false,
      index: 0,
    });
  }
  ShowList();
  UpdateStorage();
  addField.value = '';
  addField.focus();
});

addField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    enterIcon.click();
  }
});

cleanBtn.addEventListener('click', () => {
  tasks = tasks.filter((item) => item.completed === false);
  UpdateStorage();
  UpdateIndex(0);
});
