import React from "react"
import Letters from "./Letters"
import Word from "./Word"
import Lives from "./Lives"
import Timer from "./Timer"
import Score from "./Score"

export default function Game(props){
    const temp = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const [alphabet, setAlphabet] = React.useState(getAlphabet)
    const [score, setScore] = React.useState(0)

    const [word, setWord] = React.useState({
        word: "Unavailable",
        wordAry: ["_","_","_","_","_","_","_","_","_","_","_"]
    })

    const [refresh, setRefresh] = React.useState(false)

    async function getWord(){
        const res = await fetch('https://random-word-api.herokuapp.com/word')
        const data = await res.json()

        const tempWord = data[0]
        const tempAry = tempWord.split("").map(x=>"_")
        setWord({
            word: tempWord.toLowerCase(),
            wordAry: tempAry
        })
    }

    React.useEffect(()=>{getWord()},[refresh])

    function getAlphabet(){
        return temp.map((letter, index) => {
            return {
                letter: letter,
                selected: '',
                position: index
            }
        })
    }

    function checkLives(){
        if(props.Lives <= 0 ){
            props.Lost(word)
            return false
        }
        return true
    }

    function refreshGame(){
        props.UpdateLives(props.Lives+4)
        setAlphabet(
            temp.map((letter, index) => {
                return {
                    letter: letter,
                    selected: '',
                    position: index
                }
            }))
        setRefresh(!refresh)
    }

    function checkWinner(){
        if(!word.wordAry.includes("_")){
            props.UpdateTime(60)
            setScore(prev => prev + 1)
            refreshGame()
            return true
        }
        return false
    }

    function checkLetter(letter, pos){
        setAlphabet(prevAlphabet => prevAlphabet.map(Letter => {
            if(Letter.position === pos){
                if(word.word.includes(letter)){
                    setWord(prevWord => {
                        return {
                            ...prevWord,
                            wordAry: prevWord.word.split("").map((x,index)=>x===letter?letter:prevWord.wordAry[index])
                        }
                    })
                    return {...Letter, selected: "letterCorrect"}
                }
                else{
                    props.UpdateLives(props.Lives - 1)
                    return {...Letter, selected: "letterWrong"}
                }
            }
            else{
                return {...Letter}
            }   
        }))
    }

    function letterClicked(obj){
        const letter = obj.letter
        const pos = obj.position
        if(checkLives() && !checkWinner()){
            checkLetter(letter, pos)
        }
    }
    
    function reset(){
        props.resetGame()
        setScore(0)
        setAlphabet(getAlphabet)
        setRefresh(!refresh)
    }

    function title(){
        props.goToTitle()
        setScore(0)
    }

    React.useEffect(
        ()=>{
            checkWinner()
        },
        [word.wordAry]
    )

    React.useEffect(()=>{checkLives()},[props.Lives])
    React.useEffect(()=>{props.UpdateHighScore(score)}, [score])

    return (
        <div className="gameContainer">
            <div className="gameHeader">
                <button onClick={title}>title</button>
                <h1>Hangman</h1>
                <button onClick={reset}>reset</button>
            </div>
            <div className="gameDesc">
                For every word guessed: +4 lives AND +60 seconds
            </div>
            <div className="gameLetters">
                {alphabet.map(
                    (obj, index) => {
                        return <Letters 
                            letterObj={obj} 
                            letterClicked={(letterClicked)} 
                            key={index}/>
                    })}
            </div>
            <Word Word={word}/>
            <Lives Lives={props.Lives}/>
            <div className="stContainer">
                <Score Score={score} st="S"/>
                <Timer 
                    timesUp={() => props.Lost(word)} 
                    time={props.Time}
                    updateTime={props.UpdateTime}
                    />
                <Score Score={props.HighScore} st="HS"/>
            </div>

        </div>
    )
}