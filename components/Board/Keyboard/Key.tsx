import { Component } from 'react';
import styles from './Key.module.css'

type KeyProps = {
    specialKey?: boolean
    keyName: string;
    keyPressHandler: (key: string) => void;
    keyDisplay: any
}

export default function Key({keyName, keyPressHandler, keyDisplay, specialKey}: KeyProps){
    
    return(
        <span 
            className={`${styles.key}
                        ${(specialKey? styles.specialKey : '')}`}
            onClick = {() => {
                keyPressHandler(keyName)
                console.log(keyName)
                }}
        >
            {keyDisplay}
        </span>
    )
}