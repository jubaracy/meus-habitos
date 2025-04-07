import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const HABITS = [
  "Beber água",
  "Academia",
  "Meditação",
  "Leitura",
  "Entregar lixo",
  "Limpar cozinha",
];

const getToday = () => new Date().toISOString().split("T")[0];

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("habit-data");
    return saved ? JSON.parse(saved) : {};
  });

  const today = getToday();

  useEffect(() => {
    localStorage.setItem("habit-data", JSON.stringify(data));
  }, [data]);

  const handleCheck = (habit) => {
    setData((prev) => {
      const todayData = prev[today] || {};
      todayData[habit] = !todayData[habit];
      return { ...prev, [today]: todayData };
    });
  };

  const getProgress = () => {
    const days = Object.keys(data);
    return days.map((day) => {
      const habitsDone = Object.values(data[day] || {}).filter(Boolean).length;
      return { date: day, progresso: habitsDone };
    });
  };

  const todayData = data[today] || {};
  const allDone = HABITS.every((h) => todayData[h]);

  if (!loggedIn) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#111", color: "#fff" }}>
        <h1 style={{ marginBottom: 20 }}>Meus Hábitos</h1>
        <input
          type="password"
          placeholder="Digite a senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, marginBottom: 10 }}
        />
        <button onClick={() => password === "1234" && setLoggedIn(true)}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#111", color: "#fff", minHeight: "100vh", padding: 20 }}>
      <h1>Meus Hábitos - {today}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
        {HABITS.map((habit) => (
          <div
            key={habit}
            onClick={() => handleCheck(habit)}
            style={{
              backgroundColor: todayData[habit] ? "#22c55e" : "#333",
              border: todayData[habit] ? "none" : "2px solid red",
              padding: 20,
              textAlign: "center",
              cursor: "pointer",
              borderRadius: 10,
            }}
          >
            {habit}
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40 }}>Progresso Mensal</h2>
      <div style={{ width: "100%", height: 300, backgroundColor: "#222", padding: 20, borderRadius: 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getProgress()}>
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" domain={[0, HABITS.length]} />
            <Tooltip />
            <Bar dataKey="progresso" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {!allDone && (
        <div style={{ marginTop: 20, color: "#f87171", textAlign: "center" }}>
          Você ainda não completou todos os hábitos hoje!
        </div>
      )}
    </div>
  );
};

export default App;