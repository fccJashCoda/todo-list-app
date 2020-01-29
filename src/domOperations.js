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
    projectTitle.textContent = project.title;
    projectTitle.classList = 'projectTitle'

    projectTitle.onclick = () => {
        if (projectBody.classList.contains('projectBodyHidden')) {
            projectBody.classList = 'projectBody';
        } else {
            projectBody.classList += ' projectBodyHidden'
        }
    }


    // Project Body
    const projectBody = document.createElement('div')
    projectBody.classList = 'projectBody';

    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.description;

    const taskList = document.createElement('ul');
    console.log('render loglist function')
    
    if (project.todoList && project.todoList.length > 0) {
        //projectBody.innerHTML = ""

        // .sort(priority)
        for (let i = 0; i < project.todoList.length; i++) {
            taskList.appendChild(createTaskTemplate(controller, project, project.todoList[i]));
        }
    }

    // Project buttons
    const addTaskBtn = document.createElement('button');
    const editProjectBtn = document.createElement('button');
    const deleteProjectBtn = document.createElement('button');

    addTaskBtn.textContent = 'Add Task'
    editProjectBtn.textContent = 'Edit';
    deleteProjectBtn.textContent = 'Delete';

    addTaskBtn.id = editProjectBtn.id = deleteProjectBtn.id = project.title
    addTaskBtn.classList = 'btn btn-primary addTaskBtn';
    editProjectBtn.classList = 'btn btn-info editProjectBtn';
    deleteProjectBtn.classList = 'btn btn-danger deleteProjectBtn';
    
    addTaskBtn.addEventListener('click', () => {
        console.log(projectTitle.textContent)
    });
    
    deleteProjectBtn.addEventListener('click', (e) => {
        console.log(e.target.id)
        controller.projectList = controller.projectList.filter(item => item.title !== e.target.id)
        renderProjects(controller)
        controller.saveToLocalStorage()
    });

    projectBody.appendChild(projectDescription);
    projectBody.appendChild(addTaskBtn);
    projectBody.appendChild(editProjectBtn);
    projectBody.appendChild(deleteProjectBtn);
    projectBody.appendChild(taskList);

    projectItem.appendChild(projectTitle);
    projectItem.appendChild(projectBody);
    content.appendChild(projectItem);
    
    return content;
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
        if (taskBody.classList.contains('taskBodyHidden')) {
            taskBody.classList = 'taskBody';
        } else {
            taskBody.classList += ' taskBodyHidden';
        }
    }

    // Task Body
    let taskBody = document.createElement('div');
    taskBody.classList = 'taskBody taskBodyHidden';

    let taskDueDate = document.createElement('p');
    taskDueDate.textContent = task.dueDate;

    let taskPriority = document.createElement('p');
    taskPriority.textContent = task.priority;
    
    let taskDescription = document.createElement('p');
    taskDescription.textContent = task.description ;

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

            let editTaskDescription = document.getElementById('editTaskDescription');
            console.log(editTaskDescription.placeholder)

            let submitEditTask = document.getElementById('submitEditTask')
            submitEditTask.addEventListener('click', (e) => {
                e.preventDefault()
                task.dueDate = document.getElementById('editTaskDueDate').value;
                task.priority = document.getElementById('editTaskPriority').value;
                task.description = document.getElementById('editTaskDescription').value;
                
                controller.saveToLocalStorage();
                renderProjects(controller);
            })

            let cancelEditTask = document.getElementById('cancelEditTask');
            cancelEditTask.addEventListener('click', () => {
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

function showAddTaskForm () {
    
}

function showEditTaskForm (block, task) {
    block.innerHTML = ''
    block.innerHTML += `
        <form action="">
            <label>Due date</label>
            <input type="date" id="editTaskDueDate" placeholder=${task.dueDate}>

            <label>Priority</label>
            <select name="priority" id="editTaskPriority">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            <label>Project description</label>
            <textarea name="" id="editTaskDescription" cols="30" rows="10" placeholder=${task.description}></textarea>

            <button id="submitEditTask">Edit task</button>
            <button id="cancelEditTask">Cancel</button>
        </form>`
}

function showEditProjectForm () {

}

export default renderProjects;