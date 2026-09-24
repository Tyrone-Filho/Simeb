const botoes = document.querySelectorAll("button");

const respostas = [
    "Resposta: 4 alunos.",
    "Resposta: 40% de redução.",
    "Resposta: 1/5."
];

botoes.forEach((botao, index) => {

    botao.addEventListener("click", () => {
        alert(respostas[index]);
    });

});