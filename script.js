let ctx = null;
function clickBlip() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle"; // clean + modern
  osc.frequency.setValueAtTime(520, ctx.currentTime); // bright but not squeaky

  // Very fast envelope — soft digital blip
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

document.querySelectorAll(".artist-name").forEach((el) => {
  el.addEventListener("click", (e) => {
    clickBlip();
  });
});

document
  .querySelectorAll(".top-left, .top-right, .album-link")
  .forEach((el) => {
    el.addEventListener("click", clickBlip);
  });

const featHeader = document.querySelector(".collapsible-header-feat");
if (featHeader) {
  const featContent = document.querySelector(".collapsible-content-feat");
  featHeader.addEventListener("click", () => {
    const expanded = featContent.style.maxHeight;
    if (expanded && expanded !== "0px") {
      featContent.style.maxHeight = "0px";
      featHeader.textContent = "Additional Information";
    } else {
      featContent.style.maxHeight = featContent.scrollHeight + "px";
      featHeader.textContent = "Additional Information [-]";
    }
    clickBlip();
  });
}

const modeToggle = document.getElementById("modeToggle");
if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    modeToggle.textContent = document.body.classList.contains("light")
      ? "Light Mode"
      : "Dark Mode";
    clickBlip();
  });
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "AUDIO" || e.target.closest("audio")) return;
  if (e.target.tagName === "VIDEO" || e.target.closest("video")) return;
  clickBlip();
});

const vaultLock = document.getElementById("vault-lock");
const vaultSubmit = document.getElementById("vault-submit");
const vaultPassword = document.getElementById("vault-password");
const vaultError = document.getElementById("vault-error");

if (vaultLock) {
  vaultSubmit.addEventListener("click", () => {
    if (vaultPassword.value.trim().toUpperCase() === "PASSWORD") {
      vaultLock.style.display = "none";
      clickBlip(); // nice UI feedback
    } else {
      vaultError.style.opacity = 1;
      clickBlip();
    }
  });

  vaultPassword.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      vaultSubmit.click();
    }
  });
}

const menuToggle = document.getElementById("menuToggle");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");

menuToggle.addEventListener("click", () => {
  menuOverlay.classList.add("open");
  menuToggle.classList.add("hidden"); // hide hamburger
});

menuClose.addEventListener("click", () => {
  menuOverlay.classList.remove("open");
  menuToggle.classList.remove("hidden"); // show hamburger again
});
