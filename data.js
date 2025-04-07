
// data.js

const STORAGE_KEY = 'meusHabitos';

export function salvarDados(dados) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

export function carregarDados() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : null;
}

export function limparDados() {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportarDados() {
  const dados = carregarDados();
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'meus_habitos_backup.json';
  a.click();
  URL.revokeObjectURL(url);
}
