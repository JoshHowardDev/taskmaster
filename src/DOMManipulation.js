import createEl from './utilities.js';
import {formatRelative, parseISO, compareAsc} from 'date-fns';

export function publishTaskList(taskList) {

    const taskListTitleRow = ['Date', 'Title', 'Project'];

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

    Object.values(taskList).forEach(task => {
        const taskDiv = createEl.div('taskDiv');

        const parsedDate = parseISO(task.date)
        const today = new Date();
        if (compareAsc(parsedDate, today) < 0) taskDiv.classList.add('pastDue');

        taskDiv.setAttribute('data-taskId', task.id);

        let date = formatRelative(parsedDate, today);
        date = date.replace('at 12:00 AM', '').trim();
        let relativeDate = '';
        date.toLowerCase().split(' ').forEach(word => {
            relativeDate += word[0].toUpperCase() + word.substring(1);
        });


        taskDiv.appendChild(createEl.div('taskDateDiv', relativeDate));
        taskDiv.appendChild(createEl.div('taskTitleDiv', task.title));
        taskDiv.appendChild(createEl.div('taskProjectDiv', task.project));
        taskListDiv.appendChild(taskDiv);
    });

    document.querySelector('.taskListContainer').appendChild(taskListDiv);
}