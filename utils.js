// Funções utilitárias futuras aqui
// utils.js

// Formata a data no padrão YYYY-MM-DD
export function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Gera um array com as datas do mês atual
export function getAllDaysOfMonth(year, month) {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

// Retorna o nome do mês
export function getMonthName(monthIndex) {
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return meses[monthIndex] || '';
}
