import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
})

export const insertUser = payload => api.post(`user`, payload)
export const updateUserById = (id, payload) => api.put(`user/${id}`, payload)
export const getUserById = id => api.get(`user/${id}`)

export const getAllUsers = () => api.get(`/users`)

const apis = {
  insertUser,
  updateUserById,
  getAllUsers,
  getUserById,
}

export default apis