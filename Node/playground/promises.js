/** @format */

const posts = [
  { id: "1", post: "hi There 1" },
  { id: "1", post: "hi There 2" },
  { id: "1", post: "hi There 3" },
];

function getPosts() {
  let output = "";
  setTimeout(() => {
    posts.forEach((post) => {
      output += `<li>${post.post}</li>\n`;
    });
    console.log(output);
  }, 1000);
}

function setPosts(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      const error = true;
      if (!error) {
        resolve();
      } else {
        reject(new Error("User Not Logged In"));
      } 
    }, 2000);
  });
}

setPosts({ id: "4", post: "hi There 4" })
  .then(getPosts)
  .catch((err) => console.log(err));
