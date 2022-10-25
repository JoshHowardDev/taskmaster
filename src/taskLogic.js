import { publishTaskList } from "./DOMManipulation";
import {parseISO, compareAsc} from 'date-fns';

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
    toggleComplete() {
        this.complete = !this.complete;
    };

};

//taskList is an object of Task objects, keys = taskID
export const getTaskList = () => {
    if (localStorage.getItem('taskList')) {
        return JSON.parse(localStorage.getItem('taskList'));
    } else {
        return {};
    }
}

//Returns -1 if a < b, 0 if a=b, or 1 if b > a
function compareDate(a, b) {
    return compareAsc(parseISO(a[1]), parseISO(b[1]));
}


export const updateTask = {

  addTask (date, title, description, priority, project) { 
    const dateForID = new Date();
    const taskId = dateForID.getFullYear().toString() + dateForID.getMonth().toString() + dateForID.getDate().toString() + dateForID.getHours().toString() + dateForID.getMinutes().toString() + dateForID.getSeconds().toString();
    const newTask = new Task(taskId, date, title, description, priority, project);
    const taskList = getTaskList();
    taskList[taskId] = newTask;
    localStorage.setItem('taskList', JSON.stringify(taskList));
    populateTaskList(taskList);
  },

  deleteTask(taskId) {
    const taskList = getTaskList();
    if (Object.keys(taskList).includes(taskId)) {
        delete taskList[taskId];
    } else {
        console.log(`No task with ID ${taskId} within task list.`);
        return;
    }
    localStorage.setItem('taskList', JSON.stringify(taskList));
    populateTaskList(taskList);
  },

  editTask(date, title, description, priority, project, taskId) {
    const taskList = getTaskList();
    const newTask = new Task(taskId, date, title, description, priority, project);
    taskList[taskId] = newTask;
    localStorage.setItem('taskList', JSON.stringify(taskList));
    populateTaskList(taskList);
  }
}

export const populateTaskList = (taskList) => {
    if (!taskList) {
        taskList = getTaskList();
    }
    taskList = filterTaskList(taskList);
    taskList = sortTaskList(taskList);
    publishTaskList(taskList);
}

function filterTaskList(taskList) {

  //Filter by date
  const minDate = new Date(-8640000000000000); //Min date possible in JS
  const maxDate = new Date(8640000000000000); //Max date possible in JS

  let startDate = sessionStorage.getItem('filterTaskListStartDate')
    if (startDate) {
      startDate = new Date(JSON.parse(startDate));
    } else {
      startDate = minDate;
    };

  let endDate = sessionStorage.getItem('filterTaskListEndDate')
    if (endDate) {
      endDate = new Date(JSON.parse(endDate));
    } else {
      endDate = maxDate;
    };

  //Filter by priority
  let minimumPriority = sessionStorage.getItem('filterTaskListMinimumPriority');
    if (minimumPriority) {
      minimumPriority = Number(minimumPriority);
    } else {
      minimumPriority = 0;
    }

    //Apply filters
    Object.keys(taskList).forEach(key => {
      const date = taskList[key].date
      const priority = taskList[key].priority
      if (compareAsc(parseISO(date), startDate) < 0 || 
          compareAsc(parseISO(date), endDate) > 0 ||
          priority < minimumPriority
      ) {
        delete taskList[key]
      }
    });

  return taskList;
}

function sortTaskList(taskList) {
    const keyAndDateArray = [];
    Object.values(taskList).forEach(obj => {
        keyAndDateArray.push([obj.id, obj.date])
    });

    keyAndDateArray.sort(compareDate);

    const sortedTaskList = {};
    keyAndDateArray.forEach(arr => {
        sortedTaskList[arr[0]] = taskList[arr[0]]
    });

    return sortedTaskList;
};