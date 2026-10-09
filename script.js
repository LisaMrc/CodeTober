const weekNumber = 1;
const prompt = "Moon";

function displayWeekLine(projectName, projectLanguage) {
  const weekLine = `Week ${weekNumber} - ${prompt} - ${projectName} - ${projectLanguage}`;
  const weekLineEl = document.getElementById("week-line");
  weekLineEl.textContent = weekLine;
}

function getDisplayedProjectName(projectName) {
  const trimmedProjectName = projectName.trim();
  if (trimmedProjectName === "") {
    projectName = "Placeholder test";
  }
  return projectName;
}

function getSelectedProjectLanguage(projectLanguage) {
  return projectLanguage;
}

//  First load
const projectNameEl = document.getElementById("project-name-input");
let projectName = projectNameEl.value;

const projectLanguageEl = document.getElementById("project-language-select");
let projectLanguage = projectLanguageEl.value;

projectName = getDisplayedProjectName(projectName);
projectLanguage = getSelectedProjectLanguage(projectLanguage);
displayWeekLine(projectName, projectLanguage);

// Project Name input management
projectNameEl.addEventListener("input", () => {
  projectName = projectNameEl.value;
  getDisplayedProjectName(projectName);
  displayWeekLine(projectName, projectLanguage);
});

projectLanguageEl.addEventListener("change", () => {
  projectLanguage = projectLanguageEl.value;
  getSelectedProjectLanguage(projectLanguage);
  displayWeekLine(projectLanguage, projectLanguage);
});
