let ctx = null;
function clickBlip() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.06);
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
      ? "Dark Mode"
      : "Light Mode";
    clickBlip();
  });
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "AUDIO" || e.target.closest("audio")) return;
  if (e.target.tagName === "VIDEO" || e.target.closest("video")) return;
  clickBlip();
});
