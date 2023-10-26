$(document).ready(function() {
    let dados = `operacao=validate`
    let url = 'api/models/atendentecontroller.php'

    $.ajax({
        dataType: 'JSON',
        type: 'POST',
        async: true,
        url: url,
        data: dados,
        success: function(dados) {
            if (dados.type === 'success') {
                Swal.fire({
                    icon: dados.type,
                    title: 'SysPed',
                    text: dados.mensagem
                });
            } else if (dados.type === 'error') {
                $(location).attr('href', 'index.html')
            }
        }
    })
})