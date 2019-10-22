import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}\\${id}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const modifyOne = async(id, object) => {
  const response = await axios.put(`${baseUrl}\\${id}`, object)
  console.log(`modifyOne ${response.data}`)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const vote = async (id) => {
  const anecdote = await getOne(id)
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const responsePut = await modifyOne(id, votedAnecdote)
  return responsePut
}
export default { getAll, create, getOne, vote }