import type { NextPage } from 'next'
import Help from './help'
import Keyboard from '../components/Keyboard/Keyboard'
import Statistics from './statistics'
import styles from '../styles/Home.module.css'
import GameBoard from '../components/Board/GameBoard'

const Home: NextPage = () => {
  function generateNumble(){
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const shuffledDigits = digits.sort(() => 0.5 - Math.random());
    
    // Get sub-array of first n elements after shuffled
   return shuffledDigits.slice(0, 4).join('');
  }

  const currNumble = generateNumble();

  return (
    <div className='mainBody'>

      <GameBoard correctNumble={currNumble} />
      {/* <Help  />
      <Statistics /> */}
      <Keyboard />
    </div>
  )
}

export default Home
