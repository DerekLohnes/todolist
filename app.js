"use strict";
class HTMLHelper {
    static createList(task) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        checkbox.id = task.getId();
        checkbox.type = 'checkbox';
        label.textContent = task.getId();
        li.appendChild(checkbox);
        li.appendChild(label);
        checkbox.addEventListener('click', () => {
            if (checkbox.checked) {
                task.setCompleted();
                displayLists();
            }
        });
        return li;
    }
}
class Task {
    constructor(id) {
        this.id = id;
        this.completed = false;
    }
    setCompleted() {
        this.completed = true;
    }
    isComplete() {
        return this.completed;
    }
    getId() {
        return this.id;
    }
}
class TaskManager {
    constructor() {
        this.tasks = [];
    }
    addTask(id) {
        let t = new Task(id);
        this.tasks.push(t);
    }
    completeTask(id) {
        let ret = this.tasks.filter(task => task.isComplete() == false);
        let found = ret.find(task => task.getId() === id);
        if (found == null) {
            console.error("Failed to find task");
        }
        else {
            console.log("Completing Task " + id);
            found.setCompleted();
        }
    }
    getUncompleted() {
        let ret = this.tasks.filter(task => task.isComplete() == false);
        return ret;
    }
    getCompleted() {
        let ret = this.tasks.filter(task => task.isComplete() == true);
        return ret;
    }
    getTasks() {
        return this.tasks;
    }
}
let taskManager = new TaskManager();
const button = document.getElementById('add-task');
const inputBox = document.getElementById('new-task');
const completedContainer = document.getElementById('completed-tasks');
const incompletedContainer = document.getElementById('incompleted-tasks');
button.addEventListener('click', () => {
    // Code to execute when the button is pressed
    console.log("button clicked");
    if (inputBox.value.trim() != '') {
        const inputValue = inputBox.value;
        taskManager.addTask(inputBox.value);
        inputBox.value = '';
        displayLists();
    }
});
inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        button.click();
    }
});
function displayLists() {
    completedContainer.innerHTML = '';
    incompletedContainer.innerHTML = '';
    taskManager.getTasks().forEach(task => {
        let li = HTMLHelper.createList(task);
        if (task.isComplete())
            completedContainer.appendChild(li);
        else
            incompletedContainer.appendChild(li);
    });
}
//# sourceMappingURL=app.js.map