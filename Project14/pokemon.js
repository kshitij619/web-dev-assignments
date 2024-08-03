let pokeApi1 = fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100");
let pokeApi2 = fetch("https://pokeapi.co/api/v2/pokemon/?offset=100&limit=100");

// async function getRes(pokeApi) {
//   let result = await pokeApi;
//   let all = await result.json();
//   for (let pokemon of all.results) {
//     async function information() {
//       let info = await fetch(pokemon.url);
//       let pokeInfoAll = await info.json();

//       // image url
//       console.log(pokeInfoAll.sprites.other["official-artwork"].front_default);

//       // Id
//       console.log(`Id: ${pokeInfoAll.id}`);

//       // name
//       console.log(pokeInfoAll.name);

//       // console.log(pokeInfoAll);
//       // abilities
//       // pokeInfoAll.abilities.forEach((attribute, index) => {
//       //   console.log(`Ability ${index + 1}: ${attribute.ability.name}`);
//       // });
//       // type
//       pokeInfoAll.types.forEach((attribute, index) => {
//         console.log(`Type ${index + 1}: ${attribute.type.name}`);
//       });

//       console.log(" ");
//     }
//     information();
//   }
// }
// getRes(pokeApi1);
// getRes(pokeApi2);

class Pokemon {
  addPokemonToPage(currentPokemon) {
    const mainContent = document.querySelector(".content");
    let newPokemonDiv = document.createElement("div");
    newPokemonDiv.classList.add("box");
    newPokemonDiv.innerHTML = `
      <img class="pokemonImage" src="${currentPokemon.sprites.other["official-artwork"].front_default}" alt="${currentPokemon.name}" />
        <p class="pokemonTag">${currentPokemon.id}</p>
        <h2 class="pokemonName">${currentPokemon.name}</h2>
    `;

    const typeDiv = document.createElement("div");
    typeDiv.classList.add("typeDiv");
    currentPokemon.types.forEach((typeIs, index) => {
      let typeButton = document.createElement("button");
      typeButton.classList.add("type");
      typeButton.classList.add(typeIs.type.name);
      typeButton.innerText = `${typeIs.type.name}`;
      typeDiv.appendChild(typeButton);
    });
    newPokemonDiv.appendChild(typeDiv);

    mainContent.appendChild(newPokemonDiv);
  }

  async getResult(pokeApi) {
    try {
      let result = await pokeApi;
      let all = await result.json();
      for (let pokemon of all.results) {
        this.information(pokemon);
      }
    } catch {
      console.log("API fetch failed");
    }
  }
  async information(pokemon) {
    try {
      let info = await fetch(pokemon.url);
      let pokeInfoAll = await info.json();
      this.addPokemonToPage(pokeInfoAll);
    } catch {
      console.log("Failed " + pokemon);
    }
  }
}

let userA = new Pokemon();
userA.getResult(pokeApi1);
userA.getResult(pokeApi2);
