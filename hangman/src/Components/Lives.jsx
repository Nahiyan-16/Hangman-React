import React from "react"

export default function Lives(props){
    return(
        <div className="livesContainer">
            Lives left: {props.Lives}
        </div>
    )
}