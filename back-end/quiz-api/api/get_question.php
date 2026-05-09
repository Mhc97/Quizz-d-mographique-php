<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
ini_set('diplay_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ .'../config/database.php';

try{
    $database = new Database();
    $pdo = $database->getConnection();

    // pour choisr un pays au hasard 
    $stmt = $pdo->query("SELECT id, name, capital FROM pays ORDER BY RAND() LIMIT 1");
    $pays = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$pays){
        throw new Exception("Aucun pays trouvé");
    }

    $bonneReponse = $pays['capital'];
    $paysId = $pays['id'];
    $nomPays = $pays['name'];

    // Récupérer 3 autres capitales aléatoires
    $stmtAutres = $pdo->prepare("SELECT capital FROM pays WHERE id != :id ORDER BY RAND() LIMIT 3");
    $stmtAutres->execute(['id' => $paysId]);
    $autresCapitales = $stmtAutres->fetchAll(PDO::FETCH_COLUMN);

    // Construire les options
    $options = array_merge([$bonneReponse], $autresCapitales);
    shuffle($options);

    // Retourner la question
    $data = [
        "id" => $paysId,
        "texte" => "Quelle est la capitale de $nomPays ?",
        "oprions" => $options,
        "bonne_reponse" => $bonneReponse
    ];

    echo json_encode($data);

}catch (Exception $e){
    echo json_encode(["error" => $e->getMessage()]);
}
?>