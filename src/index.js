import './css/style.css'
import './css/taskList.css'
import './css/addTaskForm.css'
import './css/meyersCSSReset.css'
import { createEl } from './utilities.js';
import { populateTaskList } from './taskLogic.js'
import { generateAddTaskForm, generateTaskFormToggle } from './addTaskForm.js'
import { generateHeader } from './header.js'

function generateSidebar() {
    const sidebar = createEl.div('sidebar');
    sidebar.innerText = 'sidebar';
    return sidebar;
}

function generateMainContent() {
    const mainContentDiv = createEl.div('mainContent');
        mainContentDiv.appendChild(createEl.div('taskListContainer'));
        mainContentDiv.appendChild(generateTaskFormToggle());
    return mainContentDiv;
};

(function generatePageBody() {

    const bodyElements = [generateHeader(), generateSidebar(), generateMainContent()];

    const bodyContainer = createEl.div('bodyContainer');
    bodyElements.forEach(element => {
        bodyContainer.appendChild(element);
    });
    document.querySelector('body').appendChild(bodyContainer);
    
    populateTaskList();

})();