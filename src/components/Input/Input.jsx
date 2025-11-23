import styles from "./Input.module.css";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        className={styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
