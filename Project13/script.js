// let postResult = fetch("https://jsonplaceholder.typicode.com/posts");
// let allPostsArray;
// let p1;

// async function getPosts() {
//   let result = await fetch("https://jsonplaceholder.typicode.com/posts");
//   allPostsArray = await result.json();
// }
// getPosts();
let promiseResult = fetch("https://jsonplaceholder.typicode.com/posts");
// class AllPosts {
//   view() {
//     console.log(allPostsArray);
//   }
// }

// let c1 = new AllPosts();

// c1.view();
console.log(promiseResult);
// console.log(c1.allPostsArray);
