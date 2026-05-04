<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Appel à l'API Shadify pour une question sur les capitales
$apiUrl = "https://shadify.yurace.pro/api/countries/capital-quiz?variants=4&amount=1";
$reponse = file_get_contents($apiUrl);
echo $reponse;
?>