import AppController from './appController.js';
import Project from './project.js';
import renderProjects from './domOperations.js';

const newProjectTitle = document.getElementById('newProjectTitle');
const newProjectDueDate = document.getElementById('newProjectDueDate');
const newProjectDescription = document.getElementById('newProjectDescription');

const form = document.querySelector('form')

const submitProject = document.getElementById('submitProject');

submitProject.addEventListener('click', (e) => {
    e.preventDefault()
    
    controller.addProject(newProjectTitle.value, newProjectDescription.value, newProjectDueDate.value, )
})

let testProject = new Project('test project', 'test purposes', 'when it\'s done')
testProject.addTodo({ title:'Turn', description:'Burn the garden', dueDate:'tomorrow', priority: 'high', isDone: false })
testProject.addTodo({ title:'Burn', description:'Burn the garden', dueDate:'tomorrow', priority: 'high', isDone: false })
testProject.addTodo({ title:'Churn', description:'Burn the garden', dueDate:'tomorrow', priority: 'high', isDone: false })
testProject.addTodo({ title:'Jason Burn', description:'Burn the garden', dueDate:'tomorrow', priority: 'high', isDone: false })

const controller = new AppController()
//controller.projectList = [testProject] 

//controller.addProject('this dude')


/*
function checkProjectAlreadyInList (title) {
    return projectList.some( project => {
        return (project.title === title)
    });
}

function addProject (title, description, dueDate) {
    if(checkProjectAlreadyInList(title)) return 'Error, task already in list'

    projectList.push( new Project(title, description, dueDate));

    renderProjects(projectList)

    form.reset()

    return
}

*/
controller.loadFromLocalStorage()
controller.saveToLocalStorage()

renderProjects(controller)

const refreshBtn = document.createElement('button')
refreshBtn.textContent = 'Refresh'

refreshBtn.addEventListener('click', () => console.log(controller.projectList))
document.querySelector('body').appendChild(refreshBtn)

