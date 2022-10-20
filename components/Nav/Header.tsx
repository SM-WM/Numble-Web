import styles from "./Header.module.css";
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import Image from 'next/image'
import numble_logo from '../../public/numble_logo.svg'
import HowToPlay from './HowToPlay'
import Link from 'next/link'

export default function Header() {

    return (
            <nav className={styles.test}>
                <div className={styles.leftAlign} >
                    <Link href="/"><a>
                    <Image src={numble_logo} height={30} width={30}/></a></Link>
                    <div className={styles.title}> Numble </div>
                </div>
                <div className={styles.rightAlign}>
                    <Link href="/settings"><a><SettingsIcon /></a></Link>
                    <Link href="/statistics"><a><BarChartIcon /></a></Link>
                    <HowToPlay />                    
                </div>

                
            </nav>
    )
}

