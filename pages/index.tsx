import type { NextPage } from 'next'
import Help from './help'
import Keyboard from '../components/Keyboard'
import Statistics from './statistics'
import Letter from '../components/Letter'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>


      <Help  />
      <Statistics />
      <Letter />
      <Keyboard />
    </div>
  )
}

export default Home
