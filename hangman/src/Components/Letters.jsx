import React from "react"

export default function Letters(props){
    
    return (
        <button className={`letter ${props.letterObj.selected}`} onClick={() => props.letterClicked(props.letterObj)}>
            {props.letterObj.letter}
        </button>
    )
}