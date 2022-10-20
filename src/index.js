import './css/meyersCSSReset.css';
import './css/style.css';
import './css/taskList.css';
import './css/addTaskForm.css';
import './css/navMenu.css';
import { createEl } from './utilities.js';
import { populateTaskList } from './taskLogic.js'
import { generateTaskFormToggle } from './addTaskForm.js';
import { generateSidebar } from './sidebar.js';

function generateMainContent() {
    const mainContentDiv = createEl.div('mainContent');
        mainContentDiv.appendChild(createEl.div('taskListContainer'));
        mainContentDiv.appendChild(generateTaskFormToggle());
    return mainContentDiv;
};

(function generatePageBody() {

    const bodyElements = [generateSidebar(), generateMainContent()];

    const bodyContainer = createEl.div('bodyContainer');
    bodyElements.forEach(element => {
        bodyContainer.appendChild(element);
    });
    document.querySelector('body').appendChild(bodyContainer);
    
    populateTaskList();

})();