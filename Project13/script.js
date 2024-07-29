let posts = fetch("https://jsonplaceholder.typicode.com/posts");

let signUpForm = document.querySelector(".signUpDiv");
let loginForm = document.querySelector(".loginDiv");
let mainSection = document.querySelector(".mainSection");
let loginSection = document.querySelector(".loginSection");

document
  .querySelector(".loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

/*
 * Event Listener to show "sign up page" and hide "login page"
 */
document.querySelector("#signUp").addEventListener("click", function () {
  signUpForm.classList.remove("hide");
  loginForm.classList.add("hide");
});

/*
 * Event Listener to show "login page" and hide "sign up page"
 */
document.querySelector("#login").addEventListener("click", function () {
  loginForm.classList.remove("hide");
  signUpForm.classList.add("hide");
});

class User {}

class PostFunctions {
  addPost(userId, id, title, body) {
    let postArea = document.querySelector(".mainContent");
    let newPost = document.createElement("div");
    newPost.classList.add("post");
    newPost.innerHTML = `
        <span class="userDetails">
            <img class="userIcon" src="./images/profile.png" alt="User Icon" />
            <p class="username">user_${userId}</p>
            <img class="icon" src="./images/more.png" alt="Options" />
          </span>
          <h2 class="postTitle">${title}</h2>
          <p class="postContent">${body}</p>
          <div class="postActions">
            <span class="comments">
              <img class="icon" src="./images/comment.png" alt="" />
            </span>
            <span class="retweet">
              <img class="icon" src="./images/retweet.png" alt="" />
            </span>
            <span class="like">
              <img class="icon" src="./images/heart.png" alt="" />
            </span>
            <span class="share">
              <img class="icon" src="./images/share.png" alt="" />
            </span>
            <span class="save">
              <img class="icon" src="./images/save.png" alt="" />
            </span>
          </div>
        `;

    postArea.appendChild(newPost);
  }

  async retrieve() {
    let result = await posts;
    let finalResults = await result.json();
    let userId;
    let id;
    let title;
    let body;
    for (let item of finalResults) {
      for (let element in item) {
        if (element === "userId") {
          userId = item.userId;
        }
        if (element === "id") {
          id = item.id;
        }
        if (element === "title") {
          title = item.title;
        }
        if (element === "body") {
          body = item.body;
        }
      }
      this.addPost(userId, id, title, body);
    }
  }
}

let p = new PostFunctions();

p.retrieve();
