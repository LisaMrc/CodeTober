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

// User
let user = {
  name: "",
};

function getUserName(userName) {
  const trimmedUserName = userName.trim();
  return trimmedUserName === "" ? "Your username" : userName;
}

function updateUserName(usernameEl) {
  user.name = getUserName(usernameEl.value);
  let cardUsernameEl = document.getElementById(`card-username`);
  cardUsernameEl.textContent = user.name + "'s";
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
    let langColor = getLangColor(week.language);
    let weekLineBlock = `
        <tr>
            <th>Week ${week.number}</th>
            <td>${week.prompt}</td>
            <td>${week.project}</td>
            <td style="color: ${langColor}">${week.language}</td>
            <td class="text-lime">🔗 ${week.repo}</td>
        </tr>
    `;

    const weekLineEl = document.getElementById(`week-line-${index + 1}`);
    weekLineEl.innerHTML = weekLineBlock;
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

// Colors
const langColors = {
  JavaScript: "#f7df1eaa",
  TypeScript: "#3178c6aa",
  Python: "#3776abaa",
  Java: "#e76f00aa",
  C: "#00599caa",
  "C++": "#00599caa",
  "C#": "#68217aaa",
  PHP: "#777bb4aa",
  HTML: "#e34f26aa",
  CSS: "#1572b6aa",
  React: "#61dafbaa",
  Tailwind: "#06b6d4aa",
  Vue: "#42b883aa",
  Angular: "#dd0031aa",
  "Next.js": "#000000aa",
  "Node.js": "#339933aa",
};

function getLangColor(lang) {
  return langColors[lang] !== undefined ? langColors[lang] : "#808080aa";
}

// Renders
function renderForm() {
  let fullForm = "";
  for (let week = 1; week <= 4; week++) {
    fullForm += `
        <div id="week-form-${week}" class="p-2 my-8 bg-block rounded-xl">
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
  let fullCard = `
    <table>
      <thead class="p-2">
        <tr class="font-mono text-l text-left text-muted sub my-2 uppercase">
          <th>Week</th>
          <th>Prompt</th>
          <th>Project</th>
          <th>Language</th>
          <th>Repository</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let week = 1; week <= 4; week++) {
    fullCard += `<tr id="week-line-${week}"></tr>`;
  }

  fullCard += `
      </tbody>
    </table>
  `;

  const cardEl = document.getElementById("weeks-card");
  cardEl.innerHTML = fullCard;
}

// Update

function updateCard() {
  for (let week = 1; week <= 4; week++) {
    const projectNameEl = document.getElementById(`project-name-input-${week}`);
    const projectLanguageEl = document.getElementById(`project-language-select-${week}`);
    const repoUrlEl = document.getElementById(`repo-url-input-${week}`);
    const promptBtnEl = document.getElementById(`prompt-btn-${week}`);
    const usernameEl = document.getElementById(`username-input`);

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

    usernameEl.addEventListener("input", () => {
      updateUserName(usernameEl);
    });

    updateWeek(week, projectNameEl, projectLanguageEl, repoUrlEl);
    updateUserName(usernameEl);
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
