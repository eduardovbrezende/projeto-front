import styles from "./Button.module.css";

const Button = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  style,
}) => {
  const className = `${styles.btn} ${styles[variant]}`;

  return (
    <button type={type} className={className} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;
