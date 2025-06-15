import axios from 'axios'
import { apiUrl } from '../config';

const API_URL = `${apiUrl}/users`

export const registerUser = async (data) => {
  return await axios.post(API_URL, data)
}

export const loginUser = async (data) => {
  return await axios.post(`${API_URL}/login`, data, { withCredentials: true })
}
