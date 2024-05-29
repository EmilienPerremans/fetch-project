import { nav } from "/components/nav";
import "/style.css";

async function fetchPosts() {
  const id = new URL(window.location).searchParams.get("id");
  console.log(id);

  const response = await fetch(`http://localhost/fetch/api/post.php?id=${id}`);

  const post = await response.json();

  document.querySelector("#app").innerHTML`
   
  ${nav};

  <article>
      <h1>${post.title}</h1>
      <p>${post.content}</p>
  </article>
  
  `;
}

fetchPosts();