import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import {
  getFilmesTMDB,
  getFilmesLocal,
  saveToStorage,
  createFilme,
  deleteFilme,
  updateFilme,
} from "../services/filmes";
import CardFilmes from "../components/CardFilmes/CardFilmes";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

function HomePage() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novoTitulo, setNovoTitulo] = useState("");

  // READ: Carregar dados ao abrir a página
  useEffect(() => {
    async function carregarDados() {
      // 1. Tenta pegar do LocalStorage (Prioridade para dados locais)
      let dados = getFilmesLocal();

      // 2. Se vazio, busca da API e salva no LocalStorage
      if (dados.length === 0) {
        dados = await getFilmesTMDB();
        saveToStorage(dados);
      }

      setFilmes(dados);
      setLoading(false);
    }

    carregarDados();
  }, []);

  // CREATE: Adicionar filme
  const handleCriarFilme = (e) => {
    e.preventDefault();
    if (!novoTitulo.trim()) return; // Evita criar com texto vazio

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

  // UPDATE: Editar filme
  const handleEditar = (id, tituloAtual) => {
    const novoNome = prompt(
      "Digite o nome do novo filme que deseja adicionar:",
      tituloAtual
    );

    if (novoNome && novoNome !== tituloAtual) {
      const listaAtualizada = updateFilme(id, { title: novoNome });
      setFilmes(listaAtualizada);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando filmes...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Catálogo de Filmes</h1>

        <form onSubmit={handleCriarFilme} className={styles.form}>
          <div className="form-group">
            <Input
              label="Adicionar Filme"
              placeholder="Digite o nome do novo filme que deseja adicionar..."
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary">
            Adicionar
          </Button>
        </form>
      </header>

      <div className={styles.grid}>
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
