function CRUD(dados, url) {
    $.ajax({
        dataType: 'JSON',
        type: 'POST',
        async: true,
        url: url,
        data: dados,
        success: function(dados) {
            if (dados.mensagem != '') {

                Swal.fire({
                    icon: dados.type,
                    title: 'EmpreTec',
                    text: dados.mensagem
                })
                $('#modal-fPagamento').modal('hide')
            } else if (dados.type == 'view') {
                $('#nome_do_cargo').val(dados.dados.nome_do_cargo)
                $('#periodo').val(dados.dados.periodo)
                $('#vagas_disponiveis').val(dados.dados.vagas_disponiveis)
                $('#salario').val(dados.dados.salario)
                $('#plano_saude').val(dados.dados.plano_saude)
                $('#cesta_basica').val(dados.dados.cesta_basica)
                $('#descricao').val(dados.dados.descricao)
                $('#email_contato').val(dados.dados.email_contato)
                $('#formacao_necessaria').val(dados.dados.formacao_necessaria)
                $('#codigo').val(dados.dados.codigo)
            }
        }
    })
}




$(document).ready(function() {

    $('#table-fPagamento').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "api/models/formadepagamentocontroller.php?operacao=read",
            "type": "POST"
        },
        "language": {
            "url": "assets/vendor/DataTables/pt-BR.json"
        },
        "order": [
            [0, "desc"]
        ],
        "columns": [{
                "data": 'codigo',
                "className": 'text-center'
            },
            {
                "data": 'nome_do_cargo',
                "className": 'text-left'
            },
            {
                "data": 'periodo',
                "className": 'text-left'
            },
            {
                "data": 'vagas_disponiveis',
                "className": 'text-left'
            },
            {
                "data": 'salario',
                "className": 'text-left'
            },
            {
                "data": 'plano_saude',
                "className": 'text-left'
            },
            {
                "data": 'cesta_basica',
                "className": 'text-left'
            },
            {
                "data": 'descricao',
                "className": 'text-left'
            },
            {
                "data": 'email_contato',
                "className": 'text-left'
            },
            {
                "data": 'formacao_necessaria',
                "className": 'text-left'
            },
            {
                "data": 'codigo',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    return `
                    <button id="${data}" class="btn btn-info btn-sm btn-view">Visualizar</button>
                    <button id="${data}" class="btn btn-primary btn-sm btn-edit">Editar</button>
                    <button id="${data}" class="btn btn-danger btn-sm btn-delete">Excluir</button>
                    `
                }
            }
        ]
    })




    $('.btn-new').click(function(e) {
        e.preventDefault()
        $('.modal-title').empty()
        $('.modal-title').append('Cadastro de Empregos')
        $('#form-fPagamento :input').val('')
        $('.btn-save').show()
        $('.btn-save').attr('data-operation', 'create')
        $('#modal-fPagamento').modal('show')
        $('input').prop('disabled', false)
    })
    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-fPagamento').serialize()
        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        let url = 'api/models/formadepagamentocontroller.php'

        CRUD(dados, url)

        $('#table-fPagamento').DataTable().ajax.reload()
    })

    $('#table-fPagamento').on('click', 'button.btn-view', function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-title').append('Visualização de registros')
        let dados = `codigo=${$(this).attr('id')}&operacao=view`
        let url = 'api/models/formadepagamentocontroller.php'

        CRUD(dados, url)
        $('.btn-save').hide()
        $('input').prop('disabled', true)
        $('#modal-fPagamento').modal('show')
    })

    $('#table-fPagamento').on('click', 'button.btn-edit', function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-title').append('Edição de registros')
        let dados = `codigo=${$(this).attr('id')}&operacao=view`
        let url = 'api/models/formadepagamentocontroller.php'

        CRUD(dados, url)
        $('.btn-save').attr('data-operation', 'update')
        $('.btn-save').show()
        $('input').prop('disabled', false)
        $('#modal-fPagamento').modal('show')
        $('#table-fPagamento').DataTable().ajax.reload()
    })

    $('#table-fPagamento').on('click', 'button.btn-delete', function(e) {
        e.preventDefault()

        Swal.fire({
            icon: 'warning',
            title: 'Você tem certeza que deseja excluir?',
            text: 'Esta operação é irreverível',
            showCancelButton: true,
            confirmButtonText: 'Sim, desejo excluir',
            cancelButtonText: 'Não, desejo cancelar'
        }).then((result => {
            if (result.isConfirmed) {
                let dados = `codigo=${$(this).attr('id')}&operacao=delete`
                let url = 'api/models/formadepagamentocontroller.php'

                CRUD(dados, url)
                $('#table-fPagamento').DataTable().ajax.reload()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    icon: 'error',
                    title: 'EmpreTec',
                    text: 'Operação cancelada',
                })
            }
        }))

    })

})