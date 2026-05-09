<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../config/database.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['pseudo']) || !isset($input['mode'])){
    echo json_encode(["correct" => false, "error" => "Données manquantes"]);
    exit;
}

$pseudo = htmlspecialchars($input['pseudo'], ENT_QUOTES, 'UTF-8');
$score = intval($input['score']);
$mode = htmlspecialchars($input['mode'], ENT_QUOTES, 'UTF-8');
try{
    $database = new Database();
    $pdo = $database->getConnection();

    $sql = "INSERT INTO scores (pseudo, score, mode) VALUES (:psuedo, :score, :mode)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['pseudo' => $pseudo, 'score' => $score, 'mode' => $mode]);


    echo json_encode(["success" => true]);
}catch (Exception $e){
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>