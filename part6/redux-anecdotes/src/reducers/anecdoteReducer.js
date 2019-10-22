import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = action.data
      console.log(votedAnecdote)
      const anecdotes = state.map(anecdote =>
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
      )
      return sortAnecdotes(anecdotes)
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const createAnecdote = (anecdoteText) => {
  return async dispatch => {
    const object = {
      content: anecdoteText,
      id: getId(),
      votes: 0
    }
    const newAnecdote = await anecdoteService.create(object)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: sortAnecdotes(anecdotes)
    })
  }
}

export default reducer