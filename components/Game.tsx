import GameBoard from '../components/Board/GameBoard'
import styles from './Game.module.css'
import { Provider } from "react-redux";
import store from "../store/store"
import Header from '../components/Nav/Header'
    


export default function Game () {

    return(
        <Provider store={store}>
            <Header />
            <div className={styles.game}>
                <GameBoard />
            </div>      
        </Provider>

    )
}


