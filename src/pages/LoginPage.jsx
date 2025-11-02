// importar as ferramentas
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// importar a funçao login
import { login } from "../services/autenticacao.js";

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

      // se bem sucecido, navega para a HomePage
      navigate("/");
    } catch (error) {
      console.error(error.message);

      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Esta sera a pagina de login</h1>
      <p>Formulairo de login</p>
      {/* Ao clicar o botao de Entrar é chamada a funçao envioFormulario*/}
      <form onSubmit={envioFormulario}>
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
        <button type="submit">Entrar</button>
        {/* se a variavel error for setada na funcao envioFormulario, é mostrado a mensagem de erro*/}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
