import React, { useImperativeHandle } from 'react'
import { useField } from '../hooks'

const LoginForm = React.forwardRef((props, ref) => {
  const username = useField('text')
  const password = useField('password')

  const getUsername = () => {
    return username
  }
  const getPassword = () => {
    return password
  }
  useImperativeHandle(ref, () => {
    return { getUsername, getPassword }
  })

  const removeReset = (obj) => {
    const { reset, ...filtered } = obj
    return filtered
  }
  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={props.handleLogin}>
        <div>
          username&nbsp;
        <input {...removeReset(username)}/>
        </div>
        <div>
          password &nbsp;
        <input {...removeReset(password)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
})

export default LoginForm