// utils.js

function formatarData(data) {
  return data.toISOString().split('T')[0];
}

function obterDataAtual() {
  return formatarData(new Date());
}

function gerarIdUnico() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function mostrarAlerta(mensagem) {
  const alerta = document.createElement('div');
  alerta.className = 'alerta';
  alerta.textContent = mensagem;
  document.body.prepend(alerta);
  setTimeout(() => alerta.remove(), 4000);
}

function agruparPorMes(dados) {
  const agrupado = {};
  Object.entries(dados).forEach(([data, habitos]) => {
    const [ano, mes] = data.split('-');
    const chaveMes = `${ano}-${mes}`;
    if (!agrupado[chaveMes]) agrupado[chaveMes] = [];
    agrupado[chaveMes].push({ data, habitos });
  });
  return agrupado;
}

function contarFrequenciaMensal(historicoMensal, habitosBase) {
  const frequencia = {};
  habitosBase.forEach(h => frequencia[h.nome] = 0);
  historicoMensal.forEach(({ habitos }) => {
    habitos.forEach(h => {
      if (h.feito && frequencia[h.nome] !== undefined) {
        frequencia[h.nome]++;
      }
    });
  });
  return frequencia;
}

function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto) el.textContent = texto;
  return el;
}
