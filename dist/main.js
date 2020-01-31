!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e,t,n){this.title=e,this.description=t,this.dueDate=n,this.isDeleted=!1,this.todoList=[]}n.r(t),o.prototype.todoAlreadyInProject=function(e){return e?this.todoList.some(t=>t.title===e):"Error"},o.prototype.addTodo=function(e){if(this.todoAlreadyInProject(e))return"Error, task already in list";this.todoList.push(e)},o.prototype.removeTodo=function(e){if(!e)return"Error";this.todoList=this.todoList.filter(t=>t.title!==e)},o.prototype.deleteProject=function(){return this.isDeleted=!0,"Project marked for deletion"},o.prototype.deleteAllTasks=function(){return this.todoList=[],"All tasks deleted"};var i=o;const a=e=>{document.getElementById("content").innerHTML="",e.projectList.length>0&&e.projectList.forEach(t=>{d(e,t)})},d=(e,t)=>{if(!t)return"error, no project";const n=document.getElementById("content"),o=document.createElement("div");o.classList="project";const i=document.createElement("h3");i.textContent=`Project: ${t.title}`,i.classList="projectTitle",i.onclick=()=>{d.classList.contains("elementHidden")?d.classList="projectBody":d.classList+=" elementHidden"};const d=document.createElement("div");d.classList="projectBody";const s=document.createElement("p");s.textContent=t.description,s.classList="projectDescription";const r=document.createElement("p");r.textContent=`Due: ${t.dueDate}`,r.classList="projectDueDate";const c=document.createElement("div");c.id="projectAddTaskBody";const u=document.createElement("ul");if(u.classList="taskList",console.log("render loglist function"),t.todoList&&t.todoList.length>0)for(let n=0;n<t.todoList.length;n++)u.appendChild(l(e,t,t.todoList[n]));const p=document.createElement("button"),m=document.createElement("button");p.textContent="Add Task",m.textContent="Delete",p.id=m.id=t.title,p.classList="btn btn-primary openAddTaskBtn",m.classList="btn btn-danger deleteProjectBtn",p.addEventListener("click",n=>{p.classList+=" elementHidden",m.classList+=" elementHidden",n.target.previousSibling.innerHTML+='\n        <form action="">\n            <label>Title</label>\n            <input type="text" id="addNewTaskTitle" >\n            \n            <label>Due date</label>\n            <input type="date" id="addNewTaskDueDate" >\n\n            <label>Priority</label>\n            <select name="priority" id="addNewTaskPriority">\n                <option value="High">High</option>\n                <option value="Medium">Medium</option>\n                <option value="Low">Low</option>\n            </select>\n\n            <label>Project description</label>\n            <textarea name="" id="addNewTaskDescription" cols="30" rows="10"></textarea>\n\n            <button id="submitAddNewTask" class="btn">Add new task</button>\n            <button id="cancelAddNewTask" class="btn">Cancel</button>\n        </form>',document.getElementById("submitAddNewTask").addEventListener("click",n=>{n.preventDefault();let o=document.getElementById("addNewTaskTitle");""==o.value||t.todoAlreadyInProject(o.value)||(t.addTodo({title:o.value,description:document.getElementById("addNewTaskDescription").value,dueDate:document.getElementById("addNewTaskDueDate").value,priority:document.getElementById("addNewTaskPriority").value,isDone:!1}),a(e),e.saveToLocalStorage())}),document.getElementById("cancelAddNewTask").addEventListener("click",t=>{t.preventDefault(),a(e)})}),m.addEventListener("click",n=>{confirm(`Delete this project? Project: ${t.title}`)&&(e.projectList=e.projectList.filter(e=>e.title!==n.target.id),a(e),e.saveToLocalStorage())}),d.appendChild(r),d.appendChild(s),d.appendChild(c),d.appendChild(p),d.appendChild(m),d.appendChild(u),o.appendChild(i),o.appendChild(d),n.appendChild(o)},l=(e,t,n)=>{let o=document.createElement("li"),i=document.createElement("h4");i.textContent=n.title,i.classList="task",i.onclick=()=>{d.classList.contains("elementHidden")?d.classList="taskBody":d.classList+=" elementHidden"};let d=document.createElement("div");d.classList="taskBody elementHidden";let l=document.createElement("p");l.textContent=`Due: ${n.dueDate}`,l.classList="taskDueDate";let s=document.createElement("p");s.textContent=`priority: ${n.priority}`,s.classList="taskPriority";let r=document.createElement("p");r.textContent=n.description,r.classList="taskDescription";const c=document.createElement("button"),u=document.createElement("button"),p=document.createElement("button");return c.textContent="Complete",u.textContent="Edit",p.textContent="Delete",c.id=u.id=p.id=n.title,c.addEventListener("click",()=>{n.isDone||(n.isDone=!0,o.classList+="crossed",e.saveToLocalStorage())}),u.addEventListener("click",t=>{if(!n.isDone){!function(e,t){e.innerHTML="",console.log(t.description),e.innerHTML+=`\n        <form action="">\n            <label>Due date</label>\n            <input type="date" id="editTaskDueDate" placeholder=${t.dueDate}>\n\n            <label>Priority</label>\n            <select name="priority" id="editTaskPriority">\n                <option value="High">High</option>\n                <option value="Medium">Medium</option>\n                <option value="Low">Low</option>\n            </select>\n\n            <label>Project description</label>\n            <textarea name="" id="editTaskDescription" cols="30" rows="10" placeholder="${t.description}"></textarea>\n\n            <button id="submitEditTask" class="btn">Edit task</button>\n            <button id="cancelEditTask" class="btn">Cancel</button>\n        </form>`}(d,n);let t=document.getElementById("editTaskDueDate"),o=document.getElementById("editTaskDescription");document.getElementById("submitEditTask").addEventListener("click",i=>{i.preventDefault(),n.dueDate=t.value||t.placeholder,n.priority=document.getElementById("editTaskPriority").value,n.description=o.value||o.placeholder,e.saveToLocalStorage(),a(e)}),document.getElementById("cancelEditTask").addEventListener("click",t=>{t.preventDefault(),a(e)})}}),p.addEventListener("click",()=>{t.removeTodo(n.title),e.saveToLocalStorage(),a(e)}),c.classList="btn btn-primary completeTaskBtn",u.classList="btn btn-info editTaskBtn",p.classList="btn btn-danger deleteTaskBtn",d.appendChild(l),d.appendChild(s),d.appendChild(r),d.appendChild(c),d.appendChild(u),d.appendChild(p),o.appendChild(i),o.appendChild(d),n.isDone&&(o.classList+=" crossed"),o};var s=a;function r(){this.projectList=[]}r.prototype.checkProjectAlreadyInList=function(e){return this.projectList.some(t=>t.title===e)},r.prototype.addProject=function(e,t,n){if(this.checkProjectAlreadyInList(e))return"Error, task already in list";this.projectList.push(new i(e,t,n)),s(this)},r.prototype.saveToLocalStorage=function(){if(null!==localStorage.getItem("projects")){let e=JSON.parse(localStorage.getItem("projects"));return e=this.projectList,localStorage.setItem("projects",JSON.stringify(e)),"Updated existing database"}this.addProject("Sample Project","Lorem ipsum dolor sit amet consectetur adipisicing elit.","2020-01-01"),this.projectList[0].addTodo({title:"Sample Todo",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",dueDate:"2020-01-01",priority:"Low",isDone:!1});let e=this.projectList;return localStorage.setItem("projects",JSON.stringify(e)),"Created new database"},r.prototype.loadFromLocalStorage=function(){if(null!==localStorage.getItem("projects")){return JSON.parse(localStorage.getItem("projects")).forEach(e=>{let t=new i(e.title,e.description,e.dueDate);e.todoList.length>0&&e.todoList.forEach(e=>t.addTodo(e)),this.projectList.push(t)}),"Loaded successfully"}return"Failed to load, no database found."};var c=r;const u=document.getElementById("addProject"),p=document.getElementById("addProjectForm"),m=new c;u.addEventListener("click",e=>{e.preventDefault(),u.classList+=" elementHidden",p.classList="";const t=document.getElementById("newProjectTitle"),n=document.getElementById("newProjectDueDate"),o=document.getElementById("newProjectDescription");document.getElementById("submitProject").addEventListener("click",e=>{e.preventDefault(),console.log(t),console.log(t.value),console.log(),""==t.value||m.checkProjectAlreadyInList(t.value)||(m.addProject(t.value,o.value,n.value),m.saveToLocalStorage(),s(m),u.classList="",p.classList+=" elementHidden")})}),null!==localStorage.getItem("projects")?m.loadFromLocalStorage():m.saveToLocalStorage(),s(m)}]);