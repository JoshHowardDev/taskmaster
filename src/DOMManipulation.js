import createEl from './utilities.js';

export function publishTaskList(taskListTitleRow, taskList) {
    let taskListDiv = createEl.div('taskListDiv');
    if (document.querySelector('.taskListDiv')) {
        taskListDiv = document.querySelector('.taskListDiv');
    }
    taskListDiv.innerHTML = ''

    const taskListTitleRowDiv = createEl.div('taskListTitleRowDiv');
    taskListTitleRow.forEach(element => {    
        const columnTitle = createEl.div('taskListColumnTitle', element);
        taskListTitleRowDiv.appendChild(columnTitle);
    });
    taskListDiv.appendChild(taskListTitleRowDiv);

    taskList.forEach(task => {
        const taskDiv = createEl.div('taskDiv');
        taskDiv.appendChild(createEl.div('taskDateDiv', task.date));
        taskDiv.appendChild(createEl.div('taskTitleDiv', task.title));
        taskListDiv.appendChild(taskDiv);
    });

    document.querySelector('.taskListContainer').appendChild(taskListDiv);
}