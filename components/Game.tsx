import GameBoard from '../components/Board/GameBoard'
import styles from './Game.module.css'
import { Provider } from "react-redux";
import store from "../store/store"
import Header from '../components/Nav/Header'
import apiClient from '../services/apiClient';
import { useState, useEffect } from "react";




export default function Game(){

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    played: 0,
    previous: 0,
    winpcnt: 0,
    streak: 0,
    maxstreak: 0,
    wins: 0,
  })
 

    useEffect(() => {
        const fetchUser = async () => {
          const { data, error } = await apiClient.fetchUserFromToken();

         
    
          if (data) {
            setUser(data.user);
            const item = await apiClient.getStatistics(data.user.id)
            
            setStats(item.data.stats)
          }
          if (error) {
            setError(error);
          }
          setIsLoading(false);
        };
    
        setIsLoading(true);
        const token = localStorage.getItem("numble_token");
        if (token) {
          apiClient.setToken(token);
          fetchUser();
        } else {
          setIsLoading(false);
        }

      
      }, []);


      


    return(
        <Provider store={store}>
            <Header user={user} setUser={setUser} setStats={setStats}/>
            <div className={styles.game}>
                <GameBoard  user={user} stats={stats} setStats={setStats}/>
            </div>      
        </Provider>

    )
}




