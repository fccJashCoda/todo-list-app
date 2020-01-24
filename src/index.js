import ProjectFactory from './factories.js';
import createProjectTemplate from './domOperations.js';

let example = ProjectFactory('Clean', 'Clean the garden', 'tomorrow');

// ['Clean', 'Clean the garden', 'tomorrow', 'high', false]

console.log(example.title);
console.log(example)

example.addTodo({ title:'Lick', description:'Lick the garden', dueDate:'tomorrow', priority: 'high', isDone: false });
example.addTodo({ title:'Clean', description:'Clean the garden', dueDate:'tomorrow', priority: 'high', isDone: false });
example.addTodo({ title:'Clean', description:'Clean the garden', dueDate:'tomorrow', priority: 'high', isDone: false });
example.addTodo({ title:'Clean2', description:'Clean the garden', dueDate:'tomorrow', priority: 'high', isDone: false });
example.addTodo({ title:'Burn', description:'Burn the garden', dueDate:'tomorrow', priority: 'high', isDone: false });

console.log('check')
//console.log(example.todoList)
console.log('removing Burn')

example.removeTodo('Burn')

console.log(example.logList())
//console.log(example.todoList)

example.addTodo({ title:'Churn', description:'Chrun the garden', dueDate:'tomorrow', priority: 'high', isDone: false });
example.removeTodo('Lick')
console.log(example.logList())


console.log('wipe everything')
example.removeAllTasks()
console.log(example.logList())

console.log('template here')
console.log(createProjectTemplate({ title: 'test', description:'noodles', list: [{ title: 'task test', description: 'Something has to be done', dueDate: '1.1.1', priority:'High'},{ title: 'task test' },{ title: 'task test' },]}))
console.log(createProjectTemplate({ title: 'test', description:'noodles', list: [{ title: 'task test' },{ title: 'task test' },{ title: 'task test3', isDone: true },]}))
