import { publishTaskList } from "./DOMManipulation";

class Task {
    constructor(date, title, description, priority, projects) {
        this.date = date;
        this.title = title;
        this.description = description;
        this.priority = priority
        this.complete = false;
        this.projects = projects;
    };
    edit(date, title, description, priority){
        this.date = date;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.projects = projects;
    };
    delete(){
        //TODO
    };
    toggleComplete() {
        this.complete = !this.complete;
    };

};

const taskListTitleRow = ['Date', 'Title'];

const getTaskList = () => {
    let taskList = [];
    if (localStorage.getItem('taskList')) {
        taskList = JSON.parse(localStorage.getItem('taskList'));
    } else {
        taskList = [];
    }
    return taskList
}

const addTask = (date, title, description, priority, projects) => {
    const taskList = getTaskList();
    taskList.push(new Task(date, title, description, priority, projects));
    localStorage.setItem('taskList', JSON.stringify(taskList));
    populateTaskList(taskListTitleRow, taskList);
}

const populateTaskList = () => {
    publishTaskList(taskListTitleRow, getTaskList());
}

export {addTask, populateTaskList};