const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const STORAGE_KEY = "meusFilmesLocal";

export const saveToStorage = (filmes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filmes));
};

export const getFilmesTMDB = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`
    );
    const data = await response.json();
    return data.results || [];
  } catch {
    // Se der erro, retorna vazio para não quebrar a tela
    return [];
  }
};

export const getFilmesLocal = () => {
  const filmes = localStorage.getItem(STORAGE_KEY);
  return filmes ? JSON.parse(filmes) : [];
};

export const createFilme = (novoFilme) => {
  const filmesAtuais = getFilmesLocal();

  const filmeParaSalvar = {
    ...novoFilme,
    id: novoFilme.id || Date.now(),
    isLocal: true,
  };

  const novaLista = [filmeParaSalvar, ...filmesAtuais];
  saveToStorage(novaLista);
  return novaLista;
};

export const updateFilme = (id, dadosAtualizados) => {
  const filmesAtuais = getFilmesLocal();

  const novaLista = filmesAtuais.map((filme) => {
    if (filme.id === id) {
      return { ...filme, ...dadosAtualizados };
    }
    return filme;
  });

  saveToStorage(novaLista);
  return novaLista;
};

export const deleteFilme = (id) => {
  const filmesAtuais = getFilmesLocal();
  const novaLista = filmesAtuais.filter((filme) => filme.id !== id);

  saveToStorage(novaLista);
  return novaLista;
};
