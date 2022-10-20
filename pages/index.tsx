import type { NextPage } from 'next'
import Help from './help'
import Keyboard from '../components/Keyboard/Keyboard'
import Statistics from './statistics'
import styles from '../styles/Home.module.css'
import GameBoard from '../components/Board/GameBoard'

const Home: NextPage = () => {
  return (
    <div className='mainBody'>

      <GameBoard />
      {/* <Help  />
      <Statistics /> */}
      <Keyboard />
    </div>
  )
}

export default Home
