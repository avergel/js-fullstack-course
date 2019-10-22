import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const createNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={createNew}>
        <div>
          <input name="anecdote" /> &nbsp;
          <button type="submit">create</button>
        </div>
      </form>
      <br />
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)