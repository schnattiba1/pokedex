function filterPokemonByName(event) {
  //event.preventDefault();
  const search = event.target.value.trim().toLowerCase();
  const cards = document.querySelectorAll(".select-pokemon-card");

  cards.forEach((card) => {
    const name = card.querySelector("h3").innerText.toLowerCase();

    if (name.includes(search)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

function searchBtn(event) {
  event.preventDefault();
  const input = document.querySelector("#input");
  const fakeEvent = { target: input };
  filterPokemonByName(fakeEvent);

  console.log("This button works!");
}

async function displayPokemon(id) {
  const selectedPokemon = document.querySelector("#selected-pokemon");

  const pokemonData = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
  );
  const data = pokemonData.data;

  const speciesData = await axios.get(data.species.url);
  const pokemonDescriptionData = speciesData.data;

  const englishEntry = pokemonDescriptionData.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  );

  // Replace form feed characters with spaces for better readability
  const description = englishEntry
    ? englishEntry.flavor_text.replace(/\f/g, " ")
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

  const imgSrcGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
  const imgSrcPng = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${id}.png`;

  const imgExist = true;

  const existImg = imgExist ? imgSrcGif : imgSrcPng;

  let evolutionRes = await axios.get(speciesData.data.evolution_chain.url);
  let evolutionHTML = "";
  let currentEvolution = evolutionRes.data.chain;

  while (currentEvolution) {
    const name = currentEvolution.species.name;

    // Take the URL and extract the Pokémon ID from the end
    const evoId = currentEvolution.species.url.split("/").filter(Boolean).pop();

    const gifUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${evoId}.gif`;

    evolutionHTML += `
    <a href="#" onclick="displayPokemon(${evoId})">
      <img class="evolution-pokemon" src="${gifUrl}"  onerror="this.onerror=null; this.src='${imgSrcPng}'" alt="${name}">
    </a>
  `;

    currentEvolution = currentEvolution.evolves_to[0];
  }

  selectedPokemon.innerHTML = `
     <div class="display-pokemon">
        ${isMobile ? '<button class="close-button">X</button>' : " "}
          <img class="pokemon-img"  src="${existImg}" onerror="this.onerror=null; this.src='${imgSrcPng}'" alt="${data.name}" />
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
              ${evolutionHTML}
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

// Infinite scrolling
const limit = 500; // How many to fetch each time
let offset = 0; // Where we are in the list
let isLoading = false; // Prevents multiple requests

function fetchPokemon() {
  if (isLoading) return;

  isLoading = true;

  axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => {
      renderPokemon(response);
      offset += limit; // move to next page
      isLoading = false;
    });
}

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  // If the user is near the bottom
  if (scrollTop + windowHeight >= fullHeight - 50) {
    fetchPokemon();
  }
});

async function getPokemon(response) {
  const pokemonElement = document.querySelector("#render-pokemon");

  let html = `<div class="pokemon-cards-container">`;

  response.data.results.forEach((pokemon, index) => {
    const id = index + 1;
    //const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    const imgSrcPng = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    html += `
      <div class="select-pokemon-card" data-id="${id}">
        <img 
         src="${imgSrcPng}"
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

function renderPokemon(response) {
  let pokemonElement = document.querySelector("#render-pokemon");
  pokemonElement.addEventListener("click", displayPokemon);

  const container = document.querySelector(".pokemon-cards-container");
  let html = `<div class="pokemon-cards-container">`;

  response.data.results.forEach((pokemon, index) => {
    const id = offset + index + 1;

    const card = document.createElement("div");
    card.classList.add("select-pokemon-card");
    card.setAttribute("data-id", id);

    const imgSrcPng = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    card.innerHTML = `
      <img class="pokemon-png" src="${imgSrcPng}" />
      <div class="select-pokemon-card-content">
        <span>N° ${id}</span>
        <h3>${pokemon.name}</h3>
      </div>
    `;

    container.appendChild(card);
  });
}

let inputElement = document.querySelector("#input");
inputElement.addEventListener("input", filterPokemonByName);

let btnSearch = document.querySelector("#btn-search");
btnSearch.addEventListener("click", searchBtn);

document
  .querySelector("#render-pokemon")
  .addEventListener("click", function (e) {
    const card = e.target.closest(".select-pokemon-card");
    if (!card) return;

    const id = card.dataset.id;

    displayPokemon(id);
  });

fetchPokemon();
