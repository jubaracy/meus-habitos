
// data.js

// Estrutura dos dados armazenados localmente
function obterDados() {
  const dados = localStorage.getItem('meus_habitos_dados');
  return dados ? JSON.parse(dados) : {
    habitos: [
      { id: gerarId(), nome: 'Beber Água', categoria: 'Saúde' },
      { id: gerarId(), nome: 'Academia', categoria: 'Saúde' },
      { id: gerarId(), nome: 'Meditação', categoria: 'Bem-estar' },
      { id: gerarId(), nome: 'Leitura', categoria: 'Pessoal' },
      { id: gerarId(), nome: 'Entregar lixo', categoria: 'Casa' },
      { id: gerarId(), nome: 'Limpar cozinha', categoria: 'Casa' }
    ],
    historico: {}
  };
}

function salvarDados(dados) {
  localStorage.setItem('meus_habitos_dados', JSON.stringify(dados));
}

function marcarComoFeito(data, habitoId) {
  const dados = obterDados();
  if (!dados.historico[data]) {
    dados.historico[data] = [];
  }
  if (!dados.historico[data].includes(habitoId)) {
    dados.historico[data].push(habitoId);
  }
  salvarDados(dados);
}

function desmarcarFeito(data, habitoId) {
  const dados = obterDados();
  if (dados.historico[data]) {
    dados.historico[data] = dados.historico[data].filter(id => id !== habitoId);
    if (dados.historico[data].length === 0) {
      delete dados.historico[data];
    }
  }
  salvarDados(dados);
}

function adicionarHabito(nome, categoria) {
  const dados = obterDados();
  dados.habitos.push({ id: gerarId(), nome, categoria });
  salvarDados(dados);
}

function removerHabito(id) {
  const dados = obterDados();
  dados.habitos = dados.habitos.filter(h => h.id !== id);
  for (let data in dados.historico) {
    dados.historico[data] = dados.historico[data].filter(hid => hid !== id);
  }
  salvarDados(dados);
}

function editarHabito(id, novoNome, novaCategoria) {
  const dados = obterDados();
  const habito = dados.habitos.find(h => h.id === id);
  if (habito) {
    habito.nome = novoNome;
    habito.categoria = novaCategoria;
  }
  salvarDados(dados);
}

