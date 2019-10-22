export const setNotification = (text, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: text
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)

  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default reducer