
// script.js
import { salvarDados, carregarDados, verificarSenha, mudarSenha } from './data.js';
import { formatarData, gerarGraficoMensal } from './utils.js';

const app = document.getElementById('app');
const hoje = formatarData(new Date());
let dados = carregarDados();

const habitosFixos = [
  { nome: 'Beber Água', categoria: 'Saúde' },
  { nome: 'Academia', categoria: 'Saúde' },
  { nome: 'Meditação', categoria: 'Bem-estar' },
  { nome: 'Leitura', categoria: 'Pessoal' },
  { nome: 'Entregar lixo', categoria: 'Casa' },
  { nome: 'Limpar cozinha', categoria: 'Casa' }
];

function renderLogin() {
  app.innerHTML = `
    <h2>Login</h2>
    <input type="password" id="senha" placeholder="Digite sua senha" />
    <button onclick="">Entrar</button>
    <p id="erro" class="alerta"></p>
  `;
  const btn = app.querySelector('button');
  btn.addEventListener('click', () => {
    const senha = document.getElementById('senha').value;
    if (verificarSenha(senha)) renderApp();
    else document.getElementById('erro').innerText = 'Senha incorreta';
  });
}

function renderApp() {
  if (!dados[hoje]) {
    dados[hoje] = habitosFixos.map(h => ({ ...h, feito: false }));
    salvarDados(dados);
  }

  app.innerHTML = `
    <h1>Meus Hábitos - ${hoje}</h1>
    <div id="lista"></div>
    <button onclick="location.reload()">Salvar</button>
    <button onclick="renderHistorico()">Ver Histórico</button>
    <button onclick="renderTrocaSenha()">Trocar Senha</button>
    <canvas id="graficoFrequencia"></canvas>
  `;

  const lista = document.getElementById('lista');
  dados[hoje].forEach((h, i) => {
    const div = document.createElement('div');
    div.className = 'habito';
    div.innerHTML = `
      <label>
        <input type="checkbox" ${h.feito ? 'checked' : ''} onchange=""> ${h.nome} <small>(${h.categoria})</small>
      </label>
    `;
    div.querySelector('input').addEventListener('change', e => {
      dados[hoje][i].feito = e.target.checked;
      salvarDados(dados);
    });
    lista.appendChild(div);
  });

  const algumNaoFeito = dados[hoje].some(h => !h.feito);
  if (algumNaoFeito) {
    const alerta = document.createElement('p');
    alerta.className = 'alerta';
    alerta.innerText = 'Você ainda não completou todos os hábitos de hoje!';
    app.appendChild(alerta);
  }

  gerarGraficoMensal(dados);
}

function renderHistorico() {
  app.innerHTML = `<h2>Histórico Mensal</h2><div id="historico"></div><button onclick="renderApp()">Voltar</button>`;
  const div = document.getElementById('historico');

  Object.keys(dados).sort().forEach(data => {
    const diaDiv = document.createElement('div');
    diaDiv.innerHTML = `<strong>${data}</strong><ul></ul>`;
    const ul = diaDiv.querySelector('ul');
    dados[data].forEach(h => {
      const li = document.createElement('li');
      li.innerText = `${h.nome} - ${h.feito ? '✔️' : '❌'}`;
      ul.appendChild(li);
    });
    div.appendChild(diaDiv);
  });
}

function renderTrocaSenha() {
  app.innerHTML = `
    <h2>Trocar Senha</h2>
    <input type="password" id="novaSenha" placeholder="Nova senha" />
    <button onclick="">Salvar</button>
    <button onclick="renderApp()">Cancelar</button>
  `;

  app.querySelector('button').addEventListener('click', () => {
    const nova = document.getElementById('novaSenha').value;
    if (nova.length < 3) alert('Senha muito curta');
    else {
      mudarSenha(nova);
      alert('Senha alterada');
      renderApp();
    }
  });
}

renderLogin();

