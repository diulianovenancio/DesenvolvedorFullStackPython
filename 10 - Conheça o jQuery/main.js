$(document).ready(function() {
    loadTasks();

    $('#taskForm').submit(function(event) {
        event.preventDefault();
        var task = $('#task').val();
        if (task) {
            addTask(task);
            $('#task').val('');
        }
    });

    $('#taskList').on('click', 'li', function() {
        var index = $(this).data('index');
        toggleTaskCompletion(index);
    });

    $('#taskList').on('click', '.delete-icon', function(event) {
        event.stopPropagation();
        var index = $(this).parent().data('index');
        deleteTask(index);
    });

    $('#clearTasks').click(function() {
        clearAllTasks();
    });
});

function addTask(task) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskList = $('#taskList');
    taskList.empty();
    tasks.forEach(function(task, index) {
        var taskItem = $('<li><span>' + task.text + '</span><i class="fas fa-square check-icon"></i><i class="fas fa-trash delete-icon"></i></li>');
        if (task.completed) {
            taskItem.addClass('completed');
            taskItem.find('.check-icon').removeClass('fa-square').addClass('fa-square-check');
        }
        taskItem.data('index', index);
        taskList.append(taskItem);
    });
}

function toggleTaskCompletion(index) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function clearAllTasks() {
    localStorage.removeItem('tasks');
    loadTasks();
}