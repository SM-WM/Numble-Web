import styles from "./Number.module.css";


type NumberProps = {
    content: string;
};

export default function({content}: NumberProps) {
    return (
        <span className={styles.char}>{content}</span>
    )
}
