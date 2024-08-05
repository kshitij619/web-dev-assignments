let pokeApi1 = fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50");

// let searchInformation = [
//   "normal",
//   "fighting",
//   "flying",
//   "poison",
//   "ground",
//   "rock",
//   "bug",
//   "ghost",
//   "steel",
//   "fire",
//   "water",
//   "grass",
//   "electric",
//   "psychic",
//   "ice",
//   "dragon",
//   "dark",
//   "fairy",
// ];
// Initial API call to print all pokemons on the page which is called when the page is loaded
let searchInformation = [];

async function getResult() {
  try {
    let result = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000"
    );
    let all = await result.json();

    for (let pokemon of all.results) {
      this.information(pokemon);
    }
  } catch {
    console.log("API fetch failed");
  }
}

// Next API call to print all pokemons on the page
async function information(pokemon) {
  try {
    let info = await fetch(pokemon.url);
    let pokeInfoAll = await info.json();
    this.addPokemonToPage(pokeInfoAll);
  } catch {
    console.log("Failed " + pokemon);
  }
}

// To print all pokemon on the page
function addPokemonToPage(currentPokemon) {
  const mainContent = document.querySelector(".allPokemon");
  let newPokemonDiv = document.createElement("div");
  newPokemonDiv.classList.add("box");
  newPokemonDiv.id = `${currentPokemon.id}`;
  newPokemonDiv.innerHTML = `
  <img class="pokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png" alt="${currentPokemon.name}" />
  <p class="pokemonTag">#${currentPokemon.id}</p>
  <h2 class="pokemonName">${currentPokemon.name}</h2>
  `;

  const typeDiv = document.createElement("div");
  typeDiv.classList.add("typeDiv");
  currentPokemon.types.forEach((typeIs) => {
    let typeButton = document.createElement("button");
    typeButton.classList.add("type");
    typeButton.classList.add(typeIs.type.name);
    typeButton.innerText = `${typeIs.type.name}`;
    typeDiv.appendChild(typeButton);
  });
  newPokemonDiv.appendChild(typeDiv);

  mainContent.appendChild(newPokemonDiv);
  searchInformation.push(newPokemonDiv);
}

// Event listener to check which pokemon is clicked
document.addEventListener("click", (e) => {
  // console.log(e);
  let parent = e.target.parentElement;
  console.log("changing");
  checkPokemon(parent.id);
});

// 1st API call to print single pokemon's information
async function checkPokemon(foundId) {
  try {
    let result = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000"
    );
    let pokemonBase = await result.json();
    // console.log(pokemonBase);
    let url;
    pokemonBase.results.forEach((pokemon) => {
      checkEachPokemon(pokemon.url, foundId);
    });
  } catch {
    console.error("error");
  }
}
// 2nd API call to print single pokemon's information
async function checkEachPokemon(pokemon, foundId) {
  let pokemonInfo = await fetch(pokemon);
  let innerPokemon = await pokemonInfo.json();
  // console.log("hi");
  // console.log(innerPokemon);

  if (foundId == innerPokemon.id) {
    let url = pokemon;
    // console.log(innerPokemon);
    // console.log(url);
    printAllInformation(url);
  }
}

// Finally printing single pokemon's information
async function printAllInformation(url) {
  let result = await fetch(url);
  let currentPokemon = await result.json();

  let abi = [];
  currentPokemon.abilities.forEach((element) => {
    abi.push(element.ability.name);
  });

  let ty = [];
  currentPokemon.types.forEach((typeIs) => {
    ty.push(typeIs.type.name);
  });

  let everything = document.createElement("div");
  everything.classList.add("everything");
  let fullInfo = document.createElement("div");
  fullInfo.classList.add("fullInfo");
  fullInfo.innerHTML = `
  <div id="singleImage">
  <img class="infoImage"
  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png"
  alt="${currentPokemon.name}" />
  </div>
  <div id="singleInformation">
  <div id="onlyNameId">
  <h1 id="onlyName">${currentPokemon.name}</h1>
  <p id="onlyId">#${currentPokemon.id}</p>
  </div>
  <div id="onlyTypes">
  <h2>Types:</h2>
  <div>
  <button class="type ${ty[0]}">${ty[0]}</button>
  <button class="type ${ty[1]}">${ty[1]}</button>
  </div>
  </div>
  <div id="onlyAbilities">
  <h2>Abilities:</h2>
  <div>
  <p>${abi[0]}</p>
  <p>${abi[1]}</p>
  </div>
  </div>
  <div id="onlyWeight">
  <h2>Weight:</h2>
  <p>${currentPokemon.weight}</p>
  </div>
  <div id="onlyHeight">
  <h2>Height:</h2>
  <p>${currentPokemon.height}</p>
  </div>
  </div>
  <p id="close">x</p>
  `;

  everything.appendChild(fullInfo);
  document.querySelector("body").appendChild(everything);
  document.querySelector(".allPokemon").remove();

  // To close the opened pokemon's tab
  document.getElementById("close").addEventListener("click", () => {
    let someContent = document.createElement("section");
    someContent.classList.add("allPokemon");
    someContent.classList.add("content");
    document.querySelector("body").appendChild(someContent);

    // console.log("Changing");

    getResult();
    document.querySelector(".everything").remove();
  });
}

getResult();

document.querySelector("#searchBar").addEventListener("input", (e) => {
  const value = e.target.value;
  searchInformation.forEach((info) => {
    const isVisible = info.innerText.includes(value);
    info.classList.toggle("hide", !isVisible);
  });
});
