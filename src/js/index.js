(() => {
  const headerLogo = document.getElementById("header-logo");
  const headerDot = headerLogo.querySelector(".fancy-dot");
  headerLogo.addEventListener("mouseover", () => {
    headerLogo.classList.add("hover-animation");
  });
  headerDot.addEventListener("animationend", () => {
    headerLogo.classList.remove("hover-animation");
  });
})();
