// utils.js

import Chart from 'chart.js/auto';

export function formatarData(data) {
  return data.toISOString().split('T')[0];
}

export function gerarGraficoMensal(dados) {
  const dias = Object.keys(dados).sort();
  const contagem = {};

  dias.forEach(dia => {
    dados[dia].forEach(h => {
      if (!contagem[h.nome]) contagem[h.nome] = 0;
      if (h.feito) contagem[h.nome]++;
    });
  });

  const ctx = document.getElementById("graficoFrequencia");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(contagem),
      datasets: [{
        label: "% de Conclusão no Mês",
        data: Object.values(contagem),
        backgroundColor: "#333"
      }]
    }
  });
}
