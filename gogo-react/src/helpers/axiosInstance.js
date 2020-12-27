import axios from 'axios';
import { getCurrentUser } from './Utils';

// export const axiosInstance = () => axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL,
//   headers: {
//     Authorization:`Bearer ${localStorage.token}`,
//   }
// })

// baseURL: process.env.REACT_APP_BACKEND_URL,

// token = getCurrentUser() ? getCurrentUser().frontend_token : null;

const getToken = () => {
  const user = getCurrentUser();
  if (!user || !user.uid) {
    return null;
  }
  // console.log(user.frontend_token);
  return user.uid;
};

const Instance = axios.create({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export default Instance;

// export default (history = null) => {
//   const baseURL = process.env.REACT_APP_BACKEND_URL;

//   let headers = {};

//   if (localStorage.token) {
//     headers.Authorization = `Bearer ${localStorage.token}`;
//   }

//   const axiosInstance = axios.create({
//     baseURL: baseURL,
//     headers,
//   });
//   return axiosInstance;
// };
