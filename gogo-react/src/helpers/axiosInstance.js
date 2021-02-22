import axios from 'axios';

const Instance = axios.create({
  // baseURL: `${window.location.protocol}//${window.location.hostname}`,
  // baseURL: `${window.location.protocol}//${window.location.hostname}:5000`,
  baseURL:'http://localhost:5000/',
  // credentials: 'include',
  headers:{
    "content-type":"application/json"
  },
  withCredentials: true,
});

export default Instance;
