
class HTMLHelper {

    static createList(task:Task) {
        const li = document.createElement('li');
        const label = document.createElement('label');
        label.textContent = task.getId();
        if (task.isComplete())
        {
            const button = document.createElement('delete');
            button.classList.add('material-icons'); // Add Material Icons class
            button.textContent = 'delete';

            button.addEventListener('click', () => {
                taskManager.remove(task);
                displayLists();
            });
    
    
            li.appendChild(button);
            li.appendChild(label);
        }
        else
        {
            const checkbox = document.createElement('input');
            checkbox.id = task.getId();
            checkbox.type = 'checkbox';
            checkbox.addEventListener('click', () => {
                if (checkbox.checked) {
                    task.setCompleted();
                    displayLists();
                }
            });
        
            li.appendChild(checkbox);
            li.appendChild(label);
        }
        return li;
    }
}


class Task
{
    private completed:boolean = false;

    constructor(private id:string)
    {

    }

    setCompleted()
    {
        this.completed = true;
    }

    isComplete():boolean
    {
        return this.completed;
    }

    getId():string
    {
        return this.id;
    }
}

class TaskManager
{
    private tasks:Task[] = [];
   

    addTask(id:string)
    {

        let t = new Task(id);
        this.tasks.push(t);

    }

    completeTask(id:string)
    {
        let ret = this.tasks.filter(task => task.isComplete() == false);
        let found = ret.find(task => task.getId() === id);
        if (found == null)
        {
            console.error("Failed to find task");
        }
        else
        {
            console.log("Completing Task " + id)
            found.setCompleted();
        }
    }

    getUncompleted() : Task[]
    {
        let ret = this.tasks.filter(task => task.isComplete() == false)
        return ret;
    }

    getCompleted() : Task[]
    {
        let ret = this.tasks.filter(task => task.isComplete() == true)
        return ret;
    }

    getTasks()
    {
        return this.tasks;
    }

    remove(task:Task)
    {
        this.tasks = this.tasks.filter((task1) => task1 !== task)
    }
}

let taskManager = new TaskManager();

const button = document.getElementById('add-task')!;
const inputBox = document.getElementById('new-task') as HTMLInputElement;
const completedContainer = document.getElementById('completed-tasks')!;
const incompletedContainer = document.getElementById('incompleted-tasks')!;

button.addEventListener('click', () => {
    // Code to execute when the button is pressed

    if (inputBox.value.trim() != '') {
        const inputValue = inputBox.value;
        taskManager.addTask(inputBox.value);

        inputBox.value ='';
        displayLists();
    } 
});


inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        button.click();
    }
});




function displayLists()
{
    completedContainer.innerHTML = '';
    incompletedContainer.innerHTML = '';

    taskManager.getTasks().forEach(task => {
        let li = HTMLHelper.createList(task)
        if (task.isComplete())
            completedContainer.appendChild(li);
        else
            incompletedContainer.appendChild(li);

    })
}

// Recursive function to efficiently calculate the Fibonacci sequence up to a given number
function fibonacciRecursive(n: number): number {
    // Base case: if n is 0 or 1, return n
    if (n <= 1) {
        return n;
    }

    // Recursive calls to calculate Fibonacci numbers
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Test the function with an example input
const result = fibonacciRecursive(11);
console.log(result); // Output: 55

