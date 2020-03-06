import React from "react"
import "./Win.scss"

const Win = props => {
  return (
    <div className="win-wrapper">
      <div className="win-container">
        <h2 className="win-message">{props.message}</h2>
        <button className="win-button" onClick={props.reset}>
          Try Again
        </button>
      </div>
    </div>
  )
}

export default Win
