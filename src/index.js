import ProjectFactory from './factories.js';

let example = ProjectFactory('Clean', 'Clean the garden', 'tomorrow');

// ['Clean', 'Clean the garden', 'tomorrow', 'high', false]

console.log(example.title);
console.log(example)

example.addTodo(['Lick', 'Lick the garden', 'tomorrow', 'high', false])
example.addTodo(['Clean', 'Clean the garden', 'tomorrow', 'high', false])
example.addTodo(['Clean', 'Clean the garden', 'tomorrow', 'high', false])
example.addTodo(['Clean2', 'Clean the garden', 'tomorrow', 'high', false])
example.addTodo(['Burn', 'Burn the garden', 'tomorrow', 'high', false])

console.log('check')
//console.log(example.todoList)
console.log('removing')

example.removeTodo('Burn')

console.log(example.logList())
//console.log(example.todoList)

example.addTodo(['Churn', 'Burn the garden', 'tomorrow', 'high', false])
example.removeTodo('Lick')
console.log(example.logList())


console.log('wipe everything')
example.removeAllTasks()
console.log(example.logList())