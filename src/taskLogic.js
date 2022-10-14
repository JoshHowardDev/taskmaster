import { publishTaskList } from "./DOMManipulation";
import {parseISO, compareAsc, parse} from 'date-fns';

class Task {
    constructor(id, date, title, description, priority, project) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.description = description;
        this.priority = priority
        this.complete = false;
        this.project = project;
    };
    edit(date, title, description, priority){
        this.date = date;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.project = project;
    };
    delete(){
        //TODO
    };
    toggleComplete() {
        this.complete = !this.complete;
    };

};

const getTaskList = () => {
    if (localStorage.getItem('taskList')) {
        return JSON.parse(localStorage.getItem('taskList'));
    } else {
        return {};
    }
}

function compareDate(a, b) {
    return compareAsc(parseISO(a[1]), parseISO(b[1]));
}

const sortTaskList = (taskList) => {

    const keyAndDateArray = [];
    Object.values(taskList).forEach(obj => {
        keyAndDateArray.push([obj.id, obj.date])
    });

    console.log(keyAndDateArray)

    keyAndDateArray.sort(compareDate);

    const sortedTaskList = {};
    keyAndDateArray.forEach(arr => {
        sortedTaskList[arr[0]] = taskList[arr[0]]
    });

    return sortedTaskList;
};

const addTask = (date, title, description, priority, project) => {

    const dateForID = new Date();
    const taskId = dateForID.getFullYear().toString() + dateForID.getMonth().toString() + dateForID.getDate().toString() + dateForID.getHours().toString() + dateForID.getMinutes().toString() + dateForID.getSeconds().toString();

    let taskList = getTaskList();
    const newTask = new Task(taskId, date, title, description, priority, project);
    taskList[taskId] = newTask;

    taskList = sortTaskList(taskList);

    localStorage.setItem('taskList', JSON.stringify(taskList));
    populateTaskList(taskList);
}

const populateTaskList = () => {
    publishTaskList(getTaskList());
}

export {addTask, populateTaskList};