// Drag and drop functionality for task lists
document.querySelectorAll(".task-list").forEach(taskList => {
    taskList.addEventListener("dragover", event => event.preventDefault());
    taskList.addEventListener("drop", event => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("text/plain");
        const task = document.getElementById(taskId);
        if (!task || task.nodeType !== Node.ELEMENT_NODE) {
            console.error("Invalid task element.");
            return;
        }
        const targetId = event.currentTarget.id;
        switch (targetId) {
            case "not-started-tasks":
                task.setAttribute("data-state", "Not Yet Started");
                break;
            case "in-progress-tasks":
                task.setAttribute("data-state", "In Progress");
                break;
            case "completed-tasks":
                task.setAttribute("data-state", "Completed");
                break;
            default:
                console.error("Invalid task list.");
                return;
        }
        event.currentTarget.appendChild(task);
    });
});

// Make tasks draggable
document.querySelectorAll(".task").forEach(task => {
    task.draggable = true;
    task.addEventListener("dragstart", event => {
        event.dataTransfer.setData("text/plain", event.target.id);
    });
});

// Event listener for opening the modal
document.getElementById("new-task-button").addEventListener("click", openModal);

// Event listener for submitting the task form
document.getElementById("task-form").addEventListener("submit", event => {
    event.preventDefault();
    const titleElement = document.getElementById("title");
    const descriptionElement = document.getElementById("description");
    const deadlineElement = document.getElementById("deadline");
    const title = titleElement.value.trim();
    const description = descriptionElement.value.trim();
    const deadline = deadlineElement.value.trim();

    if (!title || !description || !deadline) {
        console.error("Please fill in all fields.");
        return;
    }

    const newTask = createTaskElement(title, description, deadline, 'Not Yet Started');
    document.getElementById("not-started-tasks").appendChild(newTask);
    saveTaskToLocalStorage({ title, description, deadline, state: 'Not Yet Started' });
    closeModal();
});

// Function to create a new task element
function createTaskElement(title, description, deadline, state) {
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.draggable = true;
    newTask.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Deadline: ${deadline}</p>
        <button class="delete-button">Delete</button>
    `;
    
    // Set background color based on task state
    switch (state) {
        case 'Not Yet Started':
            newTask.style.backgroundColor = 'blue';
            break;
        case 'In Progress':
            newTask.style.backgroundColor = 'orange';
            break;
        case 'Completed':
            newTask.style.backgroundColor = 'green';
            break;
        default:
            newTask.style.backgroundColor = 'gray';
            break;
    }
    
    newTask.addEventListener("dragstart", event => {
        event.dataTransfer.setData("text/plain", event.target.id);
    });
    newTask.querySelector(".delete-button").addEventListener("click", () => {
        newTask.parentNode.removeChild(newTask);
    });
    return newTask;
}


// Function to save task data to local storage
function saveTaskToLocalStorage(taskData) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to open the modal
function openModal() {
    document.getElementById('modal').style.display = 'block';
}

// Function to close the modal and clear input fields
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    // Clear input fields in the modal
    modal.querySelectorAll('input[type="text"], textarea').forEach(input => {
        input.value = '';
    });
}
