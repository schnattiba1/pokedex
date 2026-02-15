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

let openThemeSound = new Audio("../audios/route-101.mp3");
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

// Pikachu sound effect
function pikaPika(event) {
  event.preventDefault();

  let pikachuSoundEffect = new Audio("../audios/pikachu-sound-effect.mp3");

  if (pikachuSoundEffect) {
    pikachuSoundEffect.play();
    isPlaying = true;

    // Reset flag when audio finishes
    pikachuSoundEffect.onended = function () {
      isPlaying = false;
    };
  }
}

function displayPokemon() {
  let pokemonElement = document.querySelector("#pokemon");
  //let selectedPokemon = document.querySelector("#selected-pokemon");
  if (pokemonElement) {
    let selectedPokemon = document.querySelector("#selected-pokemon");
    selectedPokemon.innerHTML = `
      <div class="display-pokemon">
          <img class="pokemon-img" src="./imgs/charizard.gif" alt="Charizard" />
          <br/> 
          <br/>
            <h3 class="n-degree">N° 6</h3>
          <h2 class="pokemon-name">Charizard</h2>
          <br/>
          <span class="abilities">
                <span class="type-ability" style="background-color: #85aeff">
                  Flying
                </span>
                <span class="type-ability" style="background-color: #ff6b52">
                  Fire
                </span>
          </span>
          <p>Spits fire that is hot enough to melt boulders. known to cause forest fires unintentionally.</p>
            <div class="width-height-container">
            <div class="width">
            <h2>Width</h2>
            </div>

             <div class="height">
            <h2>Height</h2>
            </div>
          </div>
          </div>
    `;
  }
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

let pokemonElement = document.querySelector("#pokemon");
pokemonElement.addEventListener("click", displayPokemon);
