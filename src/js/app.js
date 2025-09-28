/**
 * @copyright codewithsadee 2023
 */

"use strict";
// import modules
import { addEventOnElements } from "./utils.js";

// toggle sidebar

const $sidebar = document.querySelector("[data-sidebar]");
const $sidebar_toggler = document.querySelectorAll("[data-sidebar-toggler]");
const $overlay = document.querySelector("[data-sidebar-overlay]");

addEventOnElements($sidebar_toggler, "click", () => {
  $sidebar.classList.toggle("active");
  $overlay.classList.toggle("active");
});
