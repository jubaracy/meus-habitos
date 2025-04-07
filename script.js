// script.js

import { salvarDados, carregarDados, verificarSenha, trocarSenha, inicializarDados } from './data.js';
import { obterDataAtual, mostrarAlerta, agruparPorMes, contarFrequenciaMensal, criarElemento } from './utils.js';

let dataAtual = obterDataAtual();
let dados = carregarDados();

const loginContainer = document.getElementById('login-container');
const appContainer = document.getElementById('app-container');
const senhaInput = document.getElementById('senha');
const btnLogin = document.getElementById('btn-login');
const dataSpan = document.getElementById('data-atual');
const listaHabitos = document.getElementById('lista-habitos');
const graficoContainer = document.getElementById('grafico');
const historicoLista = document.getElementById('historico-lista');
const formNovaSenha = document.getElementById('form-senha');
const inputNovaSenha = document.getElementById('nova-senha');
const btnTrocarSenha = document.getElementById('btn-trocar-senha');
const graficoMensal = document.getElementById('grafico-mensal');

inicializarDados();

btnLogin.addEventListener('click', () => {
  if (verificarSenha(senhaInput.value)) {
    loginContainer.style.display = 'none';
    appContainer.style.display = 'block';
    exibirDashboard();
  } else {
    mostrarAlerta('Senha incorreta!');
  }
});

function exibirDashboard() {
  dataAtual = obterDataAtual();
  dataSpan.textContent = dataAtual;
  renderizarHabitos();
  renderizarHistorico();
  renderizarGrafico();
}

function renderizarHabitos() {
  listaHabitos.innerHTML = '';
  const habitosDia = dados.historico[dataAtual] || JSON.parse(JSON.stringify(dados.habitos));
  habitosDia.forEach((habito, index) => {
    const div = criarElemento('div');
    const label = criarElemento('span', habito.feito ? 'feito' : '', habito.nome);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = habito.feito;
    checkbox.addEventListener('change', () => {
      habito.feito = checkbox.checked;
      dados.historico[dataAtual] = habitosDia;
      salvarDados(dados);
      renderizarHabitos();
    });
    div.append(label, checkbox);
    listaHabitos.appendChild(div);
  });
  dados.historico[dataAtual] = habitosDia;
  salvarDados(dados);
}

function renderizarHistorico() {
  historicoLista.innerHTML = '';
  const historicoOrdenado = Object.entries(dados.historico).sort().reverse();
  historicoOrdenado.forEach(([data, habitos]) => {
    const li = criarElemento('li', null, `${data} - ${habitos.filter(h => h.feito).length}/${habitos.length} hábitos completos`);
    historicoLista.appendChild(li);
  });
}

function renderizarGrafico() {
  graficoMensal.innerHTML = '';
  const agrupado = agruparPorMes(dados.historico);
  const mesAtual = dataAtual.slice(0, 7);
  const historicoMes = agrupado[mesAtual] || [];
  const frequencia = contarFrequenciaMensal(historicoMes, dados.habitos);
  Object.entries(frequencia).forEach(([nome, valor]) => {
    const linha = criarElemento('div');
    const label = criarElemento('span', null, `${nome}:`);
    const barra = criarElemento('div');
    barra.style.height = '10px';
    barra.style.backgroundColor = '#000';
    barra.style.width = `${valor * 10}px`;
    barra.style.margin = '4px 0';
    linha.append(label, barra);
    graficoMensal.appendChild(linha);
  });
}

btnTrocarSenha.addEventListener('click', () => {
  const novaSenha = inputNovaSenha.value.trim();
  if (novaSenha.length < 4) {
    mostrarAlerta('Senha muito curta.');
    return;
  }
  trocarSenha(novaSenha);
  mostrarAlerta('Senha atualizada com sucesso!');
  inputNovaSenha.value = '';
});

