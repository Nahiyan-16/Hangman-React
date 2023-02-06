import React from "react"
import hangman from "../Images/hangman.png"
import {useSpring, animated} from "react-spring"

export default function Title(props){
    const from = {
        opacity: 0,
        transform: 'translate(-500px, 0px)'
    }
    const to = {
        opacity: 1,
        transform: 'translate(0px, 0px)'
    }

    return(
        <div className="titleContainer">
            <div className="title">
                <animated.div style={useSpring({from: from,to:to,delay: 500,config: {duration: 1000}})}><h1>World's</h1></animated.div>
                <animated.div style={useSpring({from: from,to:to,delay: 1500,config: {duration: 1000}})}><h1>Deadliest </h1></animated.div>
                <animated.div style={useSpring({from: from,to:to,delay: 2500,config: {duration: 1000}})}><h1>Hangman</h1></animated.div>
            </div>
            <animated.div style={useSpring({from: {opacity:0},to:{opacity:1},delay: 3500,config: {duration: 1000}})}>
                <button onClick={props.startGame}>Start</button>
            </animated.div>
        </div>
    )
}