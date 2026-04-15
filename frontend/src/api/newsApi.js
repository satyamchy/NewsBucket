import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/v1'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

export const fetchNews = async (category) => {
  const response = await api.post('/news', { category })
  return response.data
}

export const fetchCategories = async () => {
  const response = await api.get('/categories')
  return response.data
}