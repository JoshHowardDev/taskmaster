import addProjectSVG from './images/icons/plusIcon.svg';
import deleteIcon from './images/icons/delete-icon.svg';
import { createEl } from './utilities.js';
import { getTaskList, populateTaskList } from './taskLogic.js'
import { regenerateProjectListsOnDOM } from './DOMManipulation.js'

//Projects list is an array of strings
export function getProjectsList() {
    if (localStorage.getItem('projectsList')) {
        return JSON.parse(localStorage.getItem('projectsList'));
    } else {
        return ['General', 'Work'];
    }
}

export const generateTaskFormProjectSelectionDiv = () => {

    const projectList = getProjectsList();
    
    //Create project select drop down
    const projectSelect = document.createElement('select');
        projectSelect.className = 'addTaskFormProjectSelect';
        projectSelect.id = 'taskProjectInput';
        projectSelect.name = 'taskProjectInput';

        projectList.forEach(project => {
            const option = document.createElement('option')
                option.value = project;
                option.innerText = project;
            projectSelect.appendChild(option);
        });
    
    //Create label for drop down
    const projectSelectLabel = document.createElement('label')
        projectSelectLabel.classList.add('inputLabel');
        projectSelectLabel.for = 'taskProjectInput';
        projectSelectLabel.innerText = 'Project';
    
    //Create couple div for selection and label and
    const inputCoupleDiv = document.createElement('div');
        inputCoupleDiv.classList.add('inputCoupleDiv');
        inputCoupleDiv.appendChild(projectSelectLabel);
        inputCoupleDiv.appendChild(projectSelect);

    //Create add project button
    const addProjectIcon = new Image();
        addProjectIcon.src = addProjectSVG;
        addProjectIcon.alt = 'Add Project';
        addProjectIcon.className = 'addProjectIcon';
    const addProjectIconDiv = createEl.div('addProjectIconDiv');
        addProjectIconDiv.appendChild(addProjectIcon);
        addProjectIconDiv.addEventListener('click', openEditProjectForm);

    //Create and return project div container 
    const projectDiv = createEl.div('addTaskFormProjectDiv');
        projectDiv.appendChild(inputCoupleDiv);
        projectDiv.appendChild(addProjectIconDiv);
    return projectDiv;
}

export function openEditProjectForm() {

  //Current Projects Section
  const projectsList = getProjectsList();

  const currentProjectsSpan = document.createElement('span');
    currentProjectsSpan.classList.add('editProjectsFormCurrentProjectsSpan')
    currentProjectsSpan.innerText = 'Current Projects';
  const currentProjectsDiv = createEl.div('editProjectsFormCurrentProjectsDiv');
    currentProjectsDiv.appendChild(currentProjectsSpan);

  projectsList.forEach(projectStr => {
    if (projectStr != 'General') {
      const deleteIconIMG = new Image();
        deleteIconIMG.src = deleteIcon;
        deleteIconIMG.addEventListener('click', deleteProject.bind(this, projectStr));
      const deleteBtnDiv = document.createElement('div');
        deleteBtnDiv.classList.add('editProjectsFormCurrentProjectDeleteBtn');
        deleteBtnDiv.appendChild(deleteIconIMG);
      const project = createEl.div(`editProjectsFormCurrentProject${projectStr}`, projectStr);
      const projectDiv = createEl.div('editProjectsFormCurrentProjectDiv');
        projectDiv.appendChild(deleteBtnDiv);
        projectDiv.appendChild(project)      
      currentProjectsDiv.appendChild(projectDiv);
    }
  });

  //New Project Section
  const newProjectinput = document.createElement('input');
    newProjectinput.type = 'text';
    newProjectinput.id = 'newProjectInput';
  const label = document.createElement('label');
    label.for = 'newProjectInput';
    label.innerText = 'New Project Name';
  const submitButton = document.createElement('button');
    submitButton.classList.add('submitNewProjectBtn');
    submitButton.innerText = 'Submit';
    submitButton.addEventListener('click', addProject);
  const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancelNewProjectBtn');
    cancelButton.addEventListener('click', closeEditProjectForm)
    cancelButton.innerText = 'Cancel';
  const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('newProjectButtonsDiv');
    buttonsDiv.appendChild(submitButton);
    buttonsDiv.appendChild(cancelButton);
  const newProjectDiv = createEl.div('newProjectDiv');
    newProjectDiv.appendChild(label);
    newProjectDiv.appendChild(newProjectinput);
    newProjectDiv.appendChild(buttonsDiv);

  const editProjectDiv = createEl.div('editProjectForm');
    editProjectDiv.appendChild(currentProjectsDiv);
    editProjectDiv.appendChild(newProjectDiv);
  const editProjectBackground = createEl.div('editProjectFormContainer');
    editProjectBackground.appendChild(editProjectDiv);
  document.querySelector('.bodyContainer').appendChild(editProjectBackground)
}

function closeEditProjectForm() {
  document.querySelector('.editProjectFormContainer').remove();
}

function deleteProject(projectStr) {
  if (confirm('Are you sure you want to delete this project? If you continue, all tasks in this project will be changed to the General project.')) {

    const taskList = getTaskList();
    let projectList = getProjectsList();

    //Remove project from project list
    projectList = projectList.filter(project => project != projectStr);
    localStorage.setItem('projectsList', JSON.stringify(projectList));

    //Change the project for all applicable tasks to General
    Object.keys(taskList).forEach(key => {
      if (taskList[key].project === projectStr) taskList[key].project = 'General';
    });
    localStorage.setItem('taskList', JSON.stringify(taskList));

    regenerateProjectListsOnDOM()
    populateTaskList();
    closeEditProjectForm();
    alert(`Project ${projectStr} successfully deleted.`)
  };
}

function addProject() {
  const projectStr = document.querySelector('#newProjectInput').value
  if (projectStr) {
    const projectList = getProjectsList();
    projectList.push(projectStr);
    localStorage.setItem('projectsList', JSON.stringify(projectList));
    regenerateProjectListsOnDOM();
    alert(`Project ${projectStr} successfully added.`);
    closeEditProjectForm();
  } else {
    alert('Input Error');
  }
}

