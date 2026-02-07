// Load saved theme preference from local storage
function loadWindow() {
  let bodyElement = document.querySelector("body");

  let savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.querySelector("body").classList.add("dark-theme");
  }

  // Requests the browser to run this line of code after the page loads
  requestAnimationFrame(() => {
    bodyElement.classList.add("theme-transition"); // callback function
  });
}

let openThemeSound = new Audio("../audios/pokemon-open-theme.mp3");
let toggle = true;
function displaySound() {
  let volumeImg = document.querySelector("#sound");

  toggle = !toggle;

  if (toggle === true) {
    openThemeSound.pause();
    volumeImg.src = "../imgs/volume-mute.png";
  } else {
    openThemeSound.play();
    volumeImg.src = "../imgs/volume.png";
  }
}

function displayTheme(event) {
  event.preventDefault();
  let bodyElement = document.querySelector("body");
  bodyElement.classList.toggle("dark-theme");

  // Saving theme preference to local storage
  if (bodyElement.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// Dark theme preference
let psyduck = document.querySelector("#psyduck");
psyduck.addEventListener("click", displayTheme);

// Mute & Unmute
let sound = document.querySelector("#sound");
sound.addEventListener("click", displaySound);

// Reload eventListener
window.addEventListener("load", loadWindow);
