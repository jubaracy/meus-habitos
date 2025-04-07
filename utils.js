// utils.js

// Gera um ID único simples
function gerarId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Retorna a data atual no formato YYYY-MM-DD
function dataAtual() {
  return new Date().toISOString().split('T')[0];
}

// Retorna o nome do mês a partir do número (0 a 11)
function nomeMes(mes) {
  const nomes = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return nomes[mes];
}

// Retorna o número de dias do mês
function diasNoMes(ano, mes) {
  return new Date(ano, mes + 1, 0).getDate();
}

// Verifica se duas datas são iguais
function datasIguais(d1, d2) {
  return new Date(d1).toDateString() === new Date(d2).toDateString();
}

// Valida o login
function validarLogin(username, senha) {
  const credenciais = JSON.parse(localStorage.getItem('credenciais')) || { username: 'admin', senha: '1234' };
  return username === credenciais.username && senha === credenciais.senha;
}

// Salva novas credenciais
function salvarNovaSenha(novaSenha) {
  const credenciais = JSON.parse(localStorage.getItem('credenciais')) || {};
  credenciais.senha = novaSenha;
  localStorage.setItem('credenciais', JSON.stringify(credenciais));
}

// Exporta os dados como JSON
function exportarDados(dados) {
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'meus_habitos_dados.json';
  link.click();
}

