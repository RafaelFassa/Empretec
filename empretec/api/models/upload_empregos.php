<?php
// Configurações de conexão ao banco de dados
include('../conexao/conn.php');

try {
    // Consulta para buscar informações das empresas
    $sql = "SELECT nome_do_cargo, formacao_necessaria FROM empregos";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $empregos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorna as informações das empresas como JSON
    header("Content-Type: application/json");
    echo json_encode($empregos);
} catch (PDOException $e) {
    echo "Erro na conexão com o banco de dados: " . $e->getMessage();
}
?>
