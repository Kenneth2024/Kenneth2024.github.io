document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateTaskList() {
        taskList.innerHTML = ''; 
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = `${task.title} (Priority: ${task.priority})`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function () {
                removeTask(taskItem, index);
            });

            const completeButton = document.createElement('button');
            completeButton.textContent = task.status === 'complete' ? 'Mark as Incomplete' : 'Mark as Complete';
            completeButton.addEventListener('click', function () {
                toggleComplete(taskItem, index, completeButton);
            });

            taskItem.appendChild(completeButton);
            taskItem.appendChild(removeButton);

            if (task.status === 'complete') {
                taskItem.classList.add('completed');
                const checkmarkIcon = document.createElement('i');
                checkmarkIcon.className = 'fas fa-check-circle text-success';
                taskItem.appendChild(checkmarkIcon);
            }

            taskList.appendChild(taskItem);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    updateTaskList();

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const taskTitle = document.getElementById('task-title').value;
        const taskPriority = document.getElementById('task-priority').value;

        if (taskTitle) {
            const task = { title: taskTitle, priority: taskPriority, status: 'incomplete' };
            tasks.push(task);

            updateTaskList();
            taskForm.reset();
        }
    });

    function removeTask(taskItem, index) {
        tasks.splice(index, 1);
        updateTaskList(); 
    }

    function toggleComplete(taskItem, index, completeButton) {
        tasks[index].status = tasks[index].status === 'incomplete' ? 'complete' : 'incomplete';
        updateTaskList(); 
    }
});
