// Initial values
const prompt = "Moon";

function displayWeekLine(weekNumber, projectName, projectLanguage) {
  const weekLine = `Week ${weekNumber} - ${prompt} - ${projectName} - ${projectLanguage}`;
  const weekLineEl = document.getElementById(`week-line-${weekNumber}`);
  weekLineEl.textContent = weekLine;
}

function getDisplayedProjectName(projectName) {
  const trimmedProjectName = projectName.trim();
  return trimmedProjectName === "" ? "Project name..." : projectName;
}

function updateWeekLine(weekNumber, projectNameEl, projectLanguageEl) {
  let projectName = getDisplayedProjectName(projectNameEl.value);
  let projectLanguage = projectLanguageEl.value;
  displayWeekLine(weekNumber, projectName, projectLanguage);
}

// First load
for (let week = 1; week <= 2; week++) {
  const projectNameEl = document.getElementById(`project-name-input-${week}`);
  const projectLanguageEl = document.getElementById(`project-language-select-${week}`);

  projectNameEl.addEventListener("input", () => {
    updateWeekLine(week, projectNameEl, projectLanguageEl);
  });
  projectLanguageEl.addEventListener("change", () => {
    updateWeekLine(week, projectNameEl, projectLanguageEl);
  });

  updateWeekLine(week, projectNameEl, projectLanguageEl);
}
