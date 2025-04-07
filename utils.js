// utils.js

export function formatarData(data) {
  const d = new Date(data);
  const dia = d.getDate().toString().padStart(2, '0');
  const mes = (d.getMonth() + 1).toString().padStart(2, '0');
  const ano = d.getFullYear();
  return `${ano}-${mes}-${dia}`;
}

export function obterHoje() {
  return formatarData(new Date());
}

export function contarFrequencia(habitos, mes, ano) {
  const frequencia = {};
  for (const dia in habitos) {
    const [a, m] = dia.split('-');
    if (parseInt(a) === ano && parseInt(m) === mes) {
      for (const item of habitos[dia]) {
        frequencia[item.nome] = (frequencia[item.nome] || 0) + (item.feito ? 1 : 0);
      }
    }
  }
  return frequencia;
}
