<?php
// Configurações de conexão ao banco de dados
include('../conexao/conn.php');

try {
    // Consulta para buscar informações das empresas
    $sql = "SELECT nome_empresa, img_empresa, link_empresa FROM empresas";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $empresas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorna as informações das empresas como JSON
    header("Content-Type: application/json");
    echo json_encode($empresas);
} catch (PDOException $e) {
    echo "Erro na conexão com o banco de dados: " . $e->getMessage();
}
?>
