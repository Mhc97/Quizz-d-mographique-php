<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit;
}

require_once '../config/database.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['questionId']) || !isset($input['selectedOption'])){
    echo json_encode(["correct" => false, "error" => "Données manquantes"]);
    exit;
}

try{
    $database = new Database();
    $pdo = $database->getConnection();

    $stmt = $pdo->prepare("SELECT capital FROM pays WHERE id = ?");
    $stmt->execute([$input['questionId']]);
    $bonneReponse = $stmt->fetchColumn();

    $correct = ($input['selectedOption'] === $bonneReponse);
    echo json_encode(["correct" => $correct]);
}catch (Exception $e){
    echo json_encode(["correct" => false, "error" => $e->getMessage()]);
}
?>