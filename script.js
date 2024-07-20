document.addEventListener("DOMContentLoaded", () => {
    // Select elements from the dom
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    function loadTasks() {
        const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        existingTasks.forEach(taskText => addTask(taskText, save=false));
    }

    // load existing tasks in localStorage and
    // display them in the dom
    loadTasks();

    function addTask(_taskText, save=true) {
        let taskText;

        // If "save" is "true" use the value from the input
        // as the taskText otherwise, use the value "_taskText"
        // which is passed when calling "loadTask" function
        if (save) {
            // Retrieve and trim the value from the task input field
            taskText = taskInput.value.trim();
        } else {
            taskText = _taskText;
        }

        // If the user didn't provide a task, let them know
        // and stop the execution of the function
        if (!taskText.length) {
            alert("Please enter a task!");
            return;
        }

        // Create a li element where the task item
        // will be displayed
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create "Remove task" button and remove li element
        // when clicked
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", () => {
            // Retrieve task text to be removed
            // textContent of "li" will contain the textContent of the "Remove" button
            // that's why we need to get rid of that "Remove" text.
            const taskTextToRemove = li.textContent.split("Remove")[0];

            // Remove the task from localStorage
            let existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            existingTasks = existingTasks.filter(tskText => tskText !== taskTextToRemove);
            localStorage.setItem("tasks", JSON.stringify(existingTasks));

            // Remove the task from the dom
            li.parentElement.removeChild(li);
        })

        // Add "Remove task" button as a child of the li element
        li.appendChild(removeBtn);

        // Add task item (li element) to the task list
        taskList.appendChild(li);

        // Clear task input field
        taskInput.value = "";

        // Save task to localStorage only if "save" is "true"
        if (save) {
            // Get existing tasks, add the new task, then save new tasks list on localStorage.
            const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            existingTasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(existingTasks))
        }

    }

    // Attach a "click" event to "addButton" and pass
    // "addTask" function as a callback
    addButton.addEventListener("click", addTask);

    // Attach a "keypress" event to "taskInput" and call
    // "addTask" function if the pressed key is "Enter"
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    })
})
