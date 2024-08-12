import axios from 'axios';


const URL = process.env.REACT_APP_API_URL + '/api/v1'


const PRIMARY_API = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

const API = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    }
})


API.interceptors.request.use((config) => {
    const TOKEN = localStorage.getItem('scnToken')
    if (TOKEN) {
        config.headers['Authorization'] = 'Token ' + TOKEN
    }
    return config
})

API.interceptors.response.use(
    config => Promise.resolve(config),
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('scnToken');
            window.location.replace('/')
        }
        return Promise.reject(error)
    })



PRIMARY_API.interceptors.request.use((config) => {
    const TOKEN = localStorage.getItem('prmToken')
    if (TOKEN) {
        config.headers['Authorization'] = 'Token ' + TOKEN
    }
    return config
})


PRIMARY_API.interceptors.response.use(config => Promise.resolve(config), (error) => {
    if (error.response && error.response.status === 401) localStorage.removeItem('prmToken');
    return Promise.reject(error)
})


export {
    PRIMARY_API, API
}