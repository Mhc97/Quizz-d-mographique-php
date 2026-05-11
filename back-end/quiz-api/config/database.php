<?php
class Database {
    private $host = "localhost";
    private $dbname = "coursmysql";
    private $username = "root";
    private $password = "";
    private $conn;

    public function getConnection(){
        $this->conn = null;
        try{
            $this->conn = new PDO("mysql:host={$this->host};dbname={$this->dbname}", 
            $this->username, 
            $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        }catch(PDOException $e){
            echo json_encode(["error"=>"Erreur de connexion : ". $e->getMessage()]);
            exit;
        }
        return $this->conn;
    }

}
?>