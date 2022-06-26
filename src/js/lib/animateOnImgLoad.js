const animateOnImgLoad = () => {
  const animateElements = document.querySelectorAll(".animate-me");
  const fsbackground = document.getElementById("fsbackground");
  const img = fsbackground.querySelector("img");
  const animate = () => {
    Array.prototype.forEach.call(animateElements, (elem) => {
      elem.classList.add("animate");
    });
  };

  function waitForVisibililty() {
    const { visibilityState } = document;
    if (visibilityState === "visible") return animate();
    document.addEventListener("visibilitychange", animate, { once: true });
  }

  // window load
  // img load
  // visible
  window.onload = () => {
    if (img.complete) return waitForVisibililty();
    img.onload = () => waitForVisibililty();
  };
};

export default animateOnImgLoad;
