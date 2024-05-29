<?php

header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$erreurs = [];

// Valider si le champ 'name' est présent et non vide
$erreurs = validerEstValide("name", $data, $erreurs);
// Valider si le champ 'email' est présent et non vide
$erreurs = validerEstValide("email", $data, $erreurs);
// Valider si le champ 'message' est présent et non vide
$erreurs = validerEstValide("message", $data, $erreurs);


// Valider la taille maximale du champ 'name' (100 caractères)
$erreurs = validerTaille("name", $data, $erreurs, 100);
// Valider la taille maximale du champ 'email' (100 caractères)
$erreurs = validerTaille("email", $data, $erreurs, 100);
// Valider la taille maximale du champ 'message' (1000 caractères)
$erreurs = validerTaille("message", $data, $erreurs, 1000);






if(count($erreurs) > 0) {
    http_response_code(422);
    echo json_encode($erreurs);
} else {
    $contacts = json_decode(file_get_contents('../storage/contacts.json'), true);
    $contacts[] = $data;
    file_put_contents('../storage/contacts.json', json_encode($contacts));
    echo json_encode(['success' => true]);
}

function validerEstValide(string $nomChamp, array $data, array $erreurs) {
    if(!isset($data[$nomChamp]) || strlen($data[$nomChamp]) <= 0) {
        $erreurs[$nomChamp] = "Le champ $nomChamp est obligatoire";
    }
    else{
        $erreurs[$nomChamp] = "Le champ $nomChamp est valide";
    }
    return $erreurs; // Retourne le tableau d'erreurs mis à jour
}

function validerTaille(string $nomChamp, array $data, array $erreurs, int $max) {
    if(isset($data[$nomChamp]) && strlen($data[$nomChamp]) > $max) {
        $erreurs[$nomChamp] = "Le champ $nomChamp ne doit pas dépasser $max caractères";
    }
    return $erreurs; // Retourne le tableau d'erreurs mis à jour
}


