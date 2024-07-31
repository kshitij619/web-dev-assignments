let pokeApi = fetch("https://pokeapi.co/api/v2/pokemon/?limit=9");

async function getRes() {
  let result = await pokeApi;
  let all = await result.json();
  for (let pokemon of all.results) {
    // async function information (){
    //   let info;
    // }

    let info = fetch(pokemon.url)
      .then(function (pokeInfoAll) {
        return pokeInfoAll.json();
      })
      .then(function (pokeInfoAll) {
        console.log(pokemon.name);
        console.log(pokeInfoAll);
        console.log("Abilities: ");
        console.log(pokeInfoAll.abilities);
      });
  }
}

getRes();
