import React from "react"

export default function Lost(props){
    return (
        <div className="lostPageContainer">
            <div className="lostTitle">LOST</div>
            <div className="lostWord">Final Word: {props.finalWord}</div>
            <button onClick={props.playAgain}>Play Again</button>
        </div>
    )
}