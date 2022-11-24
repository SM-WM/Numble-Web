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
 

    useEffect(() => {
        const fetchUser = async () => {
          const { data, error } = await apiClient.fetchUserFromToken();

          console.log("this is data", data)
    
          if (data) {
            setUser(data.user);
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
            <Header user={user} setUser={setUser}/>
            <div className={styles.game}>
                <GameBoard  user={user}/>
            </div>      
        </Provider>

    )
}




