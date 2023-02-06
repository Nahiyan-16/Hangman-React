import React from "react"

export default function Word(props){

    return(
        <div className="wordContainer">
            <div className="blankContainer">
                {props.Word.wordAry.map((letter, index) => {
                    return <div key={index}>{letter}</div>
                })}
            </div>
        </div>
    )
}