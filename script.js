"use strict";

const navigation = document.querySelector(".navigation");
const menuButton = document.querySelector(".menu-toggle");
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "Close" : "Menu";
    navigation.classList.toggle("is-open", open);
  });
  navigation.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
      navigation.classList.remove("is-open");
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
      navigation.classList.remove("is-open");
      menuButton.focus();
    }
  });
}

const video = document.querySelector("#secondlook-video");
const playButton = document.querySelector(".video-start");
const videoStatus = document.querySelector("#video-status");
if (video && playButton) {
  playButton.addEventListener("click", async () => {
    playButton.disabled = true;
    try {
      await video.play();
      playButton.hidden = true;
      if (videoStatus) videoStatus.textContent = "Playing the complete 4:52 narrated prototype walkthrough.";
    } catch {
      if (videoStatus) videoStatus.textContent = "The browser could not start the video. Use the MP4 download link below to watch it locally.";
    } finally {
      playButton.disabled = false;
    }
  });
  video.addEventListener("play", () => { playButton.hidden = true; });
  video.addEventListener("pause", () => {
    if (videoStatus && !video.ended) videoStatus.textContent = "Video paused. Use the player controls to continue the narrated walkthrough.";
  });
  video.addEventListener("ended", () => {
    playButton.hidden = false;
    if (videoStatus) videoStatus.textContent = "End of the narrated walkthrough. Play it again or explore the source and evaluation.";
  });
  video.addEventListener("error", () => {
    if (videoStatus) videoStatus.textContent = "The video could not load. The complete narrated MP4 is available through the download link below.";
  });
}
