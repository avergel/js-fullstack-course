import React from 'react'

const errorClass = {
  color: 'red',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
}

const infoClass = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
}
const Notification = ({ message, className }) => {
    if (message === null) {
      return null
    }
    const cssClass = className === 'error' ? errorClass : infoClass
  
    return (
      <div style={cssClass}>
        {message}
      </div>
    )
  }

  export default Notification