import React from 'react'

const Button = (props) => <button style={{"margin-left": "10"}} onClick={props.handleClick}>{props.text}</button>

export default Button;