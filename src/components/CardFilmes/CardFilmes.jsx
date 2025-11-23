import styles from "./CardFilmes.module.css";
import Button from "../Button/Button";

const imgBaseUrl = import.meta.env.VITE_TMDB_IMG;

function CardFilmes({ filme, onEdit, onDelete }) {
  const imagemUrl = filme.poster_path
    ? `${imgBaseUrl}${filme.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  // Lógica de formatação da nota
  const notaFormatada = filme.vote_average
    ? Number(filme.vote_average).toFixed(1)
    : "N/A";

  return (
    <div className={styles.card}>
      <img
        src={imagemUrl}
        alt={filme.title}
        className={styles.image}
        loading="lazy"
      />

      <div className={styles.content}>
        <h3 className={styles.title}>{filme.title}</h3>

        <p className={styles.rating}>⭐ {notaFormatada}</p>

        <div className={styles.actions}>
          <div className={styles.btnWrapper}>
            <Button
              onClick={() => onEdit(filme.id, filme.title)}
              variant="info"
              style={{ width: "100%" }}
            >
              Editar
            </Button>
          </div>

          <div className={styles.btnWrapper}>
            <Button
              onClick={() => onDelete(filme.id)}
              variant="danger"
              style={{ width: "100%" }}
            >
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardFilmes;
