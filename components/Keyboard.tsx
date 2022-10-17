import { useEffect, useState } from "react";

export default function Keyboard() {

    useEffect(() => {
        window.addEventListener('keydown', ({key}) => {
            console.log(key)
        })
    })
    
    return (
        <div>
            <h1> Keyboard</h1>
        </div>
    )

}