const weekNumber = 1;
const prompt = "Moon";
const projectName = "Pomodoro Timer";

const weekLine = `Week ${weekNumber} - ${prompt} - ${projectName}`;
const weekLineEl = document.getElementById("week-line");
weekLineEl.textContent = weekLine;

// ------
const projectNameEl = document.getElementById("project-name-input");
projectNameEl.addEventListener("input", () => {
  const trimmedProjectName = projectNameEl.value.trim();

  if (trimmedProjectName === "") {
    console.log("not valide");
  } else if (typeof trimmedProjectName === "string") {
    console.log("valide");
  }
});
