
// data.js

// Funções utilitárias para salvar e carregar dados do localStorage

const STORAGE_KEYS = {
  password: 'meusHabitos_senha',
  habits: 'meusHabitos_lista',
  progress: 'meusHabitos_progresso',
};

export function getPassword() {
  return localStorage.getItem(STORAGE_KEYS.password) || '';
}

export function setPassword(password) {
  localStorage.setItem(STORAGE_KEYS.password, password);
}

export function getHabits() {
  const saved = localStorage.getItem(STORAGE_KEYS.habits);
  try {
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function setHabits(habits) {
  localStorage.setItem(STORAGE_KEYS.habits, JSON.stringify(habits));
}

export function getTodayProgress() {
  const data = getProgress();
  const today = new Date().toISOString().split('T')[0];
  return data[today] || [];
}

export function toggleHabitToday(habit) {
  const allProgress = getProgress();
  const today = new Date().toISOString().split('T')[0];
  const todayData = new Set(allProgress[today] || []);

  if (todayData.has(habit)) {
    todayData.delete(habit);
  } else {
    todayData.add(habit);
  }

  allProgress[today] = Array.from(todayData);
  setProgress(allProgress);
}

export function getProgress() {
  const saved = localStorage.getItem(STORAGE_KEYS.progress);
  try {
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function setProgress(progress) {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
}

export function exportData() {
  const blob = new Blob([
    JSON.stringify({
      senha: getPassword(),
      habitos: getHabits(),
      progresso: getProgress()
    }, null, 2)
  ], { type: 'application/json' });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'meus-habitos-backup.json';
  a.click();
  URL.revokeObjectURL(url);
}


