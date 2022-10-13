import './css/style.css'
import './css/meyersCSSReset.css'
import createEl from './utilities.js';
import { addTask, populateTaskList } from './taskLogic.js'
import { publishTaskList } from './DOMManipulation';

function generateHeader() {
    const header = createEl.div('header');
    header.innerText = 'header';
    return header
}

function generateSidebar() {
    const sidebar = createEl.div('sidebar');
    sidebar.innerText = 'sidebar';
    return sidebar;
}

function generateMainContent() {
    const mainContentDiv = createEl.div('mainContent');
    mainContentDiv.appendChild(generateAddTaskForm());
    mainContentDiv.appendChild(createEl.div('taskListContainer'));

    return mainContentDiv;
}

function generateAddTaskForm() {

    //Need to change date and priority to more accurate input types
    const titleBox = createEl.input('formInput', 'text', 'taskTitleInput', 'Title');
    const dateBox = createEl.input('formInput', 'text', 'taskDateInput', 'Date');
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
    return addTaskForm;
}

function submitAddTaskRequest() {

    //Need to check input validation
    //Need to find a way to add more projects
    const title = document.querySelector('#taskTitleInput').value;
    const date = document.querySelector('#taskDateInput').value;
    const description = document.querySelector('#taskDescriptionInput').value;
    const priority = document.querySelector('#taskPriorityInput').value;
    const project = document.querySelector('#taskProjectInput').value;

    addTask(date, title, description, priority, project);

}

(function generatePageBody() {

    const bodyElements = [generateHeader(), generateSidebar(), generateMainContent()];

    const bodyContainer = createEl.div('bodyContainer');
    bodyElements.forEach(element => {
        bodyContainer.appendChild(element);
    });
    document.querySelector('body').appendChild(bodyContainer);
    
    populateTaskList();

})();