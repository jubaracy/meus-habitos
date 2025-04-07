
const STORAGE_KEY = "meus-habitos";
const STORAGE_USER = "meus-habitos-user";
const STORAGE_PASSWORD = "meus-habitos-password";

function salvarDados(dados) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

function carregarDados() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : {};
}

function salvarUsuario(user, senha) {
  localStorage.setItem(STORAGE_USER, user);
  localStorage.setItem(STORAGE_PASSWORD, senha);
}

function validarLogin(user, senha) {
  return (
    user === localStorage.getItem(STORAGE_USER) &&
    senha === localStorage.getItem(STORAGE_PASSWORD)
  );
}

function trocarSenha(novaSenha) {
  localStorage.setItem(STORAGE_PASSWORD, novaSenha);
}

function exportarDados() {
  const dados = carregarDados();
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meus-habitos-dados.json";
  a.click();
  URL.revokeObjectURL(url);
}

function inicializarPadrao() {
  if (!localStorage.getItem(STORAGE_USER)) {
    salvarUsuario("admin", "1234");
  }

  const dados = carregarDados();
  const hoje = new Date().toISOString().split("T")[0];
  if (!dados[hoje]) {
    dados[hoje] = [
      { nome: "Beber Água", feito: false, categoria: "Saúde" },
      { nome: "Academia", feito: false, categoria: "Saúde" },
      { nome: "Meditação", feito: false, categoria: "Bem-estar" },
      { nome: "Leitura", feito: false, categoria: "Pessoal" },
      { nome: "Entregar lixo", feito: false, categoria: "Casa" },
      { nome: "Limpar cozinha", feito: false, categoria: "Casa" }
    ];
    salvarDados(dados);
  }
}
