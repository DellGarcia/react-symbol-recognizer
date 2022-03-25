import axios from 'axios';

export default axios.create({
    baseURL: 'https://char-recognizer-nodejs-api.herokuapp.com/api'
});
