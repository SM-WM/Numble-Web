import styles from "./Header.module.css";
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import Image from 'next/image'
import numble_logo from '../../public/numble_logo.svg'
import HowToPlay from './HowToPlay'
import { useAppDispatch } from "../../store/hooks"
import { gameActions } from "../../store/game-slice";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

export default function Header() {
    const dispatch = useAppDispatch();
    const resetGameHandler = () => {
        dispatch(gameActions.resetGame());
    };
    const showStatHandler = () =>{
        dispatch(gameActions.showStat());
    };

    return (
            <nav>
                <div className={styles.wrapper} >
                    <ul className={styles.ul}>
                        <li className={styles.leftAlign}>
                            <Image src={numble_logo} alt="Numble_logo" height={35} width={35}/>
                            <div className={styles.title}> Numble </div>
                        </li>
                        <li className={styles.rightAlign}>
                            <button onClick={resetGameHandler}><RefreshOutlinedIcon sx={{color: 'black'}} /></button>
                            {/* <Link href="/settings"><a><SettingsIcon height={35} width={35} sx={{color: 'black'}} /></a></Link> */}
                            <button onClick={showStatHandler}><BarChartIcon sx={{color: 'black'}} /></button>
                            <HowToPlay />  
                        </li>
                    </ul>
                </div> 
            </nav>
    )
}

