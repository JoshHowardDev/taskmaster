import { createEl } from './utilities.js';
import { getProjectsList } from './projects.js';
import gridMenuIcon from './images/icons/grid-menu-icon.svg';
import calendarIcon from './images/icons/calendar-date.svg';
import clipboardAlertIcon from './images/icons/clipboard-alert.svg';
import sunClockIcon from './images/icons/sun-clock.svg';
import listIcon from './images/icons/list.svg';
import { populateTaskList } from './taskLogic.js';


export function generateEmptySidebar() {

    let sidebar = document.querySelector('.sidebar')
    if (sidebar === null) {
        sidebar = createEl.div('sidebar');
    } else {
        sidebar.innerHTML = '';
        sidebar.classList.remove('sidebarExtended')
    }
    
    sidebar.appendChild(generateGridMenuDiv());
    return sidebar
}

function generateGridMenuDiv() {
    const icon = new Image();
        icon.classList.add('gridMenuIcon');
        icon.src = gridMenuIcon;
        icon.alt = 'Menu';
    const iconDiv = createEl.div('gridMenuDiv');
        iconDiv.appendChild(icon);
        iconDiv.addEventListener('click', toggleSidebar);
    return iconDiv;       
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar')
    if (sidebar.classList.contains('sidebarExtended')) {
        generateEmptySidebar();
    } else {
        extendSidebar();
    }
}

function extendSidebar() {

  const sidebar = document.querySelector('.sidebar');
      sidebar.appendChild(generateViewOptionsDiv());
      sidebar.appendChild(generateProjectsDiv());
      sidebar.classList.add('sidebarExtended');
}

function generateViewOptionsDiv() {
  const viewOptions = {
    today: ['Today', sunClockIcon, toggleFilterToday],
    important: ['Important', clipboardAlertIcon, toggleFilterImportant],
    future: ['Future', calendarIcon, toggleFilterFuture],
    all: ['View All', listIcon, filterViewAll],
  }

  const recurringTaskSets = ['Daily Tasks', 'Weekend Chores'];

  const viewOptionsDiv = createEl.div('sidebarViewOptionsDiv');
  Object.keys(viewOptions).forEach((key) => {
    const icon = new Image();
        icon.src = viewOptions[key][1];
        icon.alt = viewOptions[key][0];
    const iconDiv = createEl.div('sidebarIconDiv');
        iconDiv.appendChild(icon);
    const linkDiv = createEl.div('sidebarLinkText', viewOptions[key][0]);
    const optionDiv = createEl.div('sidebarViewOption');
        optionDiv.setAttribute('id', `sidebarViewOption${key}`);
        optionDiv.appendChild(iconDiv);
        optionDiv.appendChild(linkDiv);
        optionDiv.addEventListener('click', viewOptions[key][2]);
    viewOptionsDiv.appendChild(optionDiv);
  });
  return viewOptionsDiv;
}

function generateProjectsDiv() {
  const ul = document.createElement('ul');
    ul.classList.add('sidebarProjectsList');

  const projects = getProjectsList();
  projects.forEach(project => {
    const li = document.createElement('li');
      li.classList.add('sidebarProject');
      li.classList.add(`sidebarProject${project}`);
      li.innerText = `${project}`;
      li.addEventListener('click', toggleProjectFilter.bind(this, project));
    ul.appendChild(li);
  });
  
  const labelSpan = document.createElement('span');
   labelSpan.classList.add('sidebarProjectLabelSpan');
   labelSpan.innerText = 'Projects';


  const projectsDiv = createEl.div('sidebarProjectsDiv');
    projectsDiv.appendChild(labelSpan)
    projectsDiv.appendChild(ul)
  return projectsDiv;
}

function toggleProjectFilter(project) {
  const projectLink = document.querySelector(`.sidebarProject${project}`);
  if (projectLink.classList.contains('sidebarProjectSelected')) {
    projectLink.classList.remove('sidebarProjectSelected')
    sessionStorage.removeItem('filterTaskListProject');
  } else {
    //Remove all project selections
    const projectList = getProjectsList();
    projectList.forEach(projectStr => {
      const projectDiv = document.querySelector(`.sidebarProject${projectStr}`)
      projectDiv.classList.remove('sidebarProjectSelected')
    });

    sessionStorage.setItem('filterTaskListProject', project);
    projectLink.classList.add('sidebarProjectSelected')
  };
  populateTaskList();
}

function toggleFilterToday() {

  const todayLink = document.querySelector('#sidebarViewOptiontoday')

  if (todayLink.classList.contains('sidebarOptionSelected')) {
    sessionStorage.removeItem('filterTaskListStartDate');
    sessionStorage.removeItem('filterTaskListEndDate');
    todayLink.classList.remove('sidebarOptionSelected');
  } else {
    let todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayStartStr = JSON.stringify(todayStart);
    let todayEnd = new Date();
      todayEnd.setDate(todayEnd.getDate() + 0.99);
      const todayEndStr = JSON.stringify(todayEnd);
    sessionStorage.setItem('filterTaskListStartDate', todayStartStr);
    sessionStorage.setItem('filterTaskListEndDate', todayEndStr);
    todayLink.classList.add('sidebarOptionSelected')
  };
  populateTaskList();
}

function toggleFilterImportant() {
  const importantLink = document.querySelector('#sidebarViewOptionimportant')
  if (importantLink.classList.contains('sidebarOptionSelected')) {
    sessionStorage.removeItem('filterTaskListMinimumPriority');
    importantLink.classList.remove('sidebarOptionSelected');
  } else {
    sessionStorage.setItem('filterTaskListMinimumPriority', '4');
    importantLink.classList.add('sidebarOptionSelected');
  };
  populateTaskList();
}

function toggleFilterFuture() {

  const futureLink = document.querySelector('#sidebarViewOptionfuture')

  if (futureLink.classList.contains('sidebarOptionSelected')) {
    sessionStorage.removeItem('filterTaskListStartDate');
    futureLink.classList.remove('sidebarOptionSelected');
  } else {
    const today = new Date();
    const todayStr = JSON.stringify(today);
    sessionStorage.setItem('filterTaskListStartDate', todayStr);
    futureLink.classList.add('sidebarOptionSelected')
  };
  populateTaskList();
}

function filterViewAll() {
  const todayLink = document.querySelector('#sidebarViewOptiontoday')
    sessionStorage.removeItem('filterTaskListStartDate');
    sessionStorage.removeItem('filterTaskListEndDate');
    todayLink.classList.remove('sidebarOptionSelected');

  const importantLink = document.querySelector('#sidebarViewOptionimportant')
    sessionStorage.removeItem('filterTaskListMinimumPriority');
    importantLink.classList.remove('sidebarOptionSelected');

  const futureLink = document.querySelector('#sidebarViewOptionfuture')
    futureLink.classList.remove('sidebarOptionSelected');    

  //Remove all project selections
  sessionStorage.removeItem('filterTaskListProject');
  const projectList = getProjectsList();
  projectList.forEach(projectStr => {
    const projectDiv = document.querySelector(`.sidebarProject${projectStr}`)
    projectDiv.classList.remove('sidebarProjectSelected')
  });    

  populateTaskList();
}