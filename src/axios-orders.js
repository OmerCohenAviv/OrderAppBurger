import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burgerapp-b57d2.firebaseio.com/'
});

export default instance;