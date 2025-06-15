import axios from 'axios'

const API_URL = 'http://localhost:4000/users'

export const registerUser = async (data) => {
  return await axios.post(API_URL, data)
}

export const loginUser = async (data) => {
  return await axios.post(`${API_URL}/login`, data, { withCredentials: true })
}
