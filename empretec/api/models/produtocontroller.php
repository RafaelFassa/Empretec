<?php


include('../conexao/conn.php');


$requestData = $_REQUEST;


if($requestData['operacao'] == 'create'){
    if(empty($_REQUEST['curso'])){
        $dados = array(
            "type" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    }
    else {
        try{
        
            // gerar a querie de insersao no banco de dados
            $sql = "INSERT INTO CURSOS (curso) VALUES (?)"; // colocar ? para deixar mais seguro
            // preparar a querie para gerar objetos de insersao no banco de dados
    
            $stmt = $pdo->prepare($sql); // atribuindo para ver se existe
    
            // se existir requerir os valores
            $stmt->execute([
                $requestData['curso']
            ]);
    
            // tranforma os dados em um array
            $dados = array(
                'type' => 'success',
                'mensagem' => 'Registro salvo com sucesso!'
            );
            // se nao existir mostrar erro
        }catch (PDOException $e){
            $dados = array(
                'type' => 'error',
                'mensagem' => 'Erro ao salvar o registro:' .$e
            );
        }
    }


    echo json_encode($dados);




}


if($requestData['operacao'] == 'read'){
    $colunas = $requestData['columns']; //Obter as colunas vindas do resquest
    //Preparar o comando sql para obter os dados da categoria
    $sql = "SELECT * FROM CURSOS WHERE 1=1 ";
    //Obter o total de registros cadastrados
    $resultado = $pdo->query($sql);
    $qtdeLinhas = $resultado->rowCount();
    //Verificando se há filtro determinado
    $filtro = $requestData['search']['value'];
    if( !empty( $filtro ) ){
        //Montar a expressão lógica que irá compor os filtros
        //Aqui você deverá determinar quais colunas farão parte do filtro
        $sql .= " AND (codigo LIKE '$filtro%' ";
        $sql .= " OR curso LIKE '$filtro%') ";
    }
    //Obter o total dos dados filtrados
    $resultado = $pdo->query($sql);
    $totalFiltrados = $resultado->rowCount();
    //Obter valores para ORDER BY      
    $colunaOrdem = $requestData['order'][0]['column']; //Obtém a posição da coluna na ordenação
    $ordem = $colunas[$colunaOrdem]['data']; //Obtém o nome da coluna para a ordenação
    $direcao = $requestData['order'][0]['dir']; //Obtém a direção da ordenação
    //Obter valores para o LIMIT
    $inicio = $requestData['start']; //Obtém o ínicio do limite
    $tamanho = $requestData['length']; //Obtém o tamanho do limite
    //Realizar o ORDER BY com LIMIT
    $sql .= " ORDER BY $ordem $direcao LIMIT $inicio, $tamanho ";
    $resultado = $pdo->query($sql);
    $resultData = array();
    while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
        $resultData[] = array_map('utf8_encode', $row);
    }
    //Monta o objeto json para retornar ao DataTable
    $dados = array(
        "draw" => intval($requestData['draw']),
        "recordsTotal" => intval($qtdeLinhas),
        "recordsFiltered" => intval($totalFiltrados),
        "data" => $resultData
    );
    echo json_encode($dados);
}


if($requestData['operacao'] == 'update'){

    if(empty($_REQUEST['curso'])){
        $dados = array(
            "type" => 'error',
            "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
    }
    else {    
    try{

        $sql = "UPDATE CURSOS SET curso = ? WHERE codigo = ?";
        // preparar a querie para gerar objetos de insersao no banco de dados

        $stmt = $pdo->prepare($sql); // atribuindo para ver se existe

        // se existir requerir os valores
        $stmt->execute([
            $requestData['curso'],
            $requestData['codigo']
        ]);
    

        // tranforma os dados em um array
        $dados = array(
            'type' => 'success',
            'mensagem' => 'Atualizado com sucesso!'
        );
        // se nao existir mostrar erro
    }catch (PDOException $e){
        $dados = array(
            'type' => 'error',
            'mensagem' => 'Erro ao atualizar:' .$e
        );
    }
    }

    echo json_encode($dados);






}


if($requestData['operacao'] == 'delete'){

    try{


    
        // gerar a querie de insersao no banco de dados
        $sql = "DELETE FROM CURSOS WHERE codigo = ?";
        // preparar a querie para gerar objetos de insersao no banco de dados

        $stmt = $pdo->prepare($sql); // atribuindo para ver se existe

        // se existir requerir os valores
        $stmt->execute([
            $requestData['codigo']
        ]);

        // tranforma os dados em um array
        $dados = array(
            'type' => 'success',
            'mensagem' => 'Excluido com sucesso!'
        );
        // se nao existir mostrar erro
    }catch (PDOException $e){
        $dados = array(
            'type' => 'error',
            'mensagem' => 'Erro ao excluir o registro:' .$e
        );

    }

    echo json_encode($dados);




}


if($requestData['operacao'] == 'view'){

    // gerar a querie de insersao no banco de dados
    $sql = "SELECT * FROM CURSOS WHERE codigo = ".$requestData['codigo']."";
    // preparar a querie para gerar objetos de insersao no banco de dados


    $resultado = $pdo->query($sql);
    if($resultado){
    $result = array();
    while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
        $result = array_map('utf8_encode', $row);
    }
    $dados = array(
        'type' => 'view',
        'mensagem' => '',
        'dados' => $result
    );
    }
    else {
        $dados = array(
            'type' => 'error',
            'mensagem' => 'Erro ao abrir o registro:'
        );  
    }
echo json_encode($dados);




}
