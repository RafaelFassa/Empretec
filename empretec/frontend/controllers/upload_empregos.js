function mostrarTodosEmpregos() {
    fetch("api/models/upload_empregos.php")
        .then(response => response.json())
        .then(empregos => {
            const containerEmpregos = document.getElementById("todos-content");
            let htmlEmpregos = "";

            for (let i = 0; i < empregos.length; i++) {
                const emprego = empregos[i];
                htmlEmpregos += criarConteudoEmprego(emprego);
            }

            containerEmpregos.innerHTML = htmlEmpregos;
        })
        .catch(error => console.error("Erro ao buscar informações dos empregos:", error));
}

// Chamar a função para mostrar todos os empregos ao carregar a página
mostrarTodosEmpregos();

// Função para criar uma guia de curso
function criarGuiaCurso(curso) {
    return `
    <a class="nav-item nav-link mt-3" id="${curso.codigo}-tab" data-toggle="tab" href="#${curso.codigo}-content" role="tab" aria-controls="${curso.codigo}-content" aria-selected="false">${curso.curso}</a>`;
}

// Função para criar o conteúdo de curso
function criarConteudoCurso(curso) {
    return `
    <div class="tab-pane fade" id="${curso.codigo}-content" role="tabpanel" aria-labelledby="${curso.codigo}-tab">
    <fieldset class="title-curso mt-3">
        <div id="${curso.curso}-content-info" class="card-deck"></div>
    </fieldset>
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
            <a href="form-envio.html" class="card-link btn-empre">Olhar mais de perto</a>
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
            const containerEmpregos = document.getElementById(`${curso.curso}-content-info`);
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
        const tabsContainer = document.getElementById("nav-tabs");
        const contentContainer = document.getElementById("nav-tabContent");

        // Preencher as guias de cursos
        let htmlCursos = "";
        for (let i = 0; i < cursos.length; i++) {
            const curso = cursos[i];
            htmlCursos += criarGuiaCurso(curso);
        }
        tabsContainer.innerHTML = htmlCursos;

        // Preencher o conteúdo dos cursos
        let htmlConteudoCursos = "";
        for (let i = 0; i < cursos.length; i++) {
            const curso = cursos[i];
            htmlConteudoCursos += criarConteudoCurso(curso);
        }
        contentContainer.innerHTML = htmlConteudoCursos;

        // Para cada curso, buscar informações de empregos
        for (let i = 0; i < cursos.length; i++) {
            const curso = cursos[i];
            buscarInformacoesEmpregos(curso);
        }
    })
    .catch(error => console.error("Erro ao buscar as informações dos cursos:", error));