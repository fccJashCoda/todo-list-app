function Project(title, description, dueDate) {

	this.title = title 
	this.description = description
	this.dueDate = dueDate 
	this.isDeleted = false
	this.todoList = []
	
}

Project.prototype.todoAlreadyInProject = function(newTodo) {
	if (!newTodo) return 'Error'

	return this.todoList.some(todo => {
		return (todo.title === newTodo.title)
	})
}

Project.prototype.addTodo = function ( newTodo ) {
	if (!this.todoAlreadyInProject( newTodo )) {
		this.todoList.push( newTodo );
		return
	}
	return 'Error, task already in list'
}

Project.prototype.removeTodo = function(title) {
	if (!title) return 'Error'
	this.todoList = this.todoList.filter((todo) => todo.title !== title)
};

Project.prototype.deleteProject = function() {
	this.isDeleted = true
	return 'Project marked for deletion'
};

Project.prototype.deleteAllTasks = function() {
	this.todoList = []
	return 'All tasks deleted'
}


export default Project; 