
// script.js
import { carregarDados, salvarDados, verificarSenha, mudarSenha } from './data.js';
import { formatarData, gerarGraficoMensal } from './utils.js';

const app = document.getElementById('app');
const hoje = formatarData(new Date());
const dados = carregarDados();
const habitosPadrao = [
  { nome: 'Beber Água', feito: false, categoria: 'Saúde' },
  { nome: 'Academia', feito: false, categoria: 'Saúde' },
  { nome: 'Meditação', feito: false, categoria: 'Bem-estar' },
  { nome: 'Leitura', feito: false, categoria: 'Crescimento' },
  { nome: 'Entregar lixo', feito: false, categoria: 'Casa' },
  { nome: 'Limpar cozinha', feito: false, categoria: 'Casa' },
];

if (!dados[hoje]) dados[hoje] = JSON.parse(JSON.stringify(habitosPadrao));
salvarDados(dados);

function renderLogin() {
  app.innerHTML = `
    <h1>Meus Hábitos</h1>
    <input type="password" placeholder="Digite sua senha" id="senhaInput" />
    <button onclick="login()">Entrar</button>
  `;
  window.login = () => {
    const senha = document.getElementById('senhaInput').value;
    if (verificarSenha(senha)) renderApp();
    else alert('Senha incorreta.');
  };
}

function renderApp() {
  const hoje = formatarData(new Date());
  const habitosHoje = dados[hoje];
  app.innerHTML = `
    <h2>Hábitos de hoje (${hoje})</h2>
    <div id="lista"></div>
    <button onclick="salvarHabitos()">Salvar</button>
    <button onclick="verHistorico()">Histórico</button>
    <button onclick="verTrocarSenha()">Trocar senha</button>
    <canvas id="graficoFrequencia" width="400" height="200"></canvas>
  `;

  const lista = document.getElementById('lista');
  habitosHoje.forEach((h, i) => {
    const div = document.createElement('div');
    div.className = 'habito';
    div.innerHTML = `
      <label>
        <input type="checkbox" ${h.feito ? 'checked' : ''} onchange="atualizar(${i}, this.checked)">
        ${h.nome} <small>(${h.categoria})</small>
      </label>
    `;
    lista.appendChild(div);
  });

  window.atualizar = (i, valor) => {
    dados[hoje][i].feito = valor;
  };

  window.salvarHabitos = () => {
    salvarDados(dados);
    alert('Hábitos salvos!');
    renderApp();
  };

  gerarGraficoMensal(dados);
}

function verHistorico() {
  app.innerHTML = '<h2>Histórico do mês</h2>';
  Object.keys(dados).sort().forEach(dia => {
    const diaBox = document.createElement('div');
    diaBox.innerHTML = `<h3>${dia}</h3>`;
    dados[dia].forEach(h => {
      const p = document.createElement('p');
      p.textContent = `${h.nome}: ${h.feito ? '✅' : '❌'}`;
      diaBox.appendChild(p);
    });
    app.appendChild(diaBox);
  });

  const voltar = document.createElement('button');
  voltar.textContent = 'Voltar';
  voltar.onclick = () => renderApp();
  app.appendChild(voltar);
}

function verTrocarSenha() {
  app.innerHTML = `
    <h2>Trocar senha</h2>
    <input type="password" id="novaSenha" placeholder="Nova senha" />
    <button onclick="confirmarTroca()">Salvar nova senha</button>
  `;
  window.confirmarTroca = () => {
    const novaSenha = document.getElementById('novaSenha').value;
    mudarSenha(novaSenha);
    alert('Senha atualizada!');
    renderApp();
  };
}

if (!verificarSenha('1234')) mudarSenha('1234');
renderLogin();
