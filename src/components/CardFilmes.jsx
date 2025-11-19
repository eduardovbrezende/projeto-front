import Button from "./Button/Button";

// Pega a URL base das imagens do .env
const imgBaseUrl = import.meta.env.VITE_TMDB_IMG;

function CardFilmes({ filme, onEdit, onDelete }) {
  // Lógica para definir a imagem
  const imagemUrl = filme.poster_path
    ? `${imgBaseUrl}${filme.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  return (
    <div style={styles.card}>
      <img src={imagemUrl} alt={filme.title} style={styles.image} />

      <div style={styles.content}>
        <h3 style={styles.title}>{filme.title}</h3>
        <p style={styles.rating}>⭐ {filme.vote_average}</p>

        <div style={styles.actions}>
          <Button onClick={() => onEdit(filme.id, filme.title)} variant="info">
            Editar
          </Button>
          <div style={{ width: "10px" }}></div> {/* Espacinho */}
          <Button onClick={() => onDelete(filme.id)} variant="danger">
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}

// Estilos locais para organizar o componente
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  title: {
    fontSize: "16px",
    margin: "0 0 10px 0",
    height: "44px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  rating: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },
  actions: {
    marginTop: "auto",
    display: "flex",
    gap: "10px",
  },
  btn: {
    flex: 1,
    padding: "8px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
  },
};

export default CardFilmes;
