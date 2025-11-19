// importar as ferramentas
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// importar a funçao register
import { register } from "../services/autenticacao.js";
// importar estilo
import styles from "../styles/Autentica.module.css";
import Input from "../components/Input/Input.jsx";
import Button from "../components/Button/Button.jsx";

function RegisterPage() {
  // guardar o estado das variaveis
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // funcao que sera chamada pelo form
  const envioFormulario = async (event) => {
    // impedir o recarregamento da pagina
    event.preventDefault();

    setError(null);

    // primeiro verifica se as senhas digitadas sao diferente
    if (senha !== confirmarSenha) {
      setError("As senhas não são iguais");
      return;
    }

    // tentativa de efetuar registro, utiliza a funcao register do services/autenticacao.jsx
    try {
      await register(nome, email, senha);
      alert(
        "Registo efetuado com sucesso! Você será redirecionado para o login."
      );

      // se bem sucecido, navega para a LoginPage
      navigate("/login");
    } catch (error) {
      console.error(error.message);

      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Crie sua Conta</h2>

        <form onSubmit={envioFormulario}>
          <Input
            label="Nome Completo"
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Crie uma senha forte"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Input
            label="Confirmar Senha"
            type="password"
            placeholder="Digite a senha novamente"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          <div style={{ marginTop: "20px" }}>
            <Button type="submit" variant="primary" style={{ width: "100%" }}>
              Cadastrar
            </Button>
          </div>
        </form>

        <p className={styles.footerText}>
          Já tem conta? <Link to="/login">Fazer Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
