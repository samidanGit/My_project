const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;
const STORAGE_KEY = "ethiopian_signup_entries";
const THEME_KEY = "app_theme_choice";

const form = document.getElementById("signupForm");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const errorArea = document.getElementById("errorArea");
const counterArea = document.getElementById("counterArea");
const themeToggleBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggleBtn.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);
}

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem(THEME_KEY, nextTheme);
  } catch (err) {}
});

function loadEntries() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return [];
    const parsedData = JSON.parse(rawData);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    return [];
  }
}

function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {}
}

function validate(name, phone) {
  if (name.trim().length < 2) {
    return "Enter your full name (at least 2 characters).";
  }
  if (!PHONE_REGEX.test(phone.trim())) {
    return "Enter a valid Ethiopian phone number (e.g., 0911234567 or +251911234567).";
  }
  return "";
}

function displayError(message) {
  errorArea.textContent = message;
  if (message) {
    errorArea.classList.add("active");
  } else {
    errorArea.classList.remove("active");
  }
}

function renderCounter() {
  const entries = loadEntries();
  const count = entries.length;
  if (count === 0) {
    counterArea.textContent = "No signups yet.";
  } else if (count === 1) {
    counterArea.textContent = "1 person has signed up.";
  } else {
    counterArea.textContent = `${count} people have signed up.`;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const trimmedName = nameInput.value.trim();
  const trimmedPhone = phoneInput.value.trim();

  const errorMessage = validate(trimmedName, trimmedPhone);

  if (errorMessage) {
    displayError(errorMessage);
    return;
  }

  displayError("");

  const existingEntries = loadEntries();
  const newEntry = {
    name: trimmedName,
    phone: trimmedPhone
  };

  existingEntries.push(newEntry);
  saveEntries(existingEntries);

  form.reset();
  renderCounter();
});

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderCounter();
});
