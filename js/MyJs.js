// we declare a variable that will be used in assigning id to our created elements
let id = 0;

function AddNewTask(){
    // we check if the input is empty and then create a new task div
    if(validateTask()){
        CreateNewTask();
    }
}

function validateTask(){
    // we check if the input is empty
    let TaskName = document.getElementById('NewTaskName').value;
    return TaskName!=''
}

function NewTaskCheckBox(){
    // we create a new task checkbox 
    let NewCheckBox = document.createElement("input");
    NewCheckBox.type = "checkbox";
    NewCheckBox.id =`checkbox-${id}`;
    NewCheckBox.className = "task";
    // we associate the checkbox with the TaskCompleted function and we pass it's id so as to know which task is completed
    NewCheckBox.onchange = function(){TaskCompleted(NewCheckBox.id)};
    return NewCheckBox;
}

function NewTaskDetails(){
    // we create task details made up of the name and time
    let NewTaskDetail = document.createElement("p")
    NewTaskDetail.innerHTML = `${document.getElementById('NewTaskName').value} Starts at ${document.getElementById('NewTaskTime').value}`
    NewTaskDetail.id= id;
    NewTaskDetail.className = "task";
    return NewTaskDetail;
}

function NewTaskDeletebutton(){
    // we create a new task delete button 
    let NewTaskDeletebutton = document.createElement("button");
    NewTaskDeletebutton.id = `button-${id}`;
    NewTaskDeletebutton.className = "task";
    NewTaskDeletebutton.innerHTML = 'delete';
    const taskid = `task-div-${id}`;
    // we associate it with DeleteTask function and pass div id so as to know which div to delete
    NewTaskDeletebutton.onclick = function(){DeleteTask(`${taskid}`);} 
    return NewTaskDeletebutton;    
}

function NewShiftUpbutton(){
    // we create a new button to move our task up
    let NewTaskDeletebutton = document.createElement("button");
    NewTaskDeletebutton.id = `up-button-${id}`;
    NewTaskDeletebutton.className = "task";
    NewTaskDeletebutton.innerHTML = '↑';
    const taskid = `task-div-${id}`;
    // we associate it with the ShiftDown function and pass div id so as to know which task needs to move down
    NewTaskDeletebutton.onclick = function(){ShiftUp(`${taskid}`);} 
    return NewTaskDeletebutton;    
}

function NewShiftDownbutton(){
    // we create a new button to move our task down
    let NewTaskDeletebutton = document.createElement("button");
    NewTaskDeletebutton.id = `down-button-${id}`;
    NewTaskDeletebutton.className = "task";
    NewTaskDeletebutton.innerHTML = '↓';
    const taskid = `task-div-${id}`;
    // we associate it with the ShiftDown function and pass div id so as to know which task needs to move up
    NewTaskDeletebutton.onclick = function(){ShiftDown(`${taskid}`);} 
    return NewTaskDeletebutton;    
}

function NewTaskHorizontalLine(){
    // we just add a new horizontal line to mark the end of the task for aesthetic
    let NewHorizontalLine = document.createElement("hr");
    return NewHorizontalLine;    
}

function NewTaskdiv(){
    // we create a new div to hold our task and related components
    let NewTaskdiv = document.createElement("div");
    NewTaskdiv.id = `task-div-${id}`;
    NewTaskdiv.className = "task-div";
    return NewTaskdiv;    
}

function CreateNewTask(){
    // we append all our created components to the div that will hold all tasks (TaskListDiv) 
    document.getElementById('TaskListDiv').appendChild(NewTaskdiv())
    document.getElementById(`task-div-${id}`).appendChild(NewTaskCheckBox())
    document.getElementById(`task-div-${id}`).appendChild(NewTaskDetails())
    document.getElementById(`task-div-${id}`).appendChild(NewTaskDeletebutton())
    document.getElementById(`task-div-${id}`).appendChild(NewShiftUpbutton())
    document.getElementById(`task-div-${id}`).appendChild(NewShiftDownbutton())
    document.getElementById(`task-div-${id}`).appendChild(NewTaskHorizontalLine())
    // we reset input fields to original state
    resetForm();
    // we increment the id variable for the next div created to have a different id
    id++;  
}

// this function is to delete all tasks
function ClearTaskList(){
    // we assign the div containing all tasks (TaskListDiv) to a variable
    const list = document.getElementById('TaskListDiv');
    // we iterare(as long as the div still has children appended)
    while (list.hasChildNodes()){
            // we remove the last appended child(task)
            list.removeChild(list.lastChild);
    }
    // we re-initialize our id variable so as to restart at 0 if we decide to create new elements
    id = 0;
}

// this function is to delete one specific task
function DeleteTask(ButtonTaskid){
    const list = document.getElementById('TaskListDiv');
    const index = TaskIndexgiver(ButtonTaskid);        
    // we remove the appended specific div using index given to us by TaskIndexgiver function
    list.removeChild(list.children[index]);
}

//this function gives us the index of a specific div
function TaskIndexgiver(Taskid){
    const list = document.getElementById('TaskListDiv');
    const task = document.getElementById(Taskid);
    const index = Array.from(list.children).indexOf(task);
    return (index);
}

function TaskCompleted(Taskid){
    // when the checkbox is checked we change the classname of the respective div which will affect it's css
    const status = document.getElementById(Taskid).checked;
    if(status == true){
        document.getElementById(Taskid).parentNode.className = `Finished-task-div`;
    }else{
        document.getElementById(Taskid).parentNode.className = `task-div`;
    }
    
}

function resetForm(){
    // we reset the input fields to their initial state
    document.getElementById('NewTaskName').value = '';
    document.getElementById('NewTaskTime').value = '08:00';
}

function CheckFirstElement(Taskid){
    // we check if a div (currentElement) is the first (on top)
    const firstElement = document.getElementById('TaskListDiv').firstChild;
    const currentElement = document.getElementById(Taskid);
    return firstElement != currentElement;
}

function CheckLastElement(Taskid){
    // we check if a div (currentElement) is the last (on bottom)
    const lastElement = document.getElementById('TaskListDiv').lastChild;
    const currentElement = document.getElementById(Taskid);
    return lastElement != currentElement;
}


// this function does NOT move the whole div just exchanges elements between our current div and the one above
function ShiftUp(Taskid){
    // we check if this div isn't on top (can't go up if it's on top)
    if(CheckFirstElement(Taskid)){
    const list = document.getElementById('TaskListDiv');
    const originalIndex = TaskIndexgiver(Taskid);
    
    // we give the current task details to created variables
    const currentTaskText = document.getElementById(originalIndex).innerHTML;
    const currentTaskStatus = document.getElementById(`checkbox-${originalIndex}`).checked;
    const currentTaskClass = document.getElementById(Taskid).className;

    // we place the details of the task above to the current div
    document.getElementById(originalIndex).innerHTML = document.getElementById(originalIndex-1).innerHTML
    document.getElementById(`checkbox-${originalIndex}`).checked = document.getElementById(`checkbox-${originalIndex-1}`).checked
    document.getElementById(Taskid).className = document.getElementById(`task-div-${originalIndex-1}`).className;

    // we then place the details of our task in the div above by retrieving them from the variables we had stored them in
    document.getElementById(originalIndex-1).innerHTML = currentTaskText
    document.getElementById(`checkbox-${originalIndex-1}`).checked = currentTaskStatus
    document.getElementById(`task-div-${originalIndex-1}`).className = currentTaskClass;
    }
}

// this function does NOT move the whole div just exchanges elements between our current div and the one below
function ShiftDown(Taskid){
     // we check if this div isn't on bottom (can't go down if it's on bottom)
    if(CheckLastElement(Taskid)){
    const list = document.getElementById('TaskListDiv');
    const originalIndex = TaskIndexgiver(Taskid);
    
    // we give the current task details to created variables
    const currentTaskText = document.getElementById(originalIndex).innerHTML;
    const currentTaskStatus = document.getElementById(`checkbox-${originalIndex}`).checked;
    const currentTaskClass = document.getElementById(Taskid).className;

    // we place the details of the task below to the current div
    document.getElementById(originalIndex).innerHTML = document.getElementById(originalIndex+1).innerHTML
    document.getElementById(`checkbox-${originalIndex}`).checked = document.getElementById(`checkbox-${originalIndex+1}`).checked
    document.getElementById(Taskid).className = document.getElementById(`task-div-${originalIndex+1}`).className;

    // we then place the details of our task in the div below by retrieving them from the variables we had stored them in
    document.getElementById(originalIndex+1).innerHTML = currentTaskText
    document.getElementById(`checkbox-${originalIndex+1}`).checked = currentTaskStatus
    document.getElementById(`task-div-${originalIndex+1}`).className = currentTaskClass;
    }
}