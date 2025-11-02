import { Routes, Route } from "react-router-dom";

// Import das páginas
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

// Controlador de Tráfego
function App() {
  return (
    <Routes>
      {/* Regra para a home page*/}
      <Route path="/" element={<HomePage />} />

      {/* Regra para a página de login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Regra para a página de registo */}
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
