// Função para criar um header de acordeão
function criarHeaderAcordeao(curso) {
    return `
    <div class="card">
        <div class="card-header text-center" id="heading${curso.codigo}">
            <h2 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${curso.codigo}" aria-expanded="false" aria-controls="collapse${curso.codigo}">
                    ${curso.curso}
                </button>
            </h2>
        </div>
        <div id="collapse${curso.codigo}" class="collapse" aria-labelledby="heading${curso.codigo}" data-parent="#accordionExample">
            <div class="card-body">
                <div id="${curso.curso}-multiCollapse" class="card-deck">
                    <!-- Cards de empregos serão adicionados aqui -->
                </div>
            </div>
        </div>
    </div>`;
}

// Função para criar o conteúdo do emprego
function criarConteudoEmprego(emprego) {
    return `
    <div class="col-md-4">
        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title">${emprego.formacao_necessaria}</h5>
                <p class="card-text">É com grande prazer que [Nome da Empresa] convida você a se juntar à nossa equipe como ${emprego.nome_do_cargo}.<br>
                <br>Estamos entusiasmados em oferecer a você a oportunidade de desenvolver suas habilidades e conhecimentos na área de ${emprego.nome_do_cargo} enquanto colabora conosco em projetos empolgantes.</p>
                <br>
                <a href="detalhes_emprego.html?codigo=${emprego.codigo}" class="card-link btn-empre">Olhar mais de perto</a>
            </div>
        </div>
    </div>`;
}

// Função para buscar informações de empregos para um curso específico
function buscarInformacoesEmpregos(curso) {
    fetch("api/models/upload_empregos.php")
        .then(response => response.json())
        .then(empregos => {
            // Filtrar os empregos com base no critério, por exemplo, título do curso
            const empregosFiltrados = empregos.filter(emprego => emprego.formacao_necessaria === curso.curso);

            // Preencher o conteúdo dos empregos para o curso específico
            const containerEmpregos = document.getElementById(`${curso.curso}-multiCollapse`);
            let htmlEmpregos = "";

            for (let i = 0; i < empregosFiltrados.length; i++) {
                const emprego = empregosFiltrados[i];
                htmlEmpregos += criarConteudoEmprego(emprego);
            }

            containerEmpregos.innerHTML = htmlEmpregos;
        })
        .catch(error => console.error("Erro ao buscar informações dos empregos:", error));
}

// Solicitar informações de cursos
fetch("api/models/upload_empregosbot.php")
    .then(response => response.json())
    .then(cursos => {
        const contentContainer = document.getElementById("conteudo-cursos");

        // Preencher os headers dos acordeões
        let htmlAcordeoes = "";
        for (let i = 0; i < cursos.length; i++) {
            const curso = cursos[i];
            htmlAcordeoes += criarHeaderAcordeao(curso);
        }
        contentContainer.innerHTML = htmlAcordeoes;

        // Para cada curso, buscar informações de empregos
        for (let i = 0; i < cursos.length; i++) {
            const curso = cursos[i];
            buscarInformacoesEmpregos(curso);
        }
    })
    .catch(error => console.error("Erro ao buscar as informações dos cursos:", error));