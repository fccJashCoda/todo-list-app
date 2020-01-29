import Project from './project.js';
import renderProjects from './domOperations.js'

function AppController() {
    this.projectList = []
}

AppController.prototype.checkProjectAlreadyInList = function (title) {
    return this.projectList.some( project => {
        return (project.title === title)
    });
}

AppController.prototype.addProject = function(title, description, dueDate) {
    if(this.checkProjectAlreadyInList(title)) return 'Error, task already in list'

    this.projectList.push( new Project(title, description, dueDate));

    renderProjects(this)

    return
}

AppController.prototype.saveToLocalStorage = function() {
    if (localStorage.getItem('projects') !== null) {
        let projects = JSON.parse(localStorage.getItem('projects'));

        projects = this.projectList;
        localStorage.setItem('projects', JSON.stringify(projects));

        return 'Updated existing database'
    } 

    let projects = this.projectList;
    localStorage.setItem('projects', JSON.stringify(projects));

    return 'Created new database'
}

AppController.prototype.loadFromLocalStorage = function() {
    if (localStorage.getItem('projects') !== null) {
        let projects = JSON.parse(localStorage.getItem('projects'));

        projects.forEach(project => {
            let loadedProject = new Project(project.title, project.description, project.dueDate);

            if (project.todoList.length > 0) {
                project.todoList.forEach(todo => loadedProject.addTodo( todo ));
            }

            this.projectList.push(loadedProject);
        })
        return 'Loaded successfully'
    }

    return 'Failed to load, no database found.'
}

export default AppController;