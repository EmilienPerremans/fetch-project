document.addEventListener('DOMContentLoaded', () => {
    const produitsList = document.getElementById('liste-produits');

    function afficherProduits() {
        fetch('storage/articles.json') // Chemin relatif vers votre fichier JSON
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                const produits = data.produits;

                produits.forEach(produit => {
                    const listItem = document.createElement('li');

                    const details = `
                        <div>
                            <strong>${produit.nom}</strong><br>
                            <span>Description: ${produit.description}</span><br>
                            <span>Prix: ${produit.prix} €</span><br>
                            <img src="${produit.image}" alt="${produit.nom}" style="max-width: 200px;">
                        </div>
                        <br>
                    `;

                    listItem.innerHTML = details;
                    produitsList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    }

    // Appel de la fonction pour afficher les produits au chargement du DOM
    afficherProduits();
});
