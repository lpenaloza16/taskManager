const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("task-container");
const taskCountInput = document.getElementById("task-count");
const tasksInput = document.getElementById("tasks-input");
const currentTaskElement = document.getElementById("current-task");
const taskLinkInput = document.getElementById("task-link");
const completedTasksElement = document.getElementById("completed-tasks");

let taskList = [];
let currentIndex = 0;
const completedTasks = [];

const clickSound = document.getElementById("click-sound");
const completedSound = document.getElementById("completed-sound");

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function playCompletedSound() {
  completedSound.currentTime = 0;
  completedSound.play();
}

function updateUI() {
  if (currentIndex < taskList.length) {
    currentTaskElement.innerText = taskList[currentIndex].text;
    taskLinkInput.value = taskList[currentIndex].link || "";
  } else {
    currentTaskElement.innerText = "All tasks processed.";
    playCompletedSound();
  }

  completedTasksElement.innerHTML = completedTasks
    .map(
      (task) =>
        `<li>${task.text} ${
          task.link ? `<a href="${task.link}" target="_blank">[Link]</a>` : ""
        }</li>`
    )
    .join("");
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskCount = parseInt(taskCountInput.value);
  const tasks = tasksInput.value
    .trim()
    .split("\n")
    .slice(0, taskCount)
    .map((task) => ({ text: task, link: null }));
  if (tasks.length > 0) {
    taskList = tasks;
    currentIndex = 0;
    taskForm.hidden = true;
    taskContainer.hidden = false;
    updateUI();
  }
});

document.getElementById("complete").addEventListener("click", () => {
  playClickSound();
  if (currentIndex < taskList.length) {
    taskList[currentIndex].link = taskLinkInput.value.trim();
    completedTasks.push(taskList[currentIndex]);
    currentIndex++;
    updateUI();
  }
});

document.getElementById("push").addEventListener("click", () => {
  playClickSound();
  if (currentIndex < taskList.length) {
    taskList[currentIndex].link = taskLinkInput.value.trim();
    const pushedTask = taskList.splice(currentIndex, 1);
    taskList.push(pushedTask[0]);
    updateUI();
  }
});

document.getElementById("edit-link").addEventListener("click", () => {
  playClickSound();
  if (currentIndex < taskList.length) {
    taskList[currentIndex].link = taskLinkInput.value.trim();
  }
});

document.getElementById("remove-link").addEventListener("click", () => {
  playClickSound();
  if (currentIndex < taskList.length) {
    taskList[currentIndex].link = null;
    taskLinkInput.value = "";
  }
});

// To use this updated task manager, create three files named `index.html`, `styles.css`, and `app.js`. Copy the corresponding code into each file. You will also need two sound effect files named `click.mp3` and `completed.mp3` for the button and completed task sound effects. Place these files in the same directory as your HTML file. Open `index.html` in a browser to use the task manager.

// Now, the links associated with the tasks are preserved when an item is pushed to the end of the list, and they will re-appear when the task shows up again.
