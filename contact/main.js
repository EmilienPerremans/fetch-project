// Ajoutez cette fonction à main.js
function createAndSubmitForm() {
    const formHtml = `
      <form id="contactForm">
        <input type="text" name="name" placeholder="Votre nom"  />
        <div id="error-name"></div>
        <br>
        <input type="email" name="email" placeholder="Votre email"  />
        <div id="error-email"></div>
        <br>
        <textarea name="message" placeholder="Votre message" ></textarea>
        <div id="error-message"></div>
        <br>
        <button type="submit">Envoyer</button>
      </form>
    `;
    document.querySelector("#app").innerHTML += formHtml;
  
    document.querySelector("#contactForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      const response = await fetch("http://localhost/2.JavaScript-Thibault/fetch-project/api/submitContact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

  
    if(response.status === 422){
      const errors = await response.json();
      for(const key in errors){
        let errorMessage = errors[key];
        let errorDiv = document.querySelector(`#error-${key}`);
        errorDiv.innerHTML = errorMessage;
        errorDiv.style.color = "red"; 
        if(errorMessage === "Le champ est valide"){
          errorDiv.style.color = "green";
        }
    }
    }else{
      alert("message envoyé")
      e.target.reset();
    }

  });
}
    
  createAndSubmitForm();