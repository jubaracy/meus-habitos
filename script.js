
const SENHA = "1234"; // Altere a senha aqui se quiser

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");

  loginBtn.addEventListener("click", login);
  logoutBtn.addEventListener("click", logout);
});

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
