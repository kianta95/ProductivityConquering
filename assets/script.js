
function openModal() {
    
    document.getElementById('modal').style.display = 'block';
}


document.getElementById("new-task-button").addEventListener("click", openModal);


document.getElementById("task-form").addEventListener("submit", function(event) {
    
    event.preventDefault();
    
    
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;

    
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.draggable = true;

    
    const taskTitle = document.createElement("h3");
    taskTitle.textContent = title;
    newTask.appendChild(taskTitle);
    
    const taskDescription = document.createElement("p");
    taskDescription.textContent = description;
    newTask.appendChild(taskDescription);
    
    const taskDeadline = document.createElement("p");
    taskDeadline.textContent = "Deadline: " + deadline;
    newTask.appendChild(taskDeadline);

    
    document.getElementById("not-started-tasks").appendChild(newTask);

  
    const taskData = { title, description, deadline, state: 'Not Yet Started' };
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    
    closeModal();
});


function closeModal() {
    
    document.getElementById("modal").style.display = 'none';

    
    document.getElementById("task-form").reset();
}

document.querySelector(".close").addEventListener("click", closeModal);

newTask.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("text/plain", "task");
});


newTask.addEventListener("dragover", function(event) {
    event.preventDefault();
});

newTask.addEventListener("drop", function(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    if (data === "task") {
        const offsetX = event.clientX - newTask.getBoundingClientRect().left;
        const offsetY = event.clientY - newTask.getBoundingClientRect().top;
        newTask.appendChild(document.querySelector(".task p"));
    }});