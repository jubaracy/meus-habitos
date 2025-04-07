// script.js

let usuarioLogado = false;

function salvarDados(dados) {
  localStorage.setItem('dadosHabitos', JSON.stringify(dados));
}

function carregarDados() {
  const dados = localStorage.getItem('dadosHabitos');
  return dados ? JSON.parse(dados) : {};
}

function login(event) {
  event.preventDefault();
  const senha = document.getElementById('senha').value;
  if (senha === '1234') {
    usuarioLogado = true;
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    carregarTelaPrincipal();
  } else {
    alert('Senha incorreta!');
  }
}

function carregarTelaPrincipal() {
  const hoje = new Date().toISOString().split('T')[0];
  const dados = carregarDados();
  if (!dados[hoje]) {
    dados[hoje] = JSON.parse(JSON.stringify(habitosBase));
    salvarDados(dados);
  }
  mostrarHabitos(hoje, dados);
  atualizarResumoMensal(dados);
}

function mostrarHabitos(data, dados) {
  const container = document.getElementById('lista-habitos');
  container.innerHTML = '';
  dados[data].forEach((habito, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <span class="${habito.feito ? 'feito' : ''}">${habito.nome}</span>
      <button onclick="alternarHabito('${data}', ${index})">${habito.feito ? 'Desfazer' : 'Feito'}</button>
    `;
    container.appendChild(div);
  });
  mostrarAlerta(dados[data]);
}

function alternarHabito(data, index) {
  const dados = carregarDados();
  dados[data][index].feito = !dados[data][index].feito;
  salvarDados(dados);
  mostrarHabitos(data, dados);
  atualizarResumoMensal(dados);
}

function mostrarAlerta(habitos) {
  const alerta = document.getElementById('alerta');
  const pendentes = habitos.filter(h => !h.feito);
  alerta.innerHTML = pendentes.length ? `Você ainda não completou: ${pendentes.map(h => h.nome).join(', ')}` : '';
}

function atualizarResumoMensal(dados) {
  const grafico = document.getElementById('grafico-mensal');
  grafico.innerHTML = '';
  const dias = Object.keys(dados).sort();
  dias.forEach(dia => {
    const total = dados[dia].length;
    const feitos = dados[dia].filter(h => h.feito).length;
    const porcentagem = Math.round((feitos / total) * 100);
    const div = document.createElement('div');
    div.innerHTML = `<strong>${dia}</strong>: ${porcentagem}% completos`;
    grafico.appendChild(div);
  });
}

function mostrarHistorico() {
  const dados = carregarDados();
  const historico = document.getElementById('historico');
  historico.innerHTML = '';
  Object.keys(dados).sort().forEach(data => {
    const item = document.createElement('div');
    const feitos = dados[data].filter(h => h.feito).length;
    item.textContent = `${data} - ${feitos}/${dados[data].length} hábitos concluídos`;
    historico.appendChild(item);
  });
}

document.getElementById('form-login').addEventListener('submit', login);
document.getElementById('btn-historico').addEventListener('click', mostrarHistorico);


