<?php
// Configurações de conexão ao banco de dados
$servername = "localhost: 3308";
$username = "root";
$password = "usbw";
$dbname = "teste empresa";

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Consulta para buscar informações das empresas
$sql = "SELECT curso FROM cursos";
$result = $conn->query($sql);

$cursos = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cursos[] = $row;
    }
}

// Fecha a conexão com o banco de dados
$conn->close();

// Retorna as informações das empresas como JSON
header("Content-Type: application/json");
echo json_encode($cursos);
?>
