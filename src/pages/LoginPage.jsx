import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/autenticacao";
import { backgroundLogin } from "../assets";
import styles from "../styles/Autentica.module.css";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const envioFormulario = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const usuario = await login(email, senha);
      localStorage.setItem("user", JSON.stringify(usuario));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    /* Aplica a imagem de fundo via Style Inline para permitir 
       o uso do import dinâmico do diretório /assets 
    */
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundLogin})` }}
    >
      <div className={styles.card}>
        <h2 className={styles.title}>Acesse sua Conta</h2>

        <form onSubmit={envioFormulario} className={styles.formStack}>
          <Input
            label="E-mail"
            type="email"
            placeholder="Digite seu email (exemplo@email.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <Button type="submit" variant="primary" style={{ width: "100%" }}>
              Entrar
            </Button>
          </div>
        </form>

        <p className={styles.footerText}>
          Não tem uma conta?{" "}
          <Link to="/register" className={styles.link}>
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
