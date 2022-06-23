const animateOnImgLoad = () => {
  const animateElements = document.querySelectorAll(".animate-me");
  const fsbackground = document.getElementById("fsbackground");
  const img = fsbackground.querySelector("img");
  const animate = () => {
    Array.prototype.forEach.call(animateElements, (elem) => {
      elem.classList.add("animate");
    });
  };

  img.onload = () => {
    const { visibilityState } = document;
    if (visibilityState === "visible") return animate();
    document.addEventListener("visibilitychange", animate, { once: true });
  };
};

export default animateOnImgLoad;
