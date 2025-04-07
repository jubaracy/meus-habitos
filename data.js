
// data.js

const STORAGE_KEY = 'habitos_dia';
const SENHA_KEY = 'senha_app';

export function salvarDados(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function carregarDados() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

export function salvarSenha(senha) {
  localStorage.setItem(SENHA_KEY, senha);
}

export function verificarSenha(senha) {
  return localStorage.getItem(SENHA_KEY) === senha;
}

export function mudarSenha(novaSenha) {
  salvarSenha(novaSenha);
}
