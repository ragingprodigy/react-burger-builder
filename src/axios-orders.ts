import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-ph.firebaseio.com/',
});

export default instance;
