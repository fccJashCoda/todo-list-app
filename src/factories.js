const TodoFactory = (title, description, dueDate, priority, isDone) => {
    const todoIsDone = () => (isDone) ? true : false;
    
    const changeDueDate = () => console.log('new Date');
    
    const changePriority = () => console.log('priority modified')
    
    const completeTodo = () => isDone = true;

    // add task is expired or is late
    return { title, description, dueDate, priority, completeTodo, todoIsDone, changeDueDate, changePriority }
}

const ProjectFactory = (title, description, dueDate) => {
    let todoList = [];
    let isDeleted = false;

    const addTodo = (argList) => {
        let check = todoAlreadyInProject(argList)

        if (!check) {
            todoList.push(TodoFactory(argList[0], argList[1], argList[2], argList[3], argList[4]));
        } else {
            console.log('already in project')
            return 'Error, task already in list'
        }
    };

    const removeTodo = (title) => {
        todoList = todoList.filter((todo) => todo.title !== title)
    };

    const removeAllTasks = () => todoList = [];

    const logList = () => {
        console.log('todoList status');
        return todoList;
    }

    const todoAlreadyInProject = (argList) => {
        let status;
        todoList.forEach(todo => {
            if (todo.title === argList[0]) status = true;
        })
        if (status) return true;
    }
    
    const deleteProject = () => isDeleted = true;

    return { logList, title, description, dueDate, todoList, addTodo, removeTodo, deleteProject, removeAllTasks,isDeleted }

}

export default ProjectFactory; 