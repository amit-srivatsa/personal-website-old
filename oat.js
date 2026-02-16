/* oat.js — lightweight classless JS companion */

document.addEventListener("DOMContentLoaded", () => {
  // Add click handlers to all buttons
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Button clicked!");
    });
  });
});
