document.addEventListener('DOMContentLoaded', () => {
    // Fetch tasks from local storage when the page loads
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
  
    savedTasks.forEach((taskText) => {
      const li = createTaskElement(taskText);
      taskList.appendChild(li);
    });
  
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
  });
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    if (taskInput.value !== '') {
      const li = createTaskElement(taskInput.value);
  
      // Save tasks in local storage
      saveTasksToLocalStorage();
  
      taskList.appendChild(li);
      taskInput.value = '';
    }
  }
  
  function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      // Save tasks in local storage after marking as completed
      saveTasksToLocalStorage();
    });
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      const taskList = document.getElementById('taskList');
      taskList.removeChild(li);
      // Save tasks in local storage after deleting
      saveTasksToLocalStorage();
    });
  
    li.appendChild(deleteButton);
    return li;
  }
  
  function saveTasksToLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children).map((li) => {
      // Remove "Delete" button text before saving
      const taskText = li.textContent.replace('Delete', '').trim();
      return taskText;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  