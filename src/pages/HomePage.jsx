import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Página Inicial</h1>
      <p>Esta será a página principal com os filmes.</p>
      <nav>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <Link to="/login">Ir para a Página de Login</Link>
          </li>
          <li>
            <Link to="/register">Ir para a Página de Registo</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
