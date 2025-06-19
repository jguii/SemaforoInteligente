// Variáveis globais
let contador = document.getElementById("contador");
let statusTexto = document.getElementById("status");
let botaoPedestre = document.getElementById("botaoPedestre");
let luzVermelha = document.querySelector(".vermelha");
let luzAmarela = document.querySelector(".amarela");
let luzVerde = document.querySelector(".verde");

let nomeUsuario = "";
let estadoAtual = "verde";
let tempoRestante = 0;
let intervaloContagem;
let multiplicadorVelocidade = 1; // começa normal (1x)

// Boas-vindas
function pedirNome() {
    nomeUsuario = prompt("Digite seu nome:");
    if (!nomeUsuario) {
        nomeUsuario = "Usuário";
    }
    document.getElementById("bem_vindo").innerText = `Bem-vindo(a), ${nomeUsuario}!`;
}

pedirNome();

// Evento do botão de pedestre
botaoPedestre.addEventListener("click", () => {
    if (estadoAtual === "verde" && multiplicadorVelocidade === 1) {
        multiplicadorVelocidade = 2; // dobra a velocidade para priorizar a travessia
    }
});

// Função para acender luzes
function acenderLuz(luz) {
    luzVermelha.classList.remove("ativa");
    luzAmarela.classList.remove("ativa");
    luzVerde.classList.remove("ativa");

    luz.classList.add("ativa");
}

// Função de contagem regressiva
function iniciarContagem(callback) {
    contador.innerText = tempoRestante;

    intervaloContagem = setInterval(() => {
        tempoRestante -= multiplicadorVelocidade;
        if (tempoRestante < 0) tempoRestante = 0; // garantir que não fique negativo
        contador.innerText = tempoRestante;

        if (tempoRestante <= 0) {
            clearInterval(intervaloContagem);
            multiplicadorVelocidade = 1; // volta pra velocidade normal
            callback();
        }
    }, 1000); // sempre executa a cada 1 segundo
}

// Ciclo do semáforo
function cicloSemaforo() {
    estadoAtual = "verde";
    acenderLuz(luzVerde);
    statusTexto.innerText = "🟢 Carros Andando";

    tempoRestante = 7;
    iniciarContagem(() => {
        amarelo();
    });
}

function amarelo() {
    estadoAtual = "amarelo";
    acenderLuz(luzAmarela);
    statusTexto.innerText = "🟡 Atenção";

    tempoRestante = 5;
    iniciarContagem(() => {
        vermelho();
    });
}

function vermelho() {
    estadoAtual = "vermelho";
    acenderLuz(luzVermelha);
    statusTexto.innerText = "🔴 Carros Parados";

    tempoRestante = 7;
    iniciarContagem(() => {
        cicloSemaforo();
    });
}

cicloSemaforo();
