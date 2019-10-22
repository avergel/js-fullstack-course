import axios from 'axios'
import backendServer from '../utils/config'

const baseUrl = `${backendServer}/api/login`

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }