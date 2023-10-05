document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("filtroFormacao");
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "api/models/curso_form.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function() {
        if (xhr.status === 200) {
            const cursos = JSON.parse(xhr.responseText);
            let htmlCursos = "";

            for (let i = 0; i < cursos.length; i++) {
                htmlCursos += criarHTMLCursoOption(cursos[i]);
                criarSection(cursos[i].curso);
            }

            container.innerHTML = htmlCursos;
        } else {
            console.error("Erro ao buscar as informações dos cursos:", xhr.status, xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error("Erro na requisição.");
    };

    xhr.send();
});

function criarHTMLCursoOption(curso) {
    return `<option value="${curso.curso}">${curso.curso}</option>`;
}

function criarSection(curso) {

}