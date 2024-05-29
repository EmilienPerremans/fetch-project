function afficherPersonnel() {
    const listeEmployes = document.getElementById('employer');

    fetch('/storage/colaborateur.json')
        .then(response => {
            if (!response.ok) {
                console.error('Erreur réseau lors de la récupération des données');
                return;
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.personnel) {
                console.error('Les données du personnel sont incorrectes ou manquantes');
                return;
            }

            const personnel = data.personnel;

            personnel.forEach(personne => {
                const item = document.createElement('li');

                const details = `
                    <strong>${personne.nom}</strong> (${personne.poste})<br>
                    <span>Âge: ${personne.âge}</span><br>
                    <span>Email: ${personne.email}</span><br>
                    <span>Téléphone: ${personne.téléphone}</span><br>
                    <br>
                `;

                item.innerHTML = details;
                listeEmployes.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
}

// Appel de la fonction lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    afficherPersonnel();
});
