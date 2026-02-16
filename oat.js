/* oat.js — lightweight classless JS companion */

document.addEventListener("DOMContentLoaded", () => {
  // Handle newsletter form submission
  const form = document.querySelector('form[action="/api/subscribe"]');
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn.textContent;

      btn.textContent = "Subscribing...";
      btn.disabled = true;

      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          btn.textContent = "Subscribed!";
          form.querySelector('input[type="email"]').value = "";
        } else {
          btn.textContent = "Error — try again";
        }
      } catch {
        btn.textContent = "Error — try again";
      }

      setTimeout(() => {
        btn.textContent = origText;
        btn.disabled = false;
      }, 3000);
    });
  }
});
