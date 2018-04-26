import axios from 'axios'
import { API_URL, DEVELOPMENT } from '../constants'

var rest = axios.create({
    baseURL: API_URL,
    timeout: 10000,
})