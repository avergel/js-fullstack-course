import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (props.notification !== null) {
    return (
      <div>
        <div style={style}>
          {props.notification}
        </div>
      </div>
    )
  } else
    return null
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}
export default connect(mapStateToProps)(Notification)