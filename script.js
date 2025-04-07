// DOM Elements
const loginContainer = document.getElementById("login-container");
const appContainer = document.getElementById("app-container");
const loginForm = document.getElementById("login-form");
const userInput = document.getElementById("usuario");
const passInput = document.getElementById("senha");
const listaHabitos = document.getElementById("lista-habitos");
const grafico = document.getElementById("grafico-diario");
const alertaContainer = document.getElementById("alertas");
const historicoLista = document.getElementById("historico-lista");
const btnExportar = document.getElementById("btn-exportar");
const btnTrocarSenha = document.getElementById("btn-trocar-senha");
const inputNovaSenha = document.getElementById("nova-senha");

// Estado
let dataAtual = new Date().toISOString().split("T")[0];
let dados = {};

// Funções
function atualizarTela() {
  listaHabitos.innerHTML = "";
  alertaContainer.innerHTML = "";

  const habitosHoje = dados[dataAtual] || [];
  const naoFeitos = habitosHoje.filter(h => !h.feito);

  habitosHoje.forEach((habito, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span class="${habito.feito ? "feito" : ""}">${habito.nome}</span>
      <button onclick="marcarFeito(${index})">${habito.feito ? "Desfazer" : "Feito"}</button>
    `;
    listaHabitos.appendChild(div);
  });

  if (naoFeitos.length > 0) {
    const alerta = document.createElement("div");
    alerta.className = "alerta";
    alerta.innerText = `Você ainda não completou ${naoFeitos.length} hábito(s) hoje.`;
    alertaContainer.appendChild(alerta);
  }

  desenharGrafico();
  mostrarHistorico();
}

function marcarFeito(index) {
  dados[dataAtual][index].feito = !dados[dataAtual][index].feito;
  salvarDados(dados);
  atualizarTela();
}

function desenharGrafico() {
  const total = dados[dataAtual]?.length || 0;
  const feitos = dados[dataAtual]?.filter(h => h.feito).length || 0;

  grafico.innerHTML = `
    <h3>Progresso do Dia</h3>
    <progress value="${feitos}" max="${total}"></progress>
    <p>${feitos} de ${total} hábitos concluídos</p>
  `;
}

function mostrarHistorico() {
  historicoLista.innerHTML = "";
  const dias = Object.keys(dados).sort().reverse();

  dias.forEach(dia => {
    const div = document.createElement("div");
    const feitos = dados[dia].filter(h => h.feito).length;
    const total = dados[dia].length;
    div.innerHTML = `<strong>${dia}</strong>: ${feitos}/${total} hábitos`;
    historicoLista.appendChild(div);
  });
}

function entrar(e) {
  e.preventDefault();
  const user = userInput.value;
  const senha = passInput.value;
  if (validarLogin(user, senha)) {
    loginContainer.style.display = "none";
    appContainer.style.display = "block";
    dados = carregarDados();
    atualizarTela();
  } else {
    alert("Usuário ou senha inválidos");
  }
}

function trocarSenhaUsuario() {
  const nova = inputNovaSenha.value;
  if (nova) {
    trocarSenha(nova);
    alert("Senha alterada com sucesso");
    inputNovaSenha.value = "";
  }
}

// Eventos
loginForm.addEventListener("submit", entrar);
btnExportar.addEventListener("click", exportarDados);
btnTrocarSenha.addEventListener("click", trocarSenhaUsuario);

// Inicialização
inicializarPadrao();

