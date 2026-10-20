// Prompts
const prompts = ["Moon", "Ghost", "Candy", "Witch", "Pumpkin", "Bat", "Broom", "Spice", "Night", "Cat"];
let currentPrompts = [];

function pickPrompt(prompts) {
  let index = Math.floor(Math.random() * prompts.length);
  return prompts[index];
}

function pickAllPrompts(prompts) {
  for (let week = 1; week <= 4; week++) {
    let currentPrompt = pickPrompt(prompts);

    while (currentPrompts.includes(currentPrompt)) {
      currentPrompt = pickPrompt(prompts);
    }

    currentPrompts.push(currentPrompt);
  }

  return currentPrompts;
}

function pickOnePrompt(prompts, index) {
  let replacementPrompt = pickPrompt(prompts);

  while (currentPrompts.includes(replacementPrompt)) {
    replacementPrompt = pickPrompt(prompts);
  }

  currentPrompts[index] = replacementPrompt;

  weeks[index].prompt = replacementPrompt;

  return currentPrompts;
}

function renderForm() {
  let fullForm = "";
  for (let week = 1; week <= 4; week++) {
    fullForm += `
        <div id="week-form-${week}" class="border-2 border-solid p-2 my-8">
            <div class="flex flex-row justify-between">
                <h2>Week ${week}</h2>
                <button id="prompt-btn-${week}" type="button">🎲 ${currentPrompts[week - 1]}</button>
            </div>

            <div class="flex flex-row my-2 gap-8 ">
            <input type="text" id="project-name-input-${week}" class="border-2 border-solid" placeholder="Project name" />
            <select id="project-language-select-${week}" class="border-2 border-solid">
                <option value="Language">Target language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Tailwind">Tailwind</option>
            </select>

            <input type="text" id="repo-url-input-${week}" class="border-2 border-solid" placeholder="Repo URL" />
            </div>
        </div>
    `;
  }

  const formEl = document.getElementById("weeks-form");
  formEl.innerHTML = fullForm;
}

function renderCard() {
  let fullCard = "";
  for (let week = 1; week <= 4; week++) {
    fullCard += `<p id="week-line-${week}"></p>`;
  }

  const cardEl = document.getElementById("weeks-card");
  cardEl.innerHTML = fullCard;
}

// Weeks
let weeks = [];

function createWeeks() {
  for (let i = 1; i <= 4; i++) {
    const week = {
      number: i,
      prompt: currentPrompts[i - 1],
      project: "",
      language: "",
      repo: "Amazing Url",
    };
    weeks.push(week);
  }
}

function displayWeeks(weeks) {
  weeks.forEach((week, index) => {
    const weekLineEl = document.getElementById(`week-line-${index + 1}`);
    weekLineEl.textContent = `${week.number} - ${week.prompt} - ${week.project} - ${week.language} - ${week.repo}`;
  });
}

function getDisplayedProjectName(projectName) {
  const trimmedProjectName = projectName.trim();
  return trimmedProjectName === "" ? "Project name..." : projectName;
}

function getRepoUrl(repoUrl) {
  const trimmedRepoUrl = repoUrl.trim();
  return trimmedRepoUrl === "" ? "Repo url..." : repoUrl;
}

function updateWeek(weekNumber, projectNameEl, projectLanguageEl, repoUrlEl) {
  weeks[weekNumber - 1].project = getDisplayedProjectName(projectNameEl.value);
  weeks[weekNumber - 1].language = projectLanguageEl.value;
  weeks[weekNumber - 1].repo = getRepoUrl(repoUrlEl.value);

  displayWeeks(weeks);
}

function updatePromptButton(week) {
  const promptBtnEl = document.getElementById(`prompt-btn-${week}`);
  promptBtnEl.textContent = "🎲 " + currentPrompts[week - 1];
}

function updateCard() {
  for (let week = 1; week <= 4; week++) {
    const projectNameEl = document.getElementById(`project-name-input-${week}`);
    const projectLanguageEl = document.getElementById(`project-language-select-${week}`);
    const repoUrlEl = document.getElementById(`repo-url-input-${week}`);
    const promptBtnEl = document.getElementById(`prompt-btn-${week}`);

    projectNameEl.addEventListener("input", () => {
      updateWeek(week, projectNameEl, projectLanguageEl, repoUrlEl);
    });

    projectLanguageEl.addEventListener("change", () => {
      updateWeek(week, projectNameEl, projectLanguageEl, repoUrlEl);
    });

    repoUrlEl.addEventListener("input", () => {
      updateWeek(week, projectNameEl, projectLanguageEl, repoUrlEl);
    });

    promptBtnEl.addEventListener("click", () => {
      pickOnePrompt(prompts, week - 1);
      updateWeek(week, projectNameEl, projectLanguageEl, repoUrlEl);
      updatePromptButton(week);
    });

    updateWeek(week, projectNameEl, projectLanguageEl, repoUrlEl);
  }
}

// First load
// 1 - render
pickAllPrompts(prompts);
createWeeks();

renderForm();
renderCard();
displayWeeks(weeks);

// 2 - Update
updateCard();
