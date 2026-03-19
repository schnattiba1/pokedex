function displayPokemon() {
  let selectedPokemon = document.querySelector("#selected-pokemon");

  // Checking if selectedPokemon element exists
  if (selectedPokemon) {
    let isMobile = window.innerWidth <= 1100;
    selectedPokemon.innerHTML = `
      <div class="display-pokemon">
        ${isMobile ? '<button class="close-button">X</button>' : ""}
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
              <br />
              <h4 class="height-weight">1.7m</h4>          
            </span>

            <span class="weight">
              Weight
              <br/>
              <h4 class="height-weight">90.5kg</h4>
            </span>
          </div>

          <div class="abilities-container">
          <h2>Abilities</h2>
          <div class="ability-info">       
            <h4 class="ability">Blaze</h4>
            <h4 class="ability">Solar Power</h4>
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
    if (isMobile) {
      selectedPokemon.classList.add("active");

      // Add close button functionality
      const closeBtn = selectedPokemon.querySelector(".close-button");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          selectedPokemon.classList.remove("active");
        });
      }
    }
  }
}

function getPokemon(response) {
  const pokemonElement = document.querySelector("#render-pokemon");

  let html = "";

  response.data.results.forEach((pokemon, index) => {
    const id = index + 1;
    html += `
      <div class="select-pokemon-card" data-id="${id}">
        <img 
         src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"
        />
        <div class="select-pokemon-card-content">
          <span>N° ${id}</span>
          <h3>${pokemon.name}</h3>
        </div>
      </div>
    `;
  });

  pokemonElement.innerHTML = html;
}

function displayPokemonCards() {
  let pokemonElement = document.querySelector("#render-pokemon");
  //axios.get("https://pokeapi.co/api/v2/ability?limit=1000").then(getCard);
  axios.get("https://pokeapi.co/api/v2/pokemon?limit=150").then(getPokemon);
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
  }
  pokemonElement.addEventListener("click", displayPokemon);
}

// Create the element if it doesn't exist
if (!document.querySelector("#selected-pokemon")) {
  const selectedPokemon = document.createElement("div");
  selectedPokemon.id = "selected-pokemon";
  document.body.appendChild(selectedPokemon);
}

const colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

displayPokemonCards();
