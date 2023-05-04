import './styles.css';

const tasks = [];

const enterIcon = document.getElementById('enter-icon');
const addField = document.getElementById('add-field');

enterIcon.addEventListener('click', () => {
if (tasks.length !== 0) {
  tasks.push({
    description: addField.value,
    completed: false,
    index: tasks[tasks.length - 1].index + 1,
  },)
}else{
  tasks.push(  {
    description: addField.value,
    completed: false,
    index: 0,
  },)
}
ShowList();
localStorage.setItem('to_do_list', JSON.stringify(tasks));
})

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
