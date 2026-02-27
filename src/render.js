function displayPokemon() {
  let selectedPokemon = document.querySelector("#selected-pokemon");
  selectedPokemon.innerHTML = `
      <div class="display-pokemon">
          <img class="pokemon-img" src="./imgs/charizard.gif" alt="Charizard" />
          
          <div class="wrapper">
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
          <div class="height-and-weight">
            <span>
              Height
              <br/>
              <h4 class="height-width">1.7m</h4>          
            </span>

            <span class="width">
              Width
              <br/>
              <h4 class="height-width">90.5kg</h4>
            </span>
          </div>

          <div class="abilities-container">
          <h2>Abilities</h2>
          <div class="ability-info">
            <h4 class="ability">1.7m</h4>         
            <h4 class="ability">90.5kg</h4>
          </div>
          </div>

          <div class="evolution-container">
            <h2>Evolution</h2>
            <div class="evolution-pokemon-container">
              <a href="#"><img class="evolution-pokemon" src="./imgs/charmander.webp"></a>
              <a href="#"><img class="evolution-pokemon" src="./imgs/charmeleon.png"></a>
              <a href="#"><img class="evolution-pokemon" src="./imgs/charizard.png"></a>
            </div>
            </div>
          </div>
    `;
}

function displayPokemonCards() {
  let pokemonElement = document.querySelector("#render-pokemon");
  if (pokemonElement) {
    pokemonElement.innerHTML = `
       <div class="select-pokemon-card" id="pokemon">
          <img src="./imgs/charizard.gif" alt="Charizard" />
          <div class="select-pokemon-card-content">
            <span class="span">N° 6</span>
            <h3>Charizard</h3>
            <span class="row">
              <div class="type-container" style="background-color: #85aeff">
                Flying
              </div>
              <div class="type-container" style="background-color: #ff6b52">
                Fire
              </div>
            </span>
          </div>
        </div>
    `;

    pokemonElement.addEventListener("click", displayPokemon);
  }
}
displayPokemonCards();

let pokemonElement = document.querySelector("#pokemon");
pokemonElement.addEventListener("click", displayPokemon);
