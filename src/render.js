async function displayPokemon(id) {
  const selectedPokemon = document.querySelector("#selected-pokemon");

  const pokemonData = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
  );
  const data = pokemonData.data;

  const speciesRes = await axios.get(data.species.url);
  const speciesData = speciesRes.data;

  const englishEntry = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  );

  const description = englishEntry
    ? englishEntry.flavor_text
    : "No description available.";

  let isMobile = window.innerWidth <= 1100;

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

  selectedPokemon.innerHTML = `
     <div class="display-pokemon">
        ${isMobile ? '<button class="close-button">X</button>' : " "}
          <img class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif" alt="${data.name}" />
          <div class="wrapper">
          <h3 class="n-degree">N° ${data.id}</h3>
          <h2 class="pokemon-name">${data.name}</h2>
          <br/>
          <span class="abilities">
                <span class="type-ability" style="background-color: ${colors[data.types[0].type.name]}">
                  ${data.types[0].type.name}
                </span>
                <span class="type-ability" style="background-color: ${colors[data.types[1]?.type.name] || ""}">
                  ${data.types[1] ? data.types[1].type.name : ""}
                </span>
          </span>
          <p>${description}</p>
          <div class="height-and-weight">
            <span>
              Height
              <br />
              <h4 class="height-weight">${data.height / 10}m</h4>          
            </span>

            <span class="weight">
              Weight
              <br/>
              <h4 class="height-weight">${data.weight / 10}kg</h4>
            </span>
          </div>

          <div class="abilities-container">
          <h2>Abilities</h2>
          <div class="ability-info">       
            <h4 class="ability">${data.abilities[0].ability.name}</h4>
            <h4 class="ability">${data.abilities[1]?.ability.name || "N/A"}</h4>
          </div>
          </div>

          <div class="evolution-container">
            <h2>Evolution</h2>
            <div class="evolution-pokemon-container">
            <!-- Evolution images -->
              <a href="#"><img class="evolution-pokemon" src=""></a>
              <a href="#"><img class="evolution-pokemon" src=""></a>
              <a href="#"><img class="evolution-pokemon" src=""></a>
            </div>
            </div>
          </div>
  `;

  // Mobile close button
  if (isMobile) {
    selectedPokemon.classList.add("active");

    const closeBtn = selectedPokemon.querySelector(".close-button");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        selectedPokemon.classList.remove("active");
      });
    }
  }
}

async function getPokemon(response) {
  const pokemonElement = document.querySelector("#render-pokemon");

  let html = `<div class="pokemon-cards-container">`;

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
  axios.get("https://pokeapi.co/api/v2/pokemon?limit=all").then(getPokemon);
  pokemonElement.addEventListener("click", displayPokemon);
}

document
  .querySelector("#render-pokemon")
  .addEventListener("click", function (e) {
    const card = e.target.closest(".select-pokemon-card");
    if (!card) return;

    const id = card.dataset.id;

    displayPokemon(id);
  });

displayPokemonCards();
