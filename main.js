
const themeToggleButton = document.querySelector("#theme-toggle");
const githubStatus = document.querySelector("#github-status");
const githubData = document.querySelector("#github-data");

const savedTheme = localStorage.getItem("portfolio-theme");

function applyTheme(theme) {
  document.body.classList.toggle("dark-theme", theme === "dark");

  themeToggleButton.textContent =
    theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

  localStorage.setItem("portfolio-theme", theme);
}

function initializeTheme() {
  applyTheme(savedTheme || "light");

  themeToggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");
    applyTheme(isDark ? "light" : "dark");
  });
}

async function fetchGitHubProfile() {
  githubStatus.textContent = "Loading profile...";
  githubData.replaceChildren();

  try {
    const response = await fetch(
      "https://api.github.com/users/sinbo19"
    );

    if (!response.ok) {
      throw new Error("Unable to load the GitHub profile.");
    }

    const profile = await response.json();
    renderGitHubProfile(profile);
    githubStatus.textContent = "GitHub profile loaded successfully.";
  } catch (error) {
    githubStatus.textContent =
      "Sorry, we could not load the GitHub profile. Check your internet connection and try again.";
  }
}

function renderGitHubProfile(profile) {
  const profileCard = document.createElement("article");
  const avatar = document.createElement("img");
  const username = document.createElement("h3");
  const biography = document.createElement("p");
  const repositories = document.createElement("p");
  const profileLink = document.createElement("a");

  avatar.src = profile.avatar_url;
  avatar.alt = `${profile.login}'s GitHub avatar`;

  username.textContent = profile.name || profile.login;
  biography.textContent = profile.bio || "No biography provided.";
  repositories.textContent =
    `Public repositories: ${profile.public_repos}`;

  profileLink.textContent = "View GitHub Profile";
  profileLink.href = profile.html_url;
  profileLink.target = "_blank";
  profileLink.rel = "noopener noreferrer";

  profileCard.append(
    avatar,
    username,
    biography,
    repositories,
    profileLink
  );

  githubData.append(profileCard);
}

initializeTheme();
fetchGitHubProfile();