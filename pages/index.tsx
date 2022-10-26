import type { NextPage } from 'next'
import Help from './help'
import Statistics from './statistics'
import styles from '../styles/Home.module.css'
import Game from '../components/Game'
import GameBoard from '../components/Board/GameBoard'
import { useState } from 'react'

const Home: NextPage = () => {

  return (
    <div>
      <Game />
    </div>
  )
}

export default Home
