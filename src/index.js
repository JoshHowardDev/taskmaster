import './css/meyersCSSReset.css';
import './css/style.css';
import './css/taskList.css';
import './css/addTaskForm.css';
import './css/sidebar.css';
import './css/editProjectsForm.css';
import { createEl } from './utilities.js';
import { populateTaskList } from './taskLogic.js'
import { generateTaskFormToggle } from './addTaskForm.js';
import { generateEmptySidebar } from './sidebar.js';

function generateMainContent() {
    const mainContentDiv = createEl.div('mainContent');
        mainContentDiv.appendChild(createEl.div('taskListContainer'));
        mainContentDiv.appendChild(generateTaskFormToggle());
    return mainContentDiv;
};

(function generatePageBody() {

    const bodyElements = [generateEmptySidebar(), generateMainContent()];

    const bodyContainer = createEl.div('bodyContainer');
    bodyElements.forEach(element => {
        bodyContainer.appendChild(element);
    });
    document.querySelector('body').appendChild(bodyContainer);
    
    populateTaskList();

})();