document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const taskTitle = document.getElementById('task-title').value;
        const taskPriority = document.getElementById('task-priority').value;

        if (taskTitle) {
            const task = { title: taskTitle, priority: taskPriority, status: 'incomplete' };
            tasks.push(task);

            displayTask(task);
            taskForm.reset();

            // Save the updated tasks to local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });

    function displayTask(task) {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.title} (Priority: ${task.priority})`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function () {
            removeTask(taskItem, task);
        });

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Mark as Complete';
        completeButton.addEventListener('click', function () {
            toggleComplete(taskItem, task, completeButton);
        });

        taskItem.appendChild(completeButton);
        taskItem.appendChild(removeButton);

        if (task.status === 'complete') {
            taskItem.classList.add('completed');
            completeButton.textContent = 'Mark as Incomplete';
        }

        taskList.appendChild(taskItem);
    }

    function removeTask(taskItem, task) {
        const index = tasks.indexOf(task);
        if (index > -1) {
            tasks.splice(index, 1);
        }
        taskItem.remove();

        // Save the updated tasks to local storage after removal
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function toggleComplete(taskItem, task, completeButton) {
        if (task.status === 'incomplete') {
            task.status = 'complete';
            taskItem.classList.add('completed');
            completeButton.textContent = 'Mark as Incomplete';
        } else {
            task.status = 'incomplete';
            taskItem.classList.remove('completed');
            completeButton.textContent = 'Mark as Complete';
        }

        // Save the updated tasks to local storage after completion toggle
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
