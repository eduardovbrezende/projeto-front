import React from "react";
import { Navigate } from "react-router-dom";

// Recebe a página que queremos proteger (children).
const Protecao = ({ children }) => {
  // Analisa a memoria do navegador.
  const user = localStorage.getItem("user");

  // 2. Se a memoria estiver vazio (não há user), redireciona para o Login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se houver utilizador, mostramos a página.
  return children;
};

export default Protecao;
