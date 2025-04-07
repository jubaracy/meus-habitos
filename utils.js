// utils.js

function salvarDadosChave(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarDadosChave(chave, padrao = null) {
  const dados = localStorage.getItem(chave);
  return dados ? JSON.parse(dados) : padrao;
}

function gerarDataAtualISO() {
  return new Date().toISOString().split('T')[0];
}

function agruparPorCategoria(lista) {
  const categorias = {};
  lista.forEach(h => {
    if (!categorias[h.categoria]) categorias[h.categoria] = [];
    categorias[h.categoria].push(h);
  });
  return categorias;
}

function contarFrequenciaMensal(historico, habitos) {
  const contagem = {};
  habitos.forEach(h => contagem[h.nome] = 0);
  Object.values(historico).forEach(dia => {
    dia.forEach(h => {
      if (h.feito && contagem.hasOwnProperty(h.nome)) {
        contagem[h.nome]++;
      }
    });
  });
  return contagem;
}
