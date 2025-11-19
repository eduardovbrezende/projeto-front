import React, { useState, useEffect } from "react";
import {
  getFilmesTMDB,
  getFilmesLocal,
  saveToStorage,
  createFilme,
  deleteFilme,
  updateFilme,
} from "../services/filmes";
import CardFilmes from "../components/CardFilmes";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

function HomePage() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novoTitulo, setNovoTitulo] = useState("");

  // URL base das imagens (definida no .env)
  const imgBaseUrl = import.meta.env.VITE_TMDB_IMG;

  // READ: Carregar dados ao abrir a página
  useEffect(() => {
    async function carregarDados() {
      // Tenta pegar do LocalStorage primeiro (para manter edições salvas)
      let dados = getFilmesLocal();

      // Se o LocalStorage estiver vazio (primeira visita), busca da API
      if (dados.length === 0) {
        dados = await getFilmesTMDB();
        saveToStorage(dados); // Salva no storage para permitir CRUD futuro
      }

      setFilmes(dados);
      setLoading(false);
    }

    carregarDados();
  }, []);

  // CREATE: Adicionar um novo filme manualmente
  const handleCriarFilme = (e) => {
    e.preventDefault();
    if (!novoTitulo) return;

    const novoFilme = {
      title: novoTitulo,
      overview: "Filme adicionado manualmente pelo usuário.",
      poster_path: null,
      vote_average: 10,
    };

    const listaAtualizada = createFilme(novoFilme);
    setFilmes(listaAtualizada);
    setNovoTitulo("");
    alert("Filme criado com sucesso!");
  };

  // DELETE: Remover filme
  const handleExcluir = (id) => {
    if (confirm("Tem certeza que deseja excluir este filme?")) {
      const listaAtualizada = deleteFilme(id);
      setFilmes(listaAtualizada);
    }
  };

  // UPDATE: Editar título do filme
  const handleEditar = (id, tituloAtual) => {
    const novoNome = prompt("Digite o novo nome do filme:", tituloAtual);

    if (novoNome && novoNome !== tituloAtual) {
      const listaAtualizada = updateFilme(id, { title: novoNome });
      setFilmes(listaAtualizada);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Carregando filmes...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1>Catálogo de Filmes</h1>
        <form
          onSubmit={handleCriarFilme}
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "#f4f4f4",
            borderRadius: "8px",
            display: "flex",
            gap: "10px",
            alignItems: "flex-end", // Alinha o botão com o input
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <Input
              label="Novo Filme"
              placeholder="Digite o nome do filme..."
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary">
            Adicionar
          </Button>
        </form>{" "}
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Renderiza o componente para cada filme da lista */}
        {filmes.map((filme) => (
          <CardFilmes
            key={filme.id}
            filme={filme}
            onEdit={handleEditar}
            onDelete={handleExcluir}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
