import './styles.css';

const tasks = [
  {
    description: 'Buy groceries',
    completed: false,
    index: 0,
  },
  {
    description: 'clean the house',
    completed: false,
    index: 1,
  },
  {
    description: 'working on To Do list',
    completed: false,
    index: 2,
  },
];

const listContainer = document.getElementById('list-container');
const ShowList = () => {
  listContainer.innerHTML = '';
  for (let i = 0; i < tasks.length; i += 1) {
    const listItem = document.createElement('li');
    const checkIcon = document.createElement('input');
    const span = document.createElement('span');
    const dotsIcon = document.createElement('img');

    listItem.id = `task${tasks[i].index}`;
    checkIcon.type = 'checkbox';
    checkIcon.checked = tasks[i].completed;
    span.innerHTML = tasks[i].description;
    dotsIcon.src = 'dots.png';
    dotsIcon.style.width = '20px';
    listItem.appendChild(checkIcon);
    listItem.appendChild(span);
    listItem.appendChild(dotsIcon);
    listContainer.appendChild(listItem);
  }
};
ShowList();