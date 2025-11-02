const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, senha) => {
  // verificando a existencia do email e senha no backend simulado
  const url = `${API_URL}/users?email=${email}&senha=${senha}`;

  // chamada a API
  const chamada = await fetch(url);

  // recebe a chamada da API para um vetor de usuarios
  const usuario = await chamada.json();

  // se o tamanho do vetor for 1, foi achado exatamente um usuario e ele é retornado.
  // se o vetor estiver vazio ou com tamanho > 1, existe uma falha
  if (usuario.length == 1) {
    return usuario[0];
  } else {
    throw new Error("E-mail ou senha inválidos.");
  }
};

export const register = async (nome, email, senha) => {
  // verificar se o email já existe no database.json
  const buscarEmailUrl = `${API_URL}/users?email=${email}`;
  const buscarEmail = await fetch(buscarEmailUrl);
  const emailRegistrado = await buscarEmail.json();

  // se o vetor de usuarios com esse email for > 0, email esta em uso
  if (emailRegistrado.length > 0) {
    throw new Error("E-mail já em uso.");
  }

  // se o email está livre, registra o novo usuario
  const registroUrl = `${API_URL}/users`;
  const registrar = await fetch(registroUrl, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nome: nome,
      email: email,
      senha: senha,
      // definindo os valores iniciais para os outros campos
      resetToken: null,
      resetTokenExpiry: null,
    }),
  });

  // se a resposta da API para o registro nao for ok, mostre erro
  if (!registrar.ok) {
    throw new Error("Erro ao registrar novo usuário.");
  }

  // se o registro for concluido, a API retorna o novo usuario criado com um id
  return await registrar.json();
};
