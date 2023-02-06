import React from "react"
import Title from './Components/Title'
import Game from './Components/Game'
import Lost from './Components/Lost'

function App() {
  const [start, setStart] = React.useState(false)
  const [lost, setLost] = React.useState(false)
  const [lostWord, setLostWord] = React.useState(null)
  const [time, setTime] = React.useState(90)
  const [highScore, setHighScore] = React.useState(localStorage.getItem('HighScore')?localStorage.getItem('HighScore'):0)
  const [lives, setLives] = React.useState(8)

  function updateLost(word){
    setLostWord(word.word)
    setLost(true)
  }

  function updateTime(x){
    setTime(prevTime => prevTime + x)

  }

  function startGame(){
    setStart(true)
  }

  function restartGame(){
    setStart(true)
    setLost(false)
    setLives(8)
    setTime(90)
  }

  function backToTitle(){
    setStart(false)
    setLost(false)
    setLives(8)
    setTime(90)
  }

  function updateLives(x){
    setLives(x)
  }

  function updateHighScore(score){
    if(score > highScore){
      setHighScore(score)
      localStorage.setItem('HighScore', score)
    }
  }

  return (
    <div className="App">
        {!start && <Title startGame = {startGame}/>}
        {start && !lost && <Game 
          Lost={updateLost} 
          timeUp={updateLost} 
          Time={time}
          UpdateTime={updateTime}
          goToTitle={backToTitle}
          resetGame={restartGame}
          Lives={lives}
          UpdateLives={updateLives}
          HighScore={highScore}
          UpdateHighScore={updateHighScore}
          />}
        {lost && <Lost finalWord={lostWord} playAgain={restartGame}/>}
    </div>
  );
}

export default App;
