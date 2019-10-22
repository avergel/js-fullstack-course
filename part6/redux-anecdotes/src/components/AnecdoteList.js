import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const { anecdotesToShow } = props

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>

  )
}

const filterAnecdotes = ({ anecdotes, filter }) => {
  return anecdotes.filter(a => a.content.includes(filter))
}
const mapStateToProps = (state) => {
  return {
    anecdotesToShow: filterAnecdotes(state),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setNotification,
  voteAnecdote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)