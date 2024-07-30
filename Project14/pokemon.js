let pokeApi = fetch("https://pokeapi.co/api/v2/pokemon/?limit=100");

async function getRes() {
  let result = await pokeApi;
  let all = await result.json();
  for (let pokemon of all.results) {
    let info = fetch(pokemon.url)
      .then(function (getIt) {
        return getIt.json();
      })
      .then(function (getIt) {
        console.log(pokemon.name);
        console.log(getIt);
      });
  }
}

getRes();
