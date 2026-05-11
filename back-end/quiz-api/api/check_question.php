<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['questionId']) || !isset($input['selectedOption'])){
    echo json_encode(["correct" => false, "error" => "Données manquantes"]);
}

try {
    $pdo = new PDO('mysql:host=localhost;dname=pays;charset=utf8','root','');
    $stmt = $pdo->prepare('SELECT capital FROM pays WHERE id = ?');
    $stmt->execute([$input['questionId']]);
    $bonneReponse = $stmt->fetchColumn();

    $correct = ($input['selectionOption'] === $bonneReponse);
    echo json_encode(["correct" => $correct]);

}catch (PDOException $e){
    echo json_encode(["correct" => false, "error" => $e->getMessage()]);
}
?>