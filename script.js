import { habitosBase } from './data.js';
import { formatarData } from './utils.js';

const senhaCorreta = "123";

const btnEntrar = document.getElementById("btnEntrar");
const senhaInput = document.getElementById("senha");
const erroLogin = document.getElementById("erro-login");
const loginContainer = document.getElementById("login-container");
const appContainer = document.getElementById("app-container");

btnEntrar.addEventListener("click", () => {
  const senha = senhaInput.value;
  if (senha === senhaCorreta) {
    loginContainer.classList.add("hidden");
    appContainer.classList.remove("hidden");
    renderizarHabitos();
  } else {
    erroLogin.textContent = "Senha incorreta.";
  }
});

function renderizarHabitos() {
  const container = document.getElementById("habitos-container");
  container.innerHTML = "";
  habitosBase.forEach((habito, index) => {
    const div = document.createElement("div");
    div.textContent = `${habito.nome} (${habito.categoria})`;
    container.appendChild(div);
  });
}