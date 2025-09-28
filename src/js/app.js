/**
 * @copyright codewithsadee 2023
 */

"use strict";
// import modules
import { addEventOnElements, greetingMsg } from "./utils.js";

// toggle sidebar

const $sidebar = document.querySelector("[data-sidebar]");
const $sidebar_toggler = document.querySelectorAll("[data-sidebar-toggler]");
const $overlay = document.querySelector("[data-sidebar-overlay]");

addEventOnElements($sidebar_toggler, "click", () => {
  $sidebar.classList.toggle("active");
  $overlay.classList.toggle("active");
});

// handler time greeting
const greetingEle = document.querySelector("[data-greeting]");
const currentHoure = new Date().getHours();
greetingEle.textContent = greetingMsg(currentHoure);

// show current date on homepage
const currentDataEle = document.querySelector("[data-current-date]");
currentDataEle.textContent = new Date().toDateString();
