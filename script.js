// DOM elements
const projectNameEl = document.getElementById("project-name-input");
const projectLanguageEl = document.getElementById("project-language-select");
const weekLineEl = document.getElementById("week-line");

// Initial values
const weekNumber = 1;
const prompt = "Moon";

function getDisplayedProjectName(projectName) {
  const trimmedProjectName = projectName.trim();

  return trimmedProjectName === "" ? "Project" : projectName;
}

function displayWeekLine(projectName, projectLanguage) {
  const weekLine = `Week ${weekNumber} - ${prompt} - ${projectName} - ${projectLanguage}`;
  const weekLineEl = document.getElementById("week-line");
  weekLineEl.textContent = weekLine;
}

function updateWeekLine() {
  let projectName = getDisplayedProjectName(projectNameEl.value);
  let projectLanguage = projectLanguageEl.value;

  displayWeekLine(projectName, projectLanguage);
}

// Events
projectNameEl.addEventListener("input", updateWeekLine);
projectLanguageEl.addEventListener("change", updateWeekLine);

// First load
updateWeekLine();
