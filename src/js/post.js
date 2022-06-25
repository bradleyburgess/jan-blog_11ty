(() => {
  const shareList = document.getElementById("share-buttons-list");
  const shareButton = document.getElementById("share-buttons-button");
  const title = document.getElementById("post-title").textContent;
  const text = 'A blog post at "This Blog Is About You"';

  if (window.navigator.share) {
    shareList.style.display = "none";
    shareButton.style.display = "block";
    shareButton.onclick = () => {
      navigator.share({
        title,
        text,
        url: window.location.href,
      });
    };
  }
})();
