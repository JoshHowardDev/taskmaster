import deleteIcon from './images/icons/delete-icon-X.svg';
import editIcon from './images/icons/editIcon.svg';
import downArrow from './images/icons/downArrow.svg';
import { createEl } from './utilities.js';
import {formatRelative, parseISO, compareAsc} from 'date-fns';
import { getTaskList, updateTask } from './taskLogic.js';
import { openAddTaskForm } from './addTaskForm.js';
import { populateTaskList } from './taskLogic.js';
import { generateProjectsDiv as generateSidebarProjectsDiv } from './sidebar.js';
import { generateTaskFormProjectSelectionDiv } from './projects.js'

export function publishTaskList(taskList) {

    const taskListTitleRow = ['', 'Task', 'Project', 'Date', ''];

    const taskListContainer = document.querySelector('.taskListContainer')
    taskListContainer.classList.remove('emptyTaskList');

    //Create a new, empty taskListDiv
    let taskListDiv = createEl.div('taskListDiv');
    if (document.querySelector('.taskListDiv')) {
        taskListDiv = document.querySelector('.taskListDiv');
    }
    taskListDiv.innerHTML = ''

    //If the taskList is not empty
    if (Object.values(taskList).length) {

      //Populate and append Title Row
      const taskListTitleRowDiv = createEl.div('taskListTitleRowDiv');
      taskListTitleRow.forEach(element => {    
          const columnTitle = createEl.div(`taskListColumnTitle-${element}`, element);
          taskListTitleRowDiv.appendChild(columnTitle);
      });
      taskListDiv.appendChild(taskListTitleRowDiv);

      //Populate and append task rows
      Object.values(taskList).forEach(task => {

          const taskDiv = createEl.div('taskDiv');        
              if (dateFuncs.pastDueBool(task.date)) taskDiv.classList.add('pastDue');
              taskDiv.setAttribute('data-taskId', task.id);
              
              const detailsDiv = createEl.div('taskDetailsDiv');
                detailsDiv.appendChild(createEl.div('taskTitleDiv', task.title));
                const downArrowIMG = new Image();
                  downArrowIMG.classList.add('downArrowIcon')
                  downArrowIMG.src = downArrow;
                  downArrowIMG.alt = 'Down Arrow';
                  downArrowIMG.addEventListener('click', toggleTaskExtended.bind(this, task.id));
                const expandCollapseDiv = createEl.div('expandCollapseDiv');
                  expandCollapseDiv.appendChild(downArrowIMG);
                  taskDiv.appendChild(expandCollapseDiv);
                if (task.description) {
                  detailsDiv.appendChild(createEl.div('taskDescriptionDiv', task.description));
                } else {
                  detailsDiv.appendChild(createEl.div('taskDescriptionDiv', 'No Description'));
                }
              taskDiv.appendChild(detailsDiv);
              
              taskDiv.appendChild(createEl.div('taskProjectDiv', task.project));
              taskDiv.appendChild(createEl.div('taskDateDiv', dateFuncs.getRelativeDateString(task.date)));
              taskDiv.appendChild(taskButtons.createTaskButtonDiv(task.id))
          taskListDiv.appendChild(taskDiv);
      });

    //If the taskList is empty
    } else {
      taskListContainer.classList.add('emptyTaskList');
      taskListDiv.appendChild(createEl.div('emptyClassNoticeDiv', 'No tasks to show at this time.'));
    }

    taskListContainer.appendChild(taskListDiv);
}

const dateFuncs = (() => {

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    //Return true if date given is before now
    const pastDueBool = (date) => {
        const parsedDate = parseISO(date)
        return compareAsc(parsedDate, today) < 0
    }

    //Convert date string to relative string (per date-fns) with time removed, in title case
    const getRelativeDateString = (date) => {
        const parsedDate = parseISO(date)
        let relativeDate = formatRelative(parsedDate, today);
        relativeDate = relativeDate.replace('at 12:00 AM', '').trim();
        let relativeDateProper = '';
        relativeDate.toLowerCase().split(' ').forEach(word => {
            relativeDateProper += word[0].toUpperCase() + word.substring(1) + ' ';
        });
        return relativeDateProper.trim();
    };

    return {pastDueBool, getRelativeDateString};

})();

const taskButtons = (() => {
    const deleteButton = (taskId) => {
        const deleteIconIMG = new Image();
            deleteIconIMG.src = deleteIcon;
            deleteIconIMG.alt = 'Delete'
        const deleteButtonDiv = createEl.div('deleteButton')
            deleteButtonDiv.appendChild(deleteIconIMG)
            deleteButtonDiv.addEventListener('click', deleteAttempt.bind(this, taskId))
        return deleteButtonDiv;
    }
    const editButton = (taskId) => {
        const editIconIMG = new Image();
            editIconIMG.src = editIcon;
            editIconIMG.alt = 'edit'
        const editButtonDiv = createEl.div('editButton')
            editButtonDiv.appendChild(editIconIMG)
            editButtonDiv.addEventListener('click', editAttempt.bind(this, taskId));
        return editButtonDiv;
    }

    const createTaskButtonDiv = (taskId) => {
        const taskButtonsDiv = createEl.div('taskButtonsDiv');
            taskButtonsDiv.appendChild(editButton(taskId));    
            taskButtonsDiv.appendChild(deleteButton(taskId));
        return taskButtonsDiv;
    }

    return {createTaskButtonDiv};
})();

function deleteAttempt(taskId) {
    //TODO Make a better looking popup than confirm
    if (confirm('Are you sure you want to delete this task?')) {
        updateTask.deleteTask(taskId);
    };
}

function editAttempt(taskId) {
    sessionStorage.setItem('currentTaskID', taskId);
    openAddTaskForm();
    const task = getTaskList()[taskId]
    document.querySelector('#taskTitleInput').value = task.title;
    document.querySelector('#taskDateInput').value = task.date;
    document.querySelector('#taskProjectInput').value = task.project;
    document.querySelector('#taskPriorityInput').value = task.priority;
    document.querySelector('#taskDescriptionInput').value = task.description;
}

function toggleTaskExtended(taskId) {
  const task = document.querySelector(`[data-taskid="${taskId}"]`);
  if (task.classList.contains('taskDivExtended')) {
    task.classList.remove('taskDivExtended');
  } else {
    task.classList.add('taskDivExtended');
  };
}

export function regenerateProjectListsOnDOM() {
  //If sidebar is extended, close and re-open it (to re-generate projects list)
  const sidebarExtended = document.querySelector('.sidebarExtended');
  if (sidebarExtended) {
    const newSidebarProjectSelectionDiv = generateSidebarProjectsDiv();
    const oldSidebarProjectSelectionDiv = document.querySelector('.sidebarProjectsDiv');
    sidebarExtended.replaceChild(newSidebarProjectSelectionDiv, oldSidebarProjectSelectionDiv);

    //If there is a project filter applied to the tasklist, remove it.
    if (document.querySelector('.sidebarProjectSelected')) {
      sessionStorage.removeItem('filterTaskListProject');
      populateTaskList();
    }
  }

  //If add task form is open, re-generate project selection div
  const addTaskForm = document.querySelector('.addTaskForm');
  if (addTaskForm) {
    const newProjectSelectionDiv = generateTaskFormProjectSelectionDiv();
    const oldProjectSelectionDiv = document.querySelector('.addTaskFormProjectDiv');
    addTaskForm.replaceChild(newProjectSelectionDiv, oldProjectSelectionDiv);
  }
}