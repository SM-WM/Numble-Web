import styles from './StatTile.module.css'

type StatTileProps = {
    label: string;
    value: number
};

export default function StatTile({label, value}: StatTileProps) {

    return(
        <div className={styles.tile}>
            <div className={styles.value}>{value}</div>
            <div className={styles.label}>{label}</div>
        </div>
    )
}