import styles from "./Header.module.css";
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import Image from 'next/image'
import numble_logo from '../public/numble_logo.svg'
import HowToPlay from '../components/HowToPlay'
import Link from 'next/link'
import { useState } from "react";

export default function Header() {

    return (
        <div className="navstyle">
            <nav className='flex items-center flex-wrap p-3 '>
                <Image src={numble_logo} height={30} width={30}/>
                <div className={styles.title}> Numble </div>
                <Link href="/settings"><a><SettingsIcon /></a></Link>
                <Link href="/statistics"><a><BarChartIcon /></a></Link>
                <HowToPlay />
            </nav>
        </div>
    )

}

//'flex items-center flex-wrap p-3 '
