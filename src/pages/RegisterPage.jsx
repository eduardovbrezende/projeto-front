// importar as ferramentas
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// importar a funçao register
import { register } from "../services/autenticacao.js";

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
    <div>
      <h1>Esta sera a pagina de registro</h1>
      <p>Crie sua nova conta</p>
      {/* Ao clicar o botao de Criar Conta é chamada a funçao envioFormulario*/}
      <form onSubmit={envioFormulario}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Conta</button>
        {/* se a variavel error for setada na funcao envioFormulario, é mostrado a mensagem de erro*/}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
