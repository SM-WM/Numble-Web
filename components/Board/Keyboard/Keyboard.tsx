import { useEffect, useMemo, useState } from "react";
import styles from './Keyboard.module.css'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import Key from "./Key"

type keyPressHandlerType = (key: string) => void

type KeyboardProps = {
    keyPressHandler: keyPressHandlerType
}
//123456
//backspace 789 enter
export default function Keyboard({keyPressHandler}: KeyboardProps) {
    
    const firstRow = useMemo(() => {
        return "0123456".split("").map((char) => {
            return <Key keyPressHandler={keyPressHandler} key={char} keyName={char} keyDisplay={char}/>
        });
    }, [keyPressHandler])
    const secondRow = useMemo(() => {
        return "789".split("").map((char) => {
            return <Key keyPressHandler={keyPressHandler} key={char} keyName={char} keyDisplay={char}/>
        });
    }, [keyPressHandler])

    const backspace = useMemo(() => {
        // return <span className={`${styles.key} ${styles.backspace}`}><BackspaceOutlinedIcon /></span>
        return <Key keyPressHandler={keyPressHandler} keyDisplay={<BackspaceOutlinedIcon />} keyName={"Backspace"} specialKey={true} />
    }, [keyPressHandler])

    const enter = useMemo(() => {
        // return <span className={`${styles.key} ${styles.backspace}`}><KeyboardReturnOutlinedIcon /></span>
        return <Key keyPressHandler={keyPressHandler} keyDisplay={<KeyboardReturnOutlinedIcon />} keyName={"Enter"} specialKey={true} />
    }, [keyPressHandler])

    return (
        <div className={styles.wrapper}>
            <div  className={styles.row}>{firstRow}</div>
            <div  className={styles.row}>{backspace}{secondRow}{enter}</div>
        </div>
    )

}