document.addEventListener("DOMContentLoaded", function() {
    function obterIDEmpregoDaURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('codigo');
    }

    const conteudoDiv = document.getElementById("conteudo");
    const empregoCodigo = obterIDEmpregoDaURL();

    if (empregoCodigo) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `api/models/buscar_emprego.php?codigo=${empregoCodigo}`, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                if (data) {
                    // Atualizar o nome do cargo e a descrição da vaga
                    document.querySelector(".detlh-vaga").textContent = data.nome_do_cargo; // Atualiza o nome do cargo
                    document.querySelector(".text-left.mb-5").textContent = data.descricao; // Atualiza a descrição da vaga
                    document.querySelector(".box-contacts-link").textContent = data.email_contato;

                    // Atualizar a div "conteudo" com as outras informações do emprego
                    conteudoDiv.innerHTML = `
                        <h3 class="sub-title mb-2">${data.nome_do_cargo}</h3>
                        <hr class="featurette-divider">
                        <h4 class="infos2"><b class="infos">Período:</b> ${data.periodo}</h4>
                        <h4 class="infos2"><b class="infos">Vagas:</b> ${data.vagas_disponiveis}</h4>
                        <h4 class="infos2"><b class="infos">Salário:</b> R$ ${data.salario}</h4>
                        <h4 class="infos2"><b class="infos">Plano de saúde:</b> ${data.plano_saude}</h4>
                        <h4 class="infos2"><b class="infos">Cesta básica:</b> ${data.cesta_basica}</h4>
                    `;
                } else {
                    conteudoDiv.innerHTML = "Nenhum emprego encontrado.";
                }
            }
        };
        xhr.send();
    } else {
        conteudoDiv.innerHTML = "Código de emprego não fornecido na URL.";
    }
});