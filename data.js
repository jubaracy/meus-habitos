
// data.js

const STORAGE_KEY = 'meusHabitos';

function salvarDados(dados) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

function carregarDados() {
  const dados = localStorage.getItem(STORAGE_KEY);
  if (dados) {
    return JSON.parse(dados);
  }
  return {
    senha: '1234',
    habitos: [
      { nome: 'Beber Água', categoria: 'Saúde' },
      { nome: 'Academia', categoria: 'Saúde' },
      { nome: 'Meditação', categoria: 'Bem-estar' },
      { nome: 'Leitura', categoria: 'Pessoal' },
      { nome: 'Entregar lixo', categoria: 'Casa' },
      { nome: 'Limpar cozinha', categoria: 'Casa' }
    ],
    historico: {}
  };
}

function registrarConclusao(habito, data) {
  const dados = carregarDados();
  if (!dados.historico[data]) {
    dados.historico[data] = [];
  }
  if (!dados.historico[data].includes(habito)) {
    dados.historico[data].push(habito);
    salvarDados(dados);
  }
}

function removerConclusao(habito, data) {
  const dados = carregarDados();
  if (dados.historico[data]) {
    dados.historico[data] = dados.historico[data].filter(h => h !== habito);
    salvarDados(dados);
  }
}

function alterarSenha(novaSenha) {
  const dados = carregarDados();
  dados.senha = novaSenha;
  salvarDados(dados);
}

function atualizarHabitos(novosHabitos) {
  const dados = carregarDados();
  dados.habitos = novosHabitos;
  salvarDados(dados);
}

function exportarDados() {
  const dados = carregarDados();
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'meus_habitos_dados.json';
  a.click();
  URL.revokeObjectURL(url);
}

