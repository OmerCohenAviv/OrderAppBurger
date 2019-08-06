import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burgerapp-c80b2.firebaseio.com'
});

export default instance;