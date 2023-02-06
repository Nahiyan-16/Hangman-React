import React from "react"

export default function Timer(props){

    React.useEffect(() => {
      let interval = null
      if (props.time) {
        interval = setInterval(() => {
          props.updateTime(-1)
        }, 1000)
      } else {
        clearInterval(interval)
        props.timesUp()
      }
      return () => clearInterval(interval)
    }, [props.time])

    return (
        <div className="timerContainer">
            <h2>Time Left: {props.time}</h2>
        </div>
    )
}