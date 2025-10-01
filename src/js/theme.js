"use strict";
const themetoggleHandler = () => {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

const storedTheme = localStorage.getItem("theme");
const systemThemeIsDark = window.matchMedia(
  "(prefers-color-scheme:dark)"
).matches;

const initialTheme = storedTheme ?? (systemThemeIsDark ? "dark" : "light");

// set data-theme to html tag
document.documentElement.setAttribute("data-theme", initialTheme);

// theme btn click handlers
window.addEventListener("DOMContentLoaded", () => {
  const theme_toggle = document.querySelector("[data-theme-btn]");
  theme_toggle.addEventListener("click", themetoggleHandler);
});
