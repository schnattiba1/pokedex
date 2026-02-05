let toggle = true;

function displaySound(event) {
  event.preventDefault();

  let sound = document.querySelector("#sound");

  let openThemeSound = new Audio("../audios/pokemon-open-theme.mp3");
  openThemeSound.play();

  toggle = !toggle;

  if (toggle) {
    soundImg.src = "../imgs/volume.png";
    openThemeSound.play();
  } else {
    openThemeSound.pause();
    soundImg.src = "../imgs/volume-mute.png";
  }
}

function displayTheme() {
  let bodyElement = document.querySelector("body");
  bodyElement.classList.toggle("dark-theme");
}

// Dark theme preference
let psyduck = document.querySelector("#psyduck");
psyduck.addEventListener("click", displayTheme);

// Mute & Unmute
/*let sound = document.querySelector("#sound");
sound.addEventListener("click", displaySound);*/
