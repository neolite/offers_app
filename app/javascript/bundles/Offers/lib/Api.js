import axios from 'axios'
import ReactOnRails from "react-on-rails";

const csrfToken = ReactOnRails.authenticityToken()

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
axios.defaults.headers.common['Content-Type'] = 'application/json'

const Api = axios.create({
    timeout: 10000,
});

export default Api;