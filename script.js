// Initial values
const prompt = "Moon";

function buildForm() {
  let fullForm = "";
  for (let week = 1; week <= 4; week++) {
    fullForm += `
  <div id="week-form-${week}" class="border-2 border-solid p-2 my-8">
      <h2>Week ${week}</h2>
      <div class="flex flex-row my-2 gap-8 ">
        <input type="text" id="project-name-input-${week}" class="border-2 border-solid" placeholder="Project name" />

        <select id="project-language-select-${week}" class="border-2 border-solid">
            <option value="Language">Select your main target language</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Tailwind">Tailwind</option>
        </select>
      </div>
    </div>
    `;
  }

  const formEl = document.getElementById("weeks-form");
  formEl.innerHTML = fullForm;
}

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
function updateCard() {
  for (let week = 1; week <= 4; week++) {
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
}

// First load
// 1 - build
buildForm();

// 2 - Update
updateCard();
