/**
 * @copyright codewithsadee 2023
 */

"use strict";

const modal_btn = document.querySelector(".main .fab");

const modal = document.querySelector(".modal");
modal_btn.addEventListener("click", () => {
  modal.showModal();

  console.log("modal trigger");
});
