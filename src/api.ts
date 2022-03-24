import axios from 'axios';

export const api = () => {
  return axios.create({
    baseURL: 'https://char-recognizer-nodejs-api.herokuapp.com/api'
  });
}