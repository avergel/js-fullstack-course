import axios from 'axios'
import backendServer from '../utils/config'

const baseUrl = `${backendServer}/api/blogs`

let token = null 

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request =  axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

export default { getAll, setToken, create }