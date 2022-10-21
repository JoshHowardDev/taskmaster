import { createEl } from './utilities.js';
import { getProjectsList } from './projects.js';
import gridMenuIcon from './images/icons/grid-menu-icon.svg';
import calendarIcon from './images/icons/calendar-date.svg';
import clipboardAlertIcon from './images/icons/clipboard-alert.svg';
import sunClockIcon from './images/icons/sun-clock.svg';
import listIcon from './images/icons/list.svg';


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

    const viewOptions = {
        today: ['Today', sunClockIcon],
        important: ['Important', clipboardAlertIcon],
        future: ['Future', calendarIcon],
        all: ['View All', listIcon],
    }

    const projects = getProjectsList();
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
        viewOptionsDiv.appendChild(optionDiv);
    });

    const sidebar = document.querySelector('.sidebar')
        sidebar.appendChild(viewOptionsDiv);
        sidebar.classList.add('sidebarExtended')
}