const weekNumber = 1;
const prompt = "Moon";

function displayWeekLine(projectName) {
  const weekLine = `Week ${weekNumber} - ${prompt} - ${projectName}`;
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

//  First load
const projectNameEl = document.getElementById("project-name-input");
let projectName = projectNameEl.value;

projectName = getDisplayedProjectName(projectName);
displayWeekLine(projectName);

// Project Name input management
projectNameEl.addEventListener("input", () => {
  projectName = projectNameEl.value;
  getDisplayedProjectName(projectName);
  displayWeekLine(projectName);
});
