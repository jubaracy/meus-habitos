
// script.js
import { formatDate, getAllDaysOfMonth, getMonthName } from './utils.js';
import {
  loadHabits,
  saveHabits,
  toggleHabitDone,
  getPassword,
  setPassword,
  checkLogin,
  loadProgress,
  saveProgress,
  exportData
} from './data.js';

const app = document.getElementById('app');

function renderLogin() {
  app.innerHTML = `
    <h1>Meus Hábitos</h1>
    <h2>Login</h2>
    <input type="password" id="loginPassword" placeholder="Senha" />
    <button onclick="handleLogin()">Entrar</button>
  `;
  window.handleLogin = () => {
    const pw = document.getElementById('loginPassword').value;
    if (checkLogin(pw)) {
      renderMain();
    } else {
      alert('Senha incorreta.');
    }
  };
}

function renderMain() {
  app.innerHTML = `
    <nav>
      <button onclick="renderMain()">Hoje</button>
      <button onclick="renderHistory()">Histórico</button>
      <button onclick="renderStats()">Gráfico</button>
      <button onclick="renderSettings()">Configurações</button>
    </nav>
    <h1>Hábitos de Hoje (${formatDate(new Date())})</h1>
    <div id="habits"></div>
  `;

  const habits = loadHabits();
  const progress = loadProgress();
  const today = formatDate(new Date());
  const habitsContainer = document.getElementById('habits');

  Object.keys(habits).forEach(category => {
    const div = document.createElement('div');
    div.className = 'category';
    div.innerHTML = `<h2>${category}</h2>`;

    habits[category].forEach(habit => {
      const isDone = progress[today]?.includes(habit);
      const habitDiv = document.createElement('div');
      habitDiv.className = `habit${isDone ? ' done' : ''}`;
      habitDiv.innerHTML = `
        <span>${habit}</span>
        <button onclick="toggleDone('${habit}')">
          ${isDone ? 'Desfazer' : 'Concluir'}
        </button>
      `;
      div.appendChild(habitDiv);
    });

    habitsContainer.appendChild(div);
  });

  window.toggleDone = (habit) => {
    toggleHabitDone(habit);
    renderMain();
  };
}

function renderHistory() {
  const habits = loadHabits();
  const progress = loadProgress();
  const today = new Date();
  const days = getAllDaysOfMonth(today.getFullYear(), today.getMonth());

  app.innerHTML = `
    <nav>
      <button onclick="renderMain()">Hoje</button>
      <button onclick="renderHistory()">Histórico</button>
      <button onclick="renderStats()">Gráfico</button>
      <button onclick="renderSettings()">Configurações</button>
    </nav>
    <h1>Histórico de ${getMonthName(today.getMonth())}</h1>
    <div id="history"></div>
  `;

  const container = document.getElementById('history');
  days.forEach(day => {
    const dateStr = formatDate(day);
    const list = progress[dateStr] || [];
    const div = document.createElement('div');
    div.className = 'history-entry';
    div.innerHTML = `<strong>${dateStr}:</strong> ${list.join(', ') || 'Nenhum hábito concluído'}`;
    container.appendChild(div);
  });
}

function renderStats() {
  const progress = loadProgress();
  const today = new Date();
  const days = getAllDaysOfMonth(today.getFullYear(), today.getMonth());
  const freq = {};
  days.forEach(day => {
    const dateStr = formatDate(day);
    (progress[dateStr] || []).forEach(habit => {
      freq[habit] = (freq[habit] || 0) + 1;
    });
  });

  app.innerHTML = `
    <nav>
      <button onclick="renderMain()">Hoje</button>
      <button onclick="renderHistory()">Histórico</button>
      <button onclick="renderStats()">Gráfico</button>
      <button onclick="renderSettings()">Configurações</button>
    </nav>
    <h1>Gráfico de Frequência</h1>
    <div id="graph"></div>
  `;

  const container = document.getElementById('graph');
  Object.entries(freq).forEach(([habit, count]) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${habit}</strong>
      <div class="graph-bar">
        <div class="graph-bar-fill" style="width: ${count * 10}px"></div>
      </div>
    `;
    container.appendChild(div);
  });
}

function renderSettings() {
  app.innerHTML = `
    <nav>
      <button onclick="renderMain()">Hoje</button>
      <button onclick="renderHistory()">Histórico</button>
      <button onclick="renderStats()">Gráfico</button>
      <button onclick="renderSettings()">Configurações</button>
    </nav>
    <h1>Configurações</h1>
    <h2>Trocar senha</h2>
    <input type="password" id="newPassword" placeholder="Nova senha" />
    <button onclick="updatePassword()">Atualizar senha</button>
    <h2>Exportar dados</h2>
    <button onclick="exportData()">Exportar</button>
  `;

  window.updatePassword = () => {
    const pw = document.getElementById('newPassword').value;
    if (pw.length >= 3) {
      setPassword(pw);
      alert('Senha atualizada!');
    } else {
      alert('A senha deve ter pelo menos 3 caracteres.');
    }
  };
}

// Inicialização
if (getPassword()) {
  renderLogin();
} else {
  const defaultPw = prompt('Defina uma senha para começar:');
  setPassword(defaultPw);
  renderMain();
}

