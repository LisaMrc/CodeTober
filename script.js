// DOM elements
const projectNameEl = document.getElementById("project-name-input-1");
const projectLanguageEl = document.getElementById("project-language-select-1");

// Initial values
const prompt = "Moon";

function getDisplayedProjectName(projectName) {
  const trimmedProjectName = projectName.trim();

  return trimmedProjectName === "" ? "Project" : projectName;
}

function displayWeekLine(weekNumber, projectName, projectLanguage) {
  const weekLine = `Week ${weekNumber} - ${prompt} - ${projectName} - ${projectLanguage}`;
  const weekLineEl = document.getElementById(`week-line-${weekNumber}`);
  weekLineEl.textContent = weekLine;
}

function updateWeekLine(weekNumber) {
  let projectName = getDisplayedProjectName(projectNameEl.value);
  let projectLanguage = projectLanguageEl.value;
  displayWeekLine(weekNumber, projectName, projectLanguage);
}

// Events
projectNameEl.addEventListener("input", () => {
  updateWeekLine(1);
});

projectLanguageEl.addEventListener("change", () => {
  updateWeekLine(1);
});

// First load
updateWeekLine(1);