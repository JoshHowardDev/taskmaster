import { createEl } from './utilities.js';
import { updateTask, getTaskList } from './taskLogic.js'
import { generateTaskFormProjectSelectionDiv } from './projects.js'
import openAddTaskFormSVG from './images/icons/plusIcon.svg'
import closeAddTaskFormSVG from './images/icons/closeAddTaskForm.svg'

export function generateAddTaskForm() {

    //TODO Need to change date and priority to more accurate input types

    const titleBox = createEl.input('formInput', 'text', 'taskTitleInput', 'Title');
    const dateBox = createEl.input('formInput', 'date', 'taskDateInput', 'Date');
    const projectDiv = generateTaskFormProjectSelectionDiv();
    const priorityBox = createEl.input('formInput', 'text', 'taskPriorityInput', 'Priority');
    const descriptionBox = createEl.input('formInput', 'textarea', 'taskDescriptionInput', 'Description');
    const addTaskButton = createEl.div('addTaskButton', 'Add Task')
        addTaskButton.addEventListener('click', submitTaskRequest)

    const formElements = [titleBox, dateBox, projectDiv, priorityBox, descriptionBox, addTaskButton];

    const addTaskForm = createEl.div('addTaskForm');
    formElements.forEach(element => {
        addTaskForm.appendChild(element);
    });

    const addTaskFormContainer = createEl.div('addTaskFormContainer');
        addTaskFormContainer.appendChild(addTaskForm);

    return addTaskFormContainer;
}


function submitTaskRequest() {

    //TODO Need to check input validation
    //TODO Need to find a way to add more projects

    const taskId = sessionStorage.getItem('currentTaskID');
    sessionStorage.removeItem('currentTaskID');

    const title = document.querySelector('#taskTitleInput').value;
    const date = document.querySelector('#taskDateInput').value;
    const description = document.querySelector('#taskDescriptionInput').value;
    const priority = document.querySelector('#taskPriorityInput').value;
    const project = document.querySelector('#taskProjectInput').value;


  if (taskId) {
    updateTask.editTask(date, title, description, priority, project, taskId);
  } else {
    updateTask.addTask(date, title, description, priority, project);
  }
    closeAddTaskForm();
}

export function generateTaskFormToggle() {
    const openAddTaskFormIMG = new Image();
        openAddTaskFormIMG.className = 'openAddTaskFormIMG';
        openAddTaskFormIMG.src = openAddTaskFormSVG;
        openAddTaskFormIMG.alt = 'Add Task'

    const closeAddTaskFormIMG = new Image();
        closeAddTaskFormIMG.className = 'closeAddTaskFormIMG';
        closeAddTaskFormIMG.src = closeAddTaskFormSVG;
        closeAddTaskFormIMG.alt = 'Close Add Task Form'

    const taskFormToggleDiv = createEl.div('taskFormToggleDiv');
        taskFormToggleDiv.appendChild(openAddTaskFormIMG);
        taskFormToggleDiv.appendChild(closeAddTaskFormIMG);
        taskFormToggleDiv.addEventListener('click', openAddTaskForm);
    
    return taskFormToggleDiv
}

export function openAddTaskForm() {
    document.querySelector('.bodyContainer').appendChild(generateAddTaskForm());
    document.querySelector('.openAddTaskFormIMG').style.display = 'none';
    document.querySelector('.closeAddTaskFormIMG').style.display = 'block';
    document.querySelector('.taskFormToggleDiv').removeEventListener('click', openAddTaskForm);
    document.querySelector('.taskFormToggleDiv').addEventListener('click', closeAddTaskForm);
    document.querySelector('.addTaskForm').classList.add('addTaskFormGrow');
}

function closeAddTaskForm() {
    document.querySelector('.addTaskFormContainer').remove();
    document.querySelector('.openAddTaskFormIMG').style.display = 'block';
    document.querySelector('.closeAddTaskFormIMG').style.display = 'none';
    document.querySelector('.taskFormToggleDiv').removeEventListener('click', closeAddTaskForm);
    document.querySelector('.taskFormToggleDiv').addEventListener('click', openAddTaskForm);
}