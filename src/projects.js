import createEl from './utilities.js';
import addProjectSVG from './images/icons/plusIcon.svg';

const getProjectsList = () => {
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
        addProjectIconDiv.addEventListener('click', openAddProjectForm);

    //Create and return project div container 
    const projectDiv = createEl.div('addTaskFormProjectDiv');
        projectDiv.appendChild(inputCoupleDiv);
        projectDiv.appendChild(addProjectIconDiv);
    return projectDiv;
}

function openAddProjectForm() {
    console.log('Open Add Project Form');
}