import createEl from './utilities.js';
import { addTask } from './taskLogic.js'
import openAddTaskFormSVG from './images/icons/openAddTaskForm.svg'
import closeAddTaskFormSVG from './images/icons/closeAddTaskForm.svg'

export function generateAddTaskForm() {

    //TODO Need to change date and priority to more accurate input types
    //TODO Need to validate - can't add something with an identical title and project


    const titleBox = createEl.input('formInput', 'text', 'taskTitleInput', 'Title');
    const dateBox = createEl.input('formInput', 'date', 'taskDateInput', 'Date');
    const descriptionBox = createEl.input('formInput', 'text', 'taskDescriptionInput', 'Description');
    const priorityBox = createEl.input('formInput', 'text', 'taskPriorityInput', 'Priority');
    const projectBox = createEl.input('formInput', 'text', 'taskProjectInput', 'Project');

    const addTaskButton = createEl.div('addTaskButton', 'Add Task')
    addTaskButton.addEventListener('click', submitAddTaskRequest)

    const formElements = [titleBox, dateBox, descriptionBox, priorityBox, projectBox, addTaskButton];

    const addTaskForm = createEl.div('addTaskForm');
    formElements.forEach(element => {
        addTaskForm.appendChild(element);
    });

    const addTaskFormContainer = createEl.div('addTaskFormContainer');
        addTaskFormContainer.appendChild(addTaskForm);

    return addTaskFormContainer;
}


function submitAddTaskRequest() {

    //TODO Need to check input validation
    //TODO Need to find a way to add more projects
    const title = document.querySelector('#taskTitleInput').value;
    const date = document.querySelector('#taskDateInput').value;
    const description = document.querySelector('#taskDescriptionInput').value;
    const priority = document.querySelector('#taskPriorityInput').value;
    const project = document.querySelector('#taskProjectInput').value;

    addTask(date, title, description, priority, project);
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

function openAddTaskForm() {
    console.log('opening')
    document.querySelector('.bodyContainer').appendChild(generateAddTaskForm());
    document.querySelector('.openAddTaskFormIMG').style.display = 'none';
    document.querySelector('.closeAddTaskFormIMG').style.display = 'block';
    document.querySelector('.taskFormToggleDiv').removeEventListener('click', openAddTaskForm);
    document.querySelector('.taskFormToggleDiv').addEventListener('click', closeAddTaskForm);
}

function closeAddTaskForm() {
    console.log('closing');
    document.querySelector('.addTaskFormContainer').remove();
    document.querySelector('.openAddTaskFormIMG').style.display = 'block';
    document.querySelector('.closeAddTaskFormIMG').style.display = 'none';
    document.querySelector('.taskFormToggleDiv').removeEventListener('click', closeAddTaskForm);
    document.querySelector('.taskFormToggleDiv').addEventListener('click', openAddTaskForm);
}