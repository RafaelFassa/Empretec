<?php
// Configurações de conexão ao banco de dados
include('../conexao/conn.php');

try {
    // Consulta para buscar informações das empresas
    $sql = "SELECT curso, codigo FROM cursos";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorna as informações das empresas como JSON
    header("Content-Type: application/json");
    echo json_encode($cursos);
} catch (PDOException $e) {
    echo "Erro na conexão com o banco de dados: " . $e->getMessage();
}
?>
