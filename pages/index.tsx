import type { NextPage } from 'next'
import Help from './help'
import Keyboard from '../components/Keyboard'
import Statistics from './statistics'
import Letter from '../components/Letter'
import HowToPlay from '../components/HowToPlay'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Help  />
      <Statistics />
      <Letter />
      <Keyboard />
      <h1>Hello</h1>
      <p className='test'> ANOTHER TEST</p>
    </div>
  )
}

export default Home
