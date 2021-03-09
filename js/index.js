// event listners:
// 1: add task
// 2: manege task: checkbox, edit, delete 
// 3: update page when load

// the list
const tasksList = new todoList();
const storage = window.localStorage;
// localStorage.setItem("tasksList", JSON.stringify(tasksList.list()));
// localStorage.clear();

// 1: add task

function addTaskToScreen(taskId){
  const taskTxt = tasksList.getItemById(taskId).taskName;
  const section = tasksList.getItemById(taskId).isCompleted? 'done-tasks_ul':'undone-tasks_ul';

  // create item
  const newTask = document.createElement('li');
  newTask.setAttribute('data-id', String(taskId));
  // item checkbox
  const checkBox = document.createElement('input');
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute('data-id', String(taskId));
  checkBox.checked = tasksList.getItemById(taskId).isCompleted;
  // get: dataset.id
  // item text
  const txt = document.createElement('p');
  txt.innerHTML = taskTxt;
  // item edit btn
  const editBtn = document.createElement('button');
  editBtn.innerHTML = 'edit';
  editBtn.setAttribute('data-id', String(taskId));
  editBtn.setAttribute('data-action', 'edit');
  // item delete btn 
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'delete';
  deleteBtn.setAttribute('data-id', String(taskId));
  deleteBtn.setAttribute('data-action', 'delete');
  // put it all together
  newTask.appendChild(checkBox);
  newTask.appendChild(txt);
  newTask.appendChild(editBtn);
  newTask.appendChild(deleteBtn);
  document.querySelector(`.${section}`).appendChild(newTask);
}

function addTaskClick(){
  const taskTxt = document.querySelector('.add-task_input').value;
  console.log(taskTxt);
  const taskId = tasksList.getCurrentId();
  tasksList.addItem(taskTxt);
  localStorage.setItem("tasksList", JSON.stringify(tasksList.list()));
  document.querySelector('.add-task_input').value = '';
  addTaskToScreen(taskId);
}

const addTaskBtn = document.querySelector('.add-task_btn');
addTaskBtn.addEventListener('click', addTaskClick);
const addTaskInput = document.querySelector('.add-task_input');
addTaskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter'){
    addTaskClick();
  }
});


// 2: manege task: checkbox, edit, delete 

function itemCheckBoxClick(checkbox){
  const id = parseInt(checkbox.dataset.id);
  const currentStatus = tasksList.getItemById(id).getStatus();
  tasksList.reclassify(id, !currentStatus);
  localStorage.setItem("tasksList", JSON.stringify(tasksList.list()));
  
  const newSection = !currentStatus? 'done-tasks_ul':'undone-tasks_ul';
  const newLi = checkbox.parentElement.cloneNode(true);
  document.querySelector(`.${newSection}`).appendChild(newLi);
  checkbox.parentElement.remove();
}

function deleteBtnClick(deleteBtn){
  const id = parseInt(deleteBtn.dataset.id);
  tasksList.deleteItem(id);
  localStorage.setItem("tasksList", JSON.stringify(tasksList.list()));
  deleteBtn.parentElement.remove();
}

function editBtnClick(editBtn){
  const id = parseInt(editBtn.dataset.id);
  const currentEl = editBtn.parentElement.childNodes[1];

  if (currentEl.tagName === 'P'){
    tasksList.getItemById(id).setName(currentEl.innerHTML);
    localStorage.setItem("tasksList", JSON.stringify(tasksList.list()));
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.value = currentEl.innerHTML;
    editBtn.parentElement.replaceChild(newInput, currentEl);
  } 
  else if (currentEl.tagName === 'INPUT'){
    tasksList.getItemById(id).setName(currentEl.value);
    localStorage.setItem("tasksList", JSON.stringify(tasksList.list()));
    const newP = document.createElement('p');
    newP.innerHTML = currentEl.value;
    editBtn.parentElement.replaceChild(newP, currentEl);
  }
}

function itemClick(event){
  console.log(event.target.tagName);
  // checkbox
  if (event.target.type === 'checkbox'){
    itemCheckBoxClick(event.target);
  } else if (event.target.tagName === 'BUTTON'){
    // delete btn
    if (event.target.dataset.action === 'delete'){
      deleteBtnClick(event.target);
    // edit btn
    } else if (event.target.dataset.action === 'edit'){
      editBtnClick(event.target);
    }
  }
}
const items = document.querySelector('.items');
items.addEventListener('click', itemClick);

// 3: update page when load
window.onload = function(){
  if (window.localStorage.getItem("tasksList") !== null){
    const tasksToRestore = JSON.parse(window.localStorage.getItem("tasksList"));
    tasksToRestore.forEach(item => {
      const currentId = tasksList.currentId;
      tasksList.addItem(item.taskName, currentId, item.isCompleted);
      addTaskToScreen(currentId);
    });
  }
  storage.setItem("tasksList", JSON.stringify(tasksList.list()));
}