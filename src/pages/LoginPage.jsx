// importar as ferramentas
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// importar a funçao login
import { login } from "../services/autenticacao.js";
// importar estilo
import styles from "../styles/Autentica.module.css";
import Input from "../components/Input/Input.jsx";
import Button from "../components/Button/Button.jsx";

function LoginPage() {
  // guardar o estado das variaveis
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // funcao que sera chamada pelo form
  const envioFormulario = async (event) => {
    // impedir o recarregamento da pagina
    event.preventDefault();

    setError(null);

    // tentativa de efetuar login, utiliza a funcao login do services/autenticacao.js
    try {
      const usuario = await login(email, senha);

      console.log("Login bem sucedido", usuario);

      // Guarda o objeto do utilizador no localStorage do navegador
      localStorage.setItem("user", JSON.stringify(usuario));

      // se bem sucecido, navega para a HomePage
      navigate("/");
    } catch (error) {
      console.error(error.message);

      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Acesse sua Conta</h2>

        <form onSubmit={envioFormulario}>
          <Input
            label="E-mail"
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          <div style={{ marginTop: "20px" }}>
            <Button type="submit" variant="primary" style={{ width: "100%" }}>
              Entrar
            </Button>
          </div>
        </form>

        <p className={styles.footerText}>
          Não tem conta? <Link to="/register">Cadastre-se aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
