// Perguntas diferentes para cada personagem.
// Edite/adicione perguntas aqui à vontade.
const perguntas = {
     vitima: [
          {
               texto: "O que você deve fazer se estiver sofrendo bullying?",
               opcoes: [
                    "Contar para um adulto de confiança",
                    "Ficar em silêncio",
                    "Revidar com violência"
               ],
               correta: 0
          },
          {
               texto: "Bullying é considerado normal na escola?",
               opcoes: [
                    "Sim, faz parte do crescimento",
                    "Não, é um problema sério que deve ser combatido",
                    "Só se for 'brincadeira'"
               ],
               correta: 1
          }
     ],
     agressor: [
          {
               texto: "Qual atitude ajuda a mudar um comportamento agressivo?",
               opcoes: [
                    "Ignorar o problema",
                    "Buscar entender o impacto das próprias ações",
                    "Culpar a vítima"
               ],
               correta: 1
          },
          {
               texto: "Praticar bullying pode gerar consequências?",
               opcoes: [
                    "Não, é só brincadeira",
                    "Sim, inclusive disciplinares e legais",
                    "Apenas se alguém contar"
               ],
               correta: 1
          }
     ],
     investigador: [
          {
               texto: "O que um investigador deve fazer ao identificar um caso de bullying?",
               opcoes: [
                    "Ignorar e seguir em frente",
                    "Reunir informações e encaminhar para responsáveis",
                    "Resolver sozinho sem envolver ninguém"
               ],
               correta: 1
          },
          {
               texto: "É importante ouvir todas as partes envolvidas?",
               opcoes: [
                    "Não, só a vítima importa",
                    "Não, só o agressor importa",
                    "Sim, para entender o caso com clareza"
               ],
               correta: 2
          }
     ]
};

// Estado do jogo
let personagemAtual = null;
let indiceAtual = 0;
let acertos = 0;
let respondeuAtual = false;
let cardAtual = null;


// Elementos
const telaEscolha = document.getElementById("tela-escolha");
const telaQuiz = document.getElementById("tela-quiz");
const telaResultado = document.getElementById("tela-resultado");
const telaVideo = document.getElementById("tela-video");

const quizTitulo = document.getElementById("quiz-titulo");
const perguntaTexto = document.getElementById("pergunta-texto");
const opcoesContainer = document.getElementById("opcoes-container");
const btnProxima = document.getElementById("btn-proxima");
const resultadoTexto = document.getElementById("resultado-texto");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnFimVideo = document.getElementById("fim-video");
// Troca de tela
function mostrarTela(tela) {
     document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
     tela.classList.add("ativa");
}

// Clique em um personagem
document.querySelectorAll(".personagem").forEach(card => {
     card.addEventListener("click", () => {
          personagemAtual = card.dataset.personagem;
          cardAtual = card;
          indiceAtual = 0;
          acertos = 0;
          mostrarTela(telaVideo);
     });
});
btnFimVideo.addEventListener("click",()=>{
     quizTitulo.textContent = "Questionário - " + cardAtual.querySelector("p").textContent;
     mostrarTela(telaQuiz)
     carregarPergunta();
})

function carregarPergunta() {
     respondeuAtual = false;
     const lista = perguntas[personagemAtual];
     const pergunta = lista[indiceAtual];

     perguntaTexto.textContent = pergunta.texto;
     opcoesContainer.innerHTML = "";

     pergunta.opcoes.forEach((opcaoTexto, i) => {
          const div = document.createElement("div");
          div.classList.add("opcao");
          div.textContent = opcaoTexto;
          div.addEventListener("click", () => selecionarOpcao(i, div));
          opcoesContainer.appendChild(div);
     });
}

function selecionarOpcao(indice, elemento) {
     if (respondeuAtual){
          return;
     }
     respondeuAtual = true;

     const pergunta = perguntas[personagemAtual][indiceAtual];
     const opcoes = document.querySelectorAll(".opcao");
     elemento.classList.add("selecionada");

     if (indice === pergunta.correta) {
          acertos++;
          elemento.style.backgroundColor = "green";
     }else{
          opcoes[pergunta.correta].style.backgroundColor = "green"
          elemento.style.backgroundColor = "red";
     }
}

btnProxima.addEventListener("click", () => {
     if(document.querySelector(".selecionada")){
          const lista = perguntas[personagemAtual];
          if (indiceAtual < lista.length - 1) {
               indiceAtual++;
               carregarPergunta()
          } else {
               mostrarResultado();
          }
     }

     
});

function mostrarResultado() {
     const total = perguntas[personagemAtual].length;
     resultadoTexto.textContent = `Você acertou ${acertos} de ${total} perguntas como ${personagemAtual}.`;
     mostrarTela(telaResultado);
}

btnReiniciar.addEventListener("click", () => {
     personagemAtual = null;
     mostrarTela(telaEscolha);
});