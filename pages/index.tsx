import type { NextPage } from 'next'
import Help from './help'
import Statistics from './statistics'
import styles from '../styles/Home.module.css'
import GameBoard from '../components/Board/GameBoard'
import { useState } from 'react'

const Home: NextPage = () => {
  function generateNumble(){
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const shuffledDigits = digits.sort(() => 0.5 - Math.random());
    
    // Get sub-array of first n elements after shuffled
   return shuffledDigits.slice(0, 4).join('');
  }
  const[currNumble, setCurrNumble] = useState(generateNumble());

  const NewGame = () => {
    setCurrNumble(generateNumble())
  }

  return (
    <div className='mainBody'>

      <GameBoard correctNumble={currNumble} />
      {/* <Help  />
      <Statistics /> */}
      {/* <button onClick={NewGame}>New Game</button>
      <p>{currNumble}</p> */}
    </div>
  )
}

export default Home
