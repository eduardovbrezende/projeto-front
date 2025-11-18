import React from "react";
import { Navigate } from "react-router-dom";

// Recebe a página que queremos proteger (children).
const Protecao = ({ children }) => {
  // Analisa a memoria do navegador.
  const user = localStorage.getItem("user");

  // Se a memoria estiver vazia (não há user), redireciona para o Login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se houver utilizador, mostra a página.
  return children;
};

export default Protecao;
