// script.js

import { salvarDados, carregarDados, gerarHistoricoMensal } from './data.js';
import { gerarGraficoMensal } from './utils.js';

const senhaCorreta = '1234';
const loginContainer = document.getElementById('login-container');
const appContainer = document.getElementById('app-container');
const inputSenha = document.getElementById('senha');
const botaoEntrar = document.getElementById('entrar');
const botaoSalvarHabitos = document.getElementById('salvar-habitos');
const listaHabitosContainer = document.getElementById('lista-habitos');
const selectHabito = document.getElementById('habito');
const graficoContainer = document.getElementById('grafico');
const historicoContainer = document.getElementById('historico-lista');
const alertaContainer = document.getElementById('alertas');

let dados = carregarDados();

function verificarAlertas() {
  const naoFeitos = dados.habitos.filter(h => !h.feitoHoje);
  alertaContainer.innerHTML = '';
  if (naoFeitos.length) {
    const div = document.createElement('div');
    div.className = 'alerta';
    div.textContent = `Você ainda não concluiu: ${naoFeitos.map(h => h.nome).join(', ')}`;
    alertaContainer.appendChild(div);
  }
}

function atualizarListaHabitos() {
  listaHabitosContainer.innerHTML = '';
  dados.habitos.forEach((habito, index) => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = habito.nome;
    if (habito.feitoHoje) span.classList.add('feito');
    const btn = document.createElement('button');
    btn.textContent = habito.feitoHoje ? 'Desfazer' : 'Concluir';
    btn.onclick = () => {
      habito.feitoHoje = !habito.feitoHoje;
      salvarDados(dados);
      atualizarListaHabitos();
      verificarAlertas();
    };
    div.appendChild(span);
    div.appendChild(btn);
    listaHabitosContainer.appendChild(div);
  });
  verificarAlertas();
}

function atualizarHistorico() {
  historicoContainer.innerHTML = '';
  const historico = gerarHistoricoMensal(dados);
  historico.forEach(registro => {
    const div = document.createElement('div');
    div.textContent = `${registro.data}: ${registro.habitos.join(', ')}`;
    historicoContainer.appendChild(div);
  });
}

botaoEntrar.addEventListener('click', () => {
  if (inputSenha.value === senhaCorreta) {
    loginContainer.style.display = 'none';
    appContainer.style.display = 'block';
    atualizarListaHabitos();
    atualizarHistorico();
    gerarGraficoMensal(dados, graficoContainer);
  } else {
    alert('Senha incorreta');
  }
});

botaoSalvarHabitos.addEventListener('click', () => {
  const novoHabito = selectHabito.value.trim();
  if (novoHabito && !dados.habitos.some(h => h.nome === novoHabito)) {
    dados.habitos.push({ nome: novoHabito, feitoHoje: false });
    salvarDados(dados);
    atualizarListaHabitos();
  }
});


