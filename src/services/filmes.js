const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const STORAGE_KEY = "meusFilmesLocal";

// Consumo da API Externa - TMDB
export const getFilmesTMDB = async () => {
  try {
    // Busca filmes populares
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`
    );
    const data = await response.json();

    // Retorna a lista. Se der erro, retorna array vazio para não quebrar a tela
    return data.results || [];
  } catch (error) {
    console.error("Erro ao buscar filmes no TMDB:", error);
    return [];
  }
};

// CRUD LOCAL
// Lê o que já está salvo ou retorna null
export const getFilmesLocal = () => {
  const filmes = localStorage.getItem(STORAGE_KEY);
  return filmes ? JSON.parse(filmes) : [];
};

// Função interna para salvar o array no storage
const salvarNoStorage = (filmes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filmes));
};

// Adicionar novo filme manualmente ou vindo da API
export const createFilme = (novoFilme) => {
  const filmesAtuais = getFilmesLocal();

  // Adiciona o novo filme no início da lista
  const filmeParaSalvar = {
    ...novoFilme,
    id: novoFilme.id || Date.now(),
    isLocal: true,
  };

  const novaLista = [filmeParaSalvar, ...filmesAtuais];
  salvarNoStorage(novaLista);
  return novaLista;
};

// Atualizar um filme existente
export const updateFilme = (id, dadosAtualizados) => {
  const filmesAtuais = getFilmesLocal();

  const novaLista = filmesAtuais.map((filme) => {
    if (filme.id === id) {
      // Mantém os dados antigos e sobrescreve com os novos
      return { ...filme, ...dadosAtualizados };
    }
    return filme;
  });

  salvarNoStorage(novaLista);
  return novaLista;
};

// Remover um filme
export const deleteFilme = (id) => {
  const filmesAtuais = getFilmesLocal();

  // Filtra removendo o filme com o ID passado
  const novaLista = filmesAtuais.filter((filme) => filme.id !== id);

  salvarNoStorage(novaLista);
  return novaLista;
};

export const saveToStorage = (listaFilmes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listaFilmes));
};
