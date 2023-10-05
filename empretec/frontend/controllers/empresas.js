$(document).ready(function() {
    $.ajax({
        url: "api/models/teste_upload.php",
        type: "POST",
        dataType: "json",
        success: function(empresas) {
            const container = $("#empresas-container");
            let htmlEmpresas = "";

            for (let i = 0; i < empresas.length; i++) {
                htmlEmpresas += criarHTMLEmpresa(empresas[i]);
            }

            container.html(htmlEmpresas);
        },
        error: function(error) {
            console.error("Erro ao buscar as informações das empresas:", error);
        }
    });

    function criarHTMLEmpresa(empresa) {
        return `
        <div class="col-md-6 col-lg-4 col-xl-3 wow fadeInRight" data-wow-delay=".1s">
            <article class="team-classic team-classic-lg mt-3">
                <a class="team-classic-figure" href="${empresa.link_empresa}" target="_blank">
                    <img src="${empresa.img_empresa}" class="img-fluid" alt="${empresa.nome_empresa}" />
                </a>
                <div class="team-classic-caption">
                    <h4 class="team-classic-name">${empresa.nome_empresa}</h4>
                </div>
            </article>
        </div>`;
    }
});