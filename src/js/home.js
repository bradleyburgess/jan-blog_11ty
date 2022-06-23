import animateOnImgLoad from "./lib/animateOnImgLoad";

(() => {
  document.querySelector(".tagline").classList.add(".faded-out");
  animateOnImgLoad();
})();
