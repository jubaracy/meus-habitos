
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (!localStorage.getItem("senha")) {
    localStorage.setItem("senha", "1234");
  }
  app.innerHTML = `
    <div class="container">
      <h1>Login</h1>
      <input id="senha" type="password" placeholder="Digite sua senha" />
      <button onclick="login()">Entrar</button>
    </div>
  `;
});

function login() {
  const senha = document.getElementById("senha").value;
  if (senha === localStorage.getItem("senha")) {
    renderDashboard();
  } else {
    alert("Senha incorreta");
  }
}

function renderDashboard() {
  document.getElementById("app").innerHTML = `
    <div class="container">
      <h1>Meus Hábitos</h1>
      <ul class="habit-list">
        ${getHabits().map(habit => `
          <li class="habit-item">
            <span>${habit.nome}</span>
            <button onclick="marcar('${habit.nome}')">✔️</button>
          </li>
        `).join("")}
      </ul>
      <button onclick="exportar()">Exportar Dados</button>
    </div>
  `;
}

function marcar(nome) {
  const dia = new Date().toISOString().split("T")[0];
  const registros = JSON.parse(localStorage.getItem("registros") || "{}");
  registros[dia] = registros[dia] || {};
  registros[dia][nome] = true;
  localStorage.setItem("registros", JSON.stringify(registros));
  alert(`Hábito "${nome}" marcado para hoje!`);
}

function exportar() {
  const registros = localStorage.getItem("registros") || "{}";
  const blob = new Blob([registros], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meus-habitos.json";
  a.click();
}

