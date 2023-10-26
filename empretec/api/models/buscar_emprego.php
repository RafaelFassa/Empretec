<?php
// Configurações de conexão ao banco de dados
include('../conexao/conn.php');

try {
    // Obter o código do emprego da URL usando o método GET
    $codigo = $_GET['codigo'];

    // Consulta para buscar informações do emprego com base no código
    $sql = "SELECT nome_do_cargo, periodo, vagas_disponiveis, salario, plano_saude, cesta_basica, descricao, email_contato FROM empregos WHERE codigo = :codigo";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':codigo', $codigo, PDO::PARAM_INT);
    $stmt->execute();

    $emprego = $stmt->fetch(PDO::FETCH_ASSOC);

    // Retorna as informações do emprego como JSON
    header("Content-Type: application/json");
    echo json_encode($emprego);
} catch (PDOException $e) {
    echo "Erro na conexão com o banco de dados: " . $e->getMessage();
}
?>
