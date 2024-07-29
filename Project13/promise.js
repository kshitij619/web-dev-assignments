let sum = new Promise(function(resolve, reject) {
    // let addition = 1 + 1;

    setTimeout(() => {
        reject('timeout completed');
    }, 3000)
    
})



// sum.then(function(result) {
//     console.log(result);
// }).catch(function() {
//     console.log('failed');
// })

// async - await keywords

async function handle() {
    try {
        let result = await sum;
        console.log(result);
        console.log('Sum process will start');
    } catch {
        console.log('failed')
    }

    
}

handle();



console.log('Sum process completed');