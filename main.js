import "/style.css";
import { nav } from "./components/nav";


async function fetchPosts() {
let url = new URL(import.meta.env.VITE_API_URL);
url.pathname = "/api/posts.php";

const response = await fetch(url);
  

  const posts = await response.json();

  document.querySelector("#app").innerHTML = `
  ${nav}
    <div>
      <h1>Posts</h1>
      ${posts
        .map(
          (post) => `<article> 
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        </article>`
        )
        .join("")}
    </div>
  `;
}

fetchPosts();


