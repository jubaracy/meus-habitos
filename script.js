
import { salvarDados, carregarDados, exportarComoJSON, trocarSenhaStorage, verificarSenha } from './data.js';
import { gerarGraficoMensal, formatarData } from './utils.js';

let dataAtual = new Date();
let senhaSalva = localStorage.getItem("senha") || "1234";
let dados = carregarDados();

function login() {
  const senhaInput = document.getElementById("senhaInput").value;
  if (verificarSenha(senhaInput)) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("app").style.display = "block";
    renderizarHabitos();
  } else {
    alert("Senha incorreta!");
  }
}

function logout() {
  location.reload();
}

function renderizarHabitos() {
  const titulo = document.getElementById("tituloData");
  titulo.innerText = formatarData(dataAtual);
  const container = document.getElementById("habitosContainer");
  container.innerHTML = "";
  const habitosHoje = dados[formatarData(dataAtual)] || [];

  habitosHoje.forEach((habito, index) => {
    const div = document.createElement("div");
    div.className = "habito-item" + (!habito.feito ? " alerta" : "");
    div.innerHTML = `
      <span>${habito.nome} <span class="categoria">(${habito.categoria})</span></span>
      <input type="checkbox" ${habito.feito ? "checked" : ""} onchange="toggleHabito(${index})" />
    `;
    container.appendChild(div);
  });

  salvarDados(dados);
}

window.toggleHabito = function(index) {
  const dia = formatarData(dataAtual);
  dados[dia][index].feito = !dados[dia][index].feito;
  renderizarHabitos();
};

window.mostrarAdicionarHabito = function() {
  document.getElementById("novoHabitoForm").style.display = "block";
};

window.adicionarHabito = function() {
  const nome = document.getElementById("novoHabitoInput").value;
  const categoria = document.getElementById("categoriaHabitoInput").value;
  if (!nome) return;

  const dia = formatarData(dataAtual);
  if (!dados[dia]) dados[dia] = [];
  dados[dia].push({ nome, categoria, feito: false });
  document.getElementById("novoHabitoInput").value = "";
  document.getElementById("novoHabitoForm").style.display = "none";
  renderizarHabitos();
};

window.verHistorico = function () {
  const container = document.getElementById("historicoContainer");
  container.style.display = container.style.display === "none" ? "block" : "none";
  container.innerHTML = "<h3>Histórico</h3>";
  const dias = Object.keys(dados).sort();
  dias.forEach((dia) => {
    const diaBox = document.createElement("div");
    diaBox.innerHTML = `<strong>${dia}</strong><ul>` +
      dados[dia].map(h => `<li>${h.nome} (${h.feito ? "✔️" : "❌"})</li>`).join('') +
      "</ul>";
    container.appendChild(diaBox);
  });

  gerarGraficoMensal(dados);
};

window.exportarDados = function () {
  exportarComoJSON(dados);
};

window.trocarSenha = function () {
  document.getElementById("senhaContainer").style.display = "block";
};

window.salvarNovaSenha = function () {
  const nova = document.getElementById("novaSenhaInput").value;
  trocarSenhaStorage(nova);
  alert("Senha atualizada.");
  document.getElementById("senhaContainer").style.display = "none";
};

window.login = login;
window.logout = logout;
