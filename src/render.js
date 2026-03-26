function filterPokemonByName(event) {
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

  // checks if the user's device size is less than or equal -> 1100
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

    const imgSrcPng = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`;

    evolutionHTML += `
    <a onclick="displayPokemon(${evoId})">
      <img class="evolution-pokemon" src="${imgSrcPng}"  alt="${name}">
    </a>
  `;

    if (currentEvolution.evolves_to.length > 0) {
      currentEvolution = currentEvolution.evolves_to[0];
    } else {
      currentEvolution = null;
    }
  }

  selectedPokemon.innerHTML = `
     <div class="display-pokemon">
        ${isMobile ? '<button id="close-btn" class="close-button">X</button>' : " "}
          <img class="pokemon-img"  src="${existImg}" onerror="this.onerror=null; this.src='${imgSrcPng}'" alt="${data.name}" />
          <div class="wrapper">
          <h3 class="n-degree">N° ${data.id}</h3>
          <h2 class="pokemon-name">${data.name}</h2>
          
          <span class="abilities">
                <span class="type-ability" style="background-color: ${colors[data.types[0].type.name]}">
                  ${data.types[0].type.name}
                </span>
                <span class="type-ability" style="background-color: ${colors[data.types[1]?.type.name] || ""}">
                  ${data.types[1] ? data.types[1].type.name : ""}
                </span>
          </span>
          <span class="description-pokemon">${description}</span>
          <div class="height-and-weight">
            <span>
              <h2 class="h2-height">Height</h2>
              <h4 class="height-weight">${data.height / 10}m</h4>          
            </span>

            <span class="weight">
              <h2 class="h2-weight">Weight</h2>
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
const limit = 20; // How many to fetch each time
let offset = 0; // Where we are in the list
let isLoading = false; // Prevents multiple requests
let hasError = false;
let lastScrollTop = 0; // Sets the scroll position back to 0

function fetchPokemon() {
  if (isLoading || hasError) return;

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
  lastScrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  // If the user is near the bottom
  if (window.scrollY + windowHeight >= fullHeight - 50) {
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
         data-src="${imgSrcPng}"
         onerror="this.onerror=null; this.src='${imgSrcPng}'"
        />
        <div class="select-pokemon-card-content">
          <h3>${pokemon.name}</h3> 
        </div>
      </div>
      `;
  });

  pokemonElement.innerHTML = html;
}

function renderPokemon(response) {
  const container = document.querySelector(".pokemon-cards-container");

  response.data.results.forEach((pokemon, index) => {
    const id = offset + index + 1;

    const card = document.createElement("div");
    card.classList.add("select-pokemon-card");
    card.setAttribute("data-id", id);

    const imgSrcPng = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    const img = new Image();
    img.src = imgSrcPng;

    img.onload = async function () {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
        );
        const data = response.data;

        // Find the HP in the stats data
        const hpStat = data.stats.find((stat) => stat.stat.name === "hp");
        const hp = hpStat.base_stat;

        const maxHP = 255;
        const hpPercent = (hp / maxHP) * 100;

        let hpColor = "limegreen";
        if (hpPercent < 50) hpColor = "orange";
        if (hpPercent < 20) hpColor = "red";

        card.innerHTML = `
          <img class="pokemon-png" src="${imgSrcPng}" />
          <div class="select-pokemon-card-content">
            <h3>${pokemon.name}</h3>

            <div class="hp-container">
              <div class="hp-bar" style="width:${hpPercent}%; background:${hpColor};"></div>
            </div>
          </div>
        `;

        container.appendChild(card);
      } catch (err) {
        console.error("HP fetch failed", err);
      }
    };

    img.onerror = function () {
      hasError = true;
    };
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
