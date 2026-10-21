// Prompts
const prompts = ["Moon", "Ghost", "Candy", "Witch", "Pumpkin", "Bat", "Broom", "Spice", "Night", "Cat"];

function pickPrompt(prompts) {
  let index = Math.floor(Math.random() * prompts.length);
  return prompts[index];
}

function pickWeekPrompt(prompts) {
  let currentPrompts = [];
  for (let i = 0; i < weeks.length; i++) {
    currentPrompts.push(weeks[i].prompt);
  }

  let replacementPrompt = pickPrompt(prompts);

  while (currentPrompts.includes(replacementPrompt)) {
    replacementPrompt = pickPrompt(prompts);
  }

  return replacementPrompt;
}

// Renders
function renderForm() {
  let fullForm = "";
  for (let week = 1; week <= 4; week++) {
    fullForm += `
        <div id="week-form-${week}" class="p-2 my-8 bg-block rounded-xl p-3 mb-3">
            <div class="flex flex-row justify-between m-2">
                <h2 class="font-bold text-brand">Week ${week}</h2>
                <button id="prompt-btn-${week}" type="button" class="rounded-full border border-line bg-block px-3 py-1 text-sm">🎲 ${weeks[week - 1].prompt}</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input type="text" id="project-name-input-${week}" class="bg-[#0d0718] border border-line rounded-lg px-3 py-2 text-sm w-full" placeholder="Project name" />
            <select id="project-language-select-${week}" class="bg-[#0d0718] border border-line rounded-lg px-3 py-2 text-sm w-full">
                <option value="Language">Target language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Tailwind">Tailwind</option>
            </select>

            <input type="text" id="repo-url-input-${week}" class="bg-[#0d0718] border border-line rounded-lg px-3 py-2 text-sm w-full" placeholder="Repo URL" />
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
  for (let weekNumber = 1; weekNumber <= 4; weekNumber++) {
    const week = {
      number: weekNumber,
      prompt: pickWeekPrompt(prompts),
      project: "",
      language: "",
      repo: "",
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
  promptBtnEl.textContent = "🎲 " + weeks[week - 1].prompt;
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
      weeks[week - 1].prompt = pickWeekPrompt(prompts);
      updateWeek(week, projectNameEl, projectLanguageEl, repoUrlEl);
      updatePromptButton(week);
    });

    updateWeek(week, projectNameEl, projectLanguageEl, repoUrlEl);
  }
}

// First load
// 1 - Create data
createWeeks();

// 2 - Render
renderForm();
renderCard();

// 3 - Update
updateCard();
