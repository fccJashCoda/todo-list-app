const renderProjects = () => {
    
}

const createProjectTemplate = (obj) => {
    if (!obj) return 'error, no object';

    const content = document.getElementById('content');

    // Project wrapper
    const projectItem = document.createElement('div');
    projectItem.classList = 'project'
    
    
    // Project Header
    const projectTitle = document.createElement('h3');
    projectTitle.textContent = obj.title;
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
    projectDescription.textContent = obj.description;

    const taskList = document.createElement('ul');

    if (obj.list && obj.list.length > 0) {

        // .sort(priority)
        for (let i = 0; i < obj.list.length; i++) {
            taskList.appendChild(createTaskTemplate(obj.list[i]));
        }
    }

    // Project buttons
    const editProjectBtn = document.createElement('button');
    const deleteProjectBtn = document.createElement('button');

    editProjectBtn.textContent = 'Edit';
    deleteProjectBtn.textContent = 'Delete';
    
    projectBody.appendChild(projectDescription);
    projectBody.appendChild(editProjectBtn);
    projectBody.appendChild(deleteProjectBtn);
    projectBody.appendChild(taskList);

    projectItem.appendChild(projectTitle);
    projectItem.appendChild(projectBody);
    content.appendChild(projectItem);
    
    return content;
}

const createTaskTemplate = (task) => {

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


export default createProjectTemplate;