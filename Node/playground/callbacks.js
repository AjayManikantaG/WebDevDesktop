/** @format */

const geoCode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0.5,
    };
    callback(data);
  }, 2000);
};

// geoCode('Ajay', (data) => {
//     console.log(data);
// });

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

function setPosts(post, callback) {
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 2000);
}

setPosts({ id: "4", post: "hi There 4" }, getPosts);
