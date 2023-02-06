import React from "react"

export default function Score(props){
    return (
        <div className="scoreContainer">
            {props.st === "S" ? "Score: " + props.Score : "High Score: " + props.Score}
        </div>
    )
}