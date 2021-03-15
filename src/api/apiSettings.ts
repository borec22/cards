import axios from 'axios';

export const settings = {
   withCredentials: true,
}

export let instance = axios.create({
   baseURL: 'https://neko-back.herokuapp.com/2.0/',
   // baseURL: 'http://localhost:7542/2.0/',
   ...settings
})