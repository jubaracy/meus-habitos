
export function salvarDados(dados) {
  localStorage.setItem("dados", JSON.stringify(dados));
}

export function carregarDados() {
  return JSON.parse(localStorage.getItem("dados")) || {};
}

export function exportarComoJSON(dados) {
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meus-habitos.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function trocarSenhaStorage(novaSenha) {
  localStorage.setItem("senha", novaSenha);
}

export function verificarSenha(senhaDigitada) {
  return senhaDigitada === (localStorage.getItem("senha") || "1234");
}
