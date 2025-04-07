
const SENHA = "1234";

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const checkboxes = document.querySelectorAll(".habit-check");

  loginBtn.addEventListener("click", login);
  logoutBtn.addEventListener("click", logout);

  checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      salvarHabitos();
      atualizarAlerta();
      atualizarGrafico();
    });
  });

  carregarHabitos();
  atualizarAlerta();
  inicializarGrafico();
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

function salvarHabitos() {
  const habitos = {};
  document.querySelectorAll(".habit-check").forEach(cb => {
    habitos[cb.dataset.habit] = cb.checked;
  });
  localStorage.setItem("habitosHoje", JSON.stringify(habitos));
}

function carregarHabitos() {
  const dados = localStorage.getItem("habitosHoje");
  if (dados) {
    const habitos = JSON.parse(dados);
    document.querySelectorAll(".habit-check").forEach(cb => {
      cb.checked = !!habitos[cb.dataset.habit];
    });
  }
}

function atualizarAlerta() {
  const algumNaoFeito = Array.from(document.querySelectorAll(".habit-check"))
    .some(cb => !cb.checked);

  const alerta = document.getElementById("alerta-nao-cumprido");
  alerta.textContent = algumNaoFeito ? "Você ainda tem hábitos pendentes hoje!" : "";
}

let chart;

function inicializarGrafico() {
  const ctx = document.getElementById("habitChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Beber Água", "Academia", "Meditação", "Leitura", "Entregar Lixo", "Limpar Cozinha"],
      datasets: [{
        label: "Hábitos de hoje",
        data: pegarProgressoAtual(),
        backgroundColor: "#333"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

function atualizarGrafico() {
  chart.data.datasets[0].data = pegarProgressoAtual();
  chart.update();
}

function pegarProgressoAtual() {
  return Array.from(document.querySelectorAll(".habit-check"))
    .map(cb => cb.checked ? 1 : 0);
}
