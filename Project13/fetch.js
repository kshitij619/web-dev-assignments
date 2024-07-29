var promiseResult = fetch('https://jsonplaceholder.typicode.com/todos/1');

promiseResult.then(function(result) {
    console.log(result)
    return result.json();
})

.then(function(result) {
    console.log(result)
})

async function getResults() {
    let result = await promiseResult;
    let json = await result.json();

    console.log(json)
}

getResults();