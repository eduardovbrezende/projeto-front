import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/autenticacao";
import styles from "../styles/Autentica.module.css";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { backgroundLogin } from "../assets";

function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const envioFormulario = async (event) => {
    event.preventDefault();
    setError(null);

    // Validação simples de senha
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await register(nome, email, senha);
      alert("Registro efetuado com sucesso! Você será redirecionado.");
      navigate("/login");
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
        <h2 className={styles.title}>Crie sua Conta</h2>

        <form onSubmit={envioFormulario} className={styles.formStack}>
          <Input
            label="Nome Completo"
            type="text"
            placeholder="Digite seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
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

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <Button type="submit" variant="primary" style={{ width: "100%" }}>
              Cadastrar
            </Button>
          </div>
        </form>

        <p className={styles.footerText}>
          Já tem uma conta?{" "}
          <Link to="/login" className={styles.link}>
            Fazer Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
