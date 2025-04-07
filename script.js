
const SENHA = "1234"; // Altere para a senha que quiser

function login() {
  const senha = document.getElementById("password").value;
  const erro = document.getElementById("login-error");

  if (senha === SENHA) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");
    erro.textContent = "";
  } else {
    erro.textContent = "Senha incorreta!";
  }
}

function logout() {
  document.getElementById("main-screen").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
  document.getElementById("password").value = "";
}

