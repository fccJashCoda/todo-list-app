import AppController from './appController.js';
import renderProjects from './domOperations.js';

const addProject = document.getElementById('addProject');
const addProjectForm = document.getElementById('addProjectForm');

const controller = new AppController()

addProject.addEventListener('click', (e) => {
    e.preventDefault();

    addProject.classList += ' elementHidden';
    addProjectForm.classList = ''

    const newProjectTitle = document.getElementById('newProjectTitle');
    const newProjectDueDate = document.getElementById('newProjectDueDate');
    const newProjectDescription = document.getElementById('newProjectDescription');

    const submitProject = document.getElementById('submitProject');

    

    submitProject.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(newProjectTitle)
        console.log(newProjectTitle.value)
        console.log()
        if (newProjectTitle.value != '' && !controller.checkProjectAlreadyInList(newProjectTitle.value)) {
            controller.addProject( newProjectTitle.value, newProjectDescription.value, newProjectDueDate.value, );
            
            controller.saveToLocalStorage()

            renderProjects(controller)
            addProject.classList =""
            addProjectForm.classList += ' elementHidden';
        }
    });
});

if (localStorage.getItem('projects') !== null) {
    controller.loadFromLocalStorage()
} else {
    controller.saveToLocalStorage()
}

renderProjects(controller)



