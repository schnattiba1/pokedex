function displayTheme(event) {
  event.preventDefault();

  const htmlElement = document.documentElement;
  htmlElement.classList.toggle("dark-theme");

  if (htmlElement.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

let openThemeSound = new Audio("../audios/little-town.mp3");
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

function pikaPika(event) {
  event.preventDefault();

  let pikachuSoundEffect = new Audio("../audios/pikachu-sound-effect.mp3");
  pikachuSoundEffect.play();
}

// Dark theme preference
let psyduck = document.querySelector("#psyduck");
psyduck.addEventListener("click", displayTheme);

// Mute & Unmute
let sound = document.querySelector("#sound");
sound.addEventListener("click", displaySound);

// Reload eventListener
window.addEventListener("load", () => {
  document.documentElement.classList.add("theme-transition");
});

let pixelPikachu = document.querySelector("#pixel-pikachu");
pixelPikachu.addEventListener("click", pikaPika);
