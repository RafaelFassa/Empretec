    function CRUD(dados, url) {
        $.ajax({
            dataType: 'JSON',
            type: 'POST',
            assync: true,
            url: url,
            data: dados,
            success: function(dados) {
                if (dados.mensagem != '') {

                    Swal.fire({
                        icon: dados.type,
                        title: 'EmpreTec',
                        text: dados.mensagem
                    })
                    $('#modal-produtos').modal('hide')
                } else if (dados.type == 'view') {
                    $('#curso').val(dados.dados.curso)
                    $('#codigo').val(dados.dados.codigo)
                }
            }
        })
    }




    $(document).ready(function() {

        $('#table-produtos').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "api/models/produtocontroller.php?operacao=read",
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
                    "data": 'curso',
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
            $('.modal-title').append('Cadastro de produtos')
            $('#form-produtos :input').val('')
            $('.btn-save').show()
            $('.btn-save').attr('data-operation', 'create')
            $('#modal-produtos').modal('show')
            $('input').prop('disabled', false)
        })
        $('.btn-save').click(function(e) {
            e.preventDefault()

            let dados = $('#form-produtos').serialize()
            dados += `&operacao=${$('.btn-save').attr('data-operation')}`

            let url = 'api/models/produtocontroller.php'

            CRUD(dados, url)

            $('#table-produtos').DataTable().ajax.reload()
        })

        $('#table-produtos').on('click', 'button.btn-view', function(e) {
            e.preventDefault()

            $('.modal-title').empty()
            $('.modal-title').append('Visualização de registros')
            let dados = `codigo=${$(this).attr('id')}&operacao=view`
            let url = 'api/models/produtocontroller.php'

            CRUD(dados, url)
            $('.btn-save').hide()
            $('input').prop('disabled', true)
            $('#modal-produtos').modal('show')
        })

        $('#table-produtos').on('click', 'button.btn-edit', function(e) {
            e.preventDefault()

            $('.modal-title').empty()
            $('.modal-title').append('Edição de registros')
            let dados = `codigo=${$(this).attr('id')}&operacao=view`
            let url = 'api/models/produtocontroller.php'

            CRUD(dados, url)
            $('.btn-save').attr('data-operation', 'update')
            $('.btn-save').show()
            $('input').prop('disabled', false)
            $('#modal-produtos').modal('show')
            $('#table-produtos').DataTable().ajax.reload()
        })

        $('#table-produtos').on('click', 'button.btn-delete', function(e) {
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
                    let url = 'api/models/produtocontroller.php'

                    CRUD(dados, url)
                    $('#table-produtos').DataTable().ajax.reload()
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