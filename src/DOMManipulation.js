import createEl from './utilities.js';
import {formatRelative, parseISO, compareAsc} from 'date-fns';

export function publishTaskList(taskList) {

    const taskListTitleRow = ['Date', 'Title', 'Project'];

    //Create a new, empty taskListDiv
    let taskListDiv = createEl.div('taskListDiv');
    if (document.querySelector('.taskListDiv')) {
        taskListDiv = document.querySelector('.taskListDiv');
    }
    taskListDiv.innerHTML = ''

    //Populate and append Title Row
    const taskListTitleRowDiv = createEl.div('taskListTitleRowDiv');
    taskListTitleRow.forEach(element => {    
        const columnTitle = createEl.div('taskListColumnTitle', element);
        taskListTitleRowDiv.appendChild(columnTitle);
    });
    taskListDiv.appendChild(taskListTitleRowDiv);

    //Populate and append task rows
    Object.values(taskList).forEach(task => {

        const taskDiv = createEl.div('taskDiv');        
        if (dateFuncs.pastDueBool(task.date)) taskDiv.classList.add('pastDue');

        taskDiv.setAttribute('data-taskId', task.id);
        taskDiv.appendChild(createEl.div('taskDateDiv', dateFuncs.getRelativeDateString(task.date)));
        taskDiv.appendChild(createEl.div('taskTitleDiv', task.title));
        taskDiv.appendChild(createEl.div('taskProjectDiv', task.project));
        taskListDiv.appendChild(taskDiv);
    });

    document.querySelector('.taskListContainer').appendChild(taskListDiv);
}

const dateFuncs = (() => {

    const today = new Date();

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
            relativeDateProper += word[0].toUpperCase() + word.substring(1);
        });
        return relativeDateProper
    };

    return {pastDueBool, getRelativeDateString};

})();