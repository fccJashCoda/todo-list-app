const renderProjects = (controller) => {
    document.getElementById('content').innerHTML = ''

    if (controller.projectList.length > 0) {
        controller.projectList.forEach(project => {
            createProjectTemplate(controller, project)
        })
    }
    
}

const createProjectTemplate = (controller, project) => {
    if (!project) return 'error, no project';

    const content = document.getElementById('content');
    
    // Project wrapper
    const projectItem = document.createElement('div');
    projectItem.classList = 'project'
    
    
    // Project Header
    const projectTitle = document.createElement('h3');
    projectTitle.textContent = `Project: ${project.title}`;
    projectTitle.classList = 'projectTitle'

    projectTitle.onclick = () => {
        if (projectBody.classList.contains('elementHidden')) {
            projectBody.classList = 'projectBody';
        } else {
            projectBody.classList += ' elementHidden'
        }
    }


    // Project Body
    const projectBody = document.createElement('div')
    projectBody.classList = 'projectBody';

    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.description;
    projectDescription.classList = 'projectDescription';

    const projectDueDate = document.createElement('p');
    projectDueDate.textContent = `Due: ${project.dueDate}`;
    projectDueDate.classList = 'projectDueDate';

    const projectAddTask = document.createElement('div');
    projectAddTask.id = 'projectAddTaskBody'

    const taskList = document.createElement('ul');
    taskList.classList = 'taskList'
    console.log('render loglist function')
    
    if (project.todoList && project.todoList.length > 0) {
        //projectBody.innerHTML = ""

        // .sort(priority)
        for (let i = 0; i < project.todoList.length; i++) {
            taskList.appendChild(createTaskTemplate(controller, project, project.todoList[i]));
        }
    }

    // Project buttons
    const openAddTaskBtn = document.createElement('button');
    const deleteProjectBtn = document.createElement('button');

    openAddTaskBtn.textContent = 'Add Task';
    deleteProjectBtn.textContent = 'Delete';

    openAddTaskBtn.id = deleteProjectBtn.id = project.title
    openAddTaskBtn.classList = 'btn btn-primary openAddTaskBtn';
    deleteProjectBtn.classList = 'btn btn-danger deleteProjectBtn';
    
    openAddTaskBtn.addEventListener('click', (e) => {
        openAddTaskBtn.classList += ' elementHidden';
        deleteProjectBtn.classList += ' elementHidden'
        showAddTaskForm(e.target.previousSibling);

        let submitAddNewTask = document.getElementById('submitAddNewTask');
        submitAddNewTask.addEventListener('click', (e) => {
            e.preventDefault()
            let newTaskTitle = document.getElementById('addNewTaskTitle');

            if (newTaskTitle.value != "" && !project.todoAlreadyInProject(newTaskTitle.value)) {
                project.addTodo({ 
                    title: newTaskTitle.value,
                    description: document.getElementById('addNewTaskDescription').value, 
                    dueDate: document.getElementById('addNewTaskDueDate').value, 
                    priority: document.getElementById('addNewTaskPriority').value, 
                    isDone: false })

                renderProjects(controller)
                controller.saveToLocalStorage()
            }
        });

        let cancelAddNewTask = document.getElementById('cancelAddNewTask');
        cancelAddNewTask.addEventListener('click', (e) => {
            e.preventDefault()
            renderProjects(controller)
        });
    });
    
    deleteProjectBtn.addEventListener('click', (e) => {
        let check = confirm(`Delete this project? Project: ${project.title}`)
        if (check) {
            controller.projectList = controller.projectList.filter(item => item.title !== e.target.id)
            renderProjects(controller)
            controller.saveToLocalStorage()
        }
    });

    projectBody.appendChild(projectDueDate)
    projectBody.appendChild(projectDescription);
    projectBody.appendChild(projectAddTask);
    projectBody.appendChild(openAddTaskBtn);
    projectBody.appendChild(deleteProjectBtn);
    projectBody.appendChild(taskList);

    projectItem.appendChild(projectTitle);
    projectItem.appendChild(projectBody);
    content.appendChild(projectItem);
    
}

const createTaskTemplate = (controller, obj, task) => {

    // Task Wrapper
    let taskItem = document.createElement('li');

    // Task Header
    let taskTitle = document.createElement('h4');
    taskTitle.textContent = task.title;
    taskTitle.classList = 'task';

    // Show/hide task information: hidden by default
    taskTitle.onclick = () => {
        if (taskBody.classList.contains('elementHidden')) {
            taskBody.classList = 'taskBody';
        } else {
            taskBody.classList += ' elementHidden';
        }
    }

    // Task Body
    let taskBody = document.createElement('div');
    taskBody.classList = 'taskBody elementHidden';

    let taskDueDate = document.createElement('p');
    taskDueDate.textContent = `Due: ${task.dueDate}`;
    taskDueDate.classList = 'taskDueDate';

    let taskPriority = document.createElement('p');
    taskPriority.textContent = `priority: ${task.priority}`;
    taskPriority.classList = 'taskPriority';
    
    let taskDescription = document.createElement('p');
    taskDescription.textContent = task.description ;
    taskDescription.classList = 'taskDescription'

    // Task buttons
    const completeTaskBtn = document.createElement('button');
    const editTaskBtn = document.createElement('button');
    const deleteTaskBtn = document.createElement('button');

    completeTaskBtn.textContent = 'Complete';
    editTaskBtn.textContent = 'Edit';
    deleteTaskBtn.textContent = 'Delete';

    completeTaskBtn.id = editTaskBtn.id = deleteTaskBtn.id = task.title;

    completeTaskBtn.addEventListener('click', () => {
        if (!task.isDone) {
            task.isDone = true
            taskItem.classList += 'crossed'
            controller.saveToLocalStorage()
        }
    });

    editTaskBtn.addEventListener('click', (e) => {
        if (!task.isDone) {
            showEditTaskForm(taskBody, task)


            let editTaskDueDate = document.getElementById('editTaskDueDate');
            let editTaskDescription = document.getElementById('editTaskDescription');

            let submitEditTask = document.getElementById('submitEditTask')
            submitEditTask.addEventListener('click', (e) => {
                e.preventDefault()
                task.dueDate = editTaskDueDate.value || editTaskDueDate.placeholder;
                task.priority = document.getElementById('editTaskPriority').value;
                task.description = editTaskDescription.value || editTaskDescription.placeholder;
                
                controller.saveToLocalStorage();
                renderProjects(controller);
            })

            let cancelEditTask = document.getElementById('cancelEditTask');
            cancelEditTask.addEventListener('click', (e) => {
                e.preventDefault()
                renderProjects(controller)
            })
        }
    });

    deleteTaskBtn.addEventListener('click', () =>{ 
        obj.removeTodo(task.title)
        
        controller.saveToLocalStorage()
        renderProjects(controller)
    });

    
    completeTaskBtn.classList = 'btn btn-primary completeTaskBtn';
    editTaskBtn.classList = 'btn btn-info editTaskBtn';
    deleteTaskBtn.classList = 'btn btn-danger deleteTaskBtn';

    taskBody.appendChild(taskDueDate);
    taskBody.appendChild(taskPriority);
    taskBody.appendChild(taskDescription);
    taskBody.appendChild(completeTaskBtn);
    taskBody.appendChild(editTaskBtn);
    taskBody.appendChild(deleteTaskBtn);

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskBody);

    // will display a crossed, grayed out task
    if (task.isDone) taskItem.classList += ' crossed';
    return taskItem;
}

//
function createRawProjectTemplate(block, project) {
    block.innerHTML += `
    <div class="project">
        <h3 class="projectTitle">${project.title}</h3>
        <div class="projectBody">
            <p>${project.description}</p>
            <div id="projectAddTaskBody"></div>
            <button id="${project.title}" class="btn btn-primary openAddTaskBtn">Add Task</button>
            <button id="${project.title}" class="btn btn-danger deleteProjectBtn">Delete</button>
            <ul>
            </ul>
        </div>
    </div>
    `
}

function showAddTaskForm (block) {
    block.innerHTML += `
        <form action="">
            <label>Title</label>
            <input type="text" id="addNewTaskTitle" >
            
            <br>
            <label>Due date</label>
            <input type="date" id="addNewTaskDueDate" >

            <br>
            <label>Priority</label>
            <select name="priority" id="addNewTaskPriority">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            <br>
            <label>Project description</label>
            <textarea name="" id="addNewTaskDescription" cols="30" rows="10"></textarea>

            <button id="submitAddNewTask" class="btn">Add new task</button>
            <button id="cancelAddNewTask" class="btn">Cancel</button>
        </form>`
}

function createRawTaskTemplate(block, task) {
    block.innerHTML +=`
        <h4 class="task">${task.title}</h4>
        <div class="taskBody">
            <p>${task.dueDate}</p>
            <p>${task.priority}</p>
            <p>${task.description}</p>
            <button id="${task.title}" class="btn btn-primary completeTaskBtn">Complete</button>
            <button id="${task.title}" class="btn btn-info editTaskBtn">Edit</button>
            <button id="${task.title}" class="btn btn-danger deleteTaskBtn">Delete</button>
        </div>
    `
}

function showEditTaskForm (block, task) {
    block.innerHTML = ''
    console.log(task.description)
    block.innerHTML += `
        <form action="">
            <label>Due date</label>
            <input type="date" id="editTaskDueDate" placeholder=${task.dueDate}>

            <br>
            <label>Priority</label>
            <select name="priority" id="editTaskPriority">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            <br>
            <label>Project description</label>
            <textarea name="" id="editTaskDescription" cols="30" rows="10" placeholder="${task.description}"></textarea>

            <button id="submitEditTask" class="btn">Edit task</button>
            <button id="cancelEditTask" class="btn">Cancel</button>
        </form>`
}


export default renderProjects;