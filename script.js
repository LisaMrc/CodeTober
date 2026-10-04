const weekNumber = 1;
const prompt = "Moon";
const projectName = "Pomodoro Timer";

const weekLine = `Week ${weekNumber} - ${prompt} - ${projectName}`;

const weekLineEl = document.getElementById("week-line");
weekLineEl.textContent = weekLine;
