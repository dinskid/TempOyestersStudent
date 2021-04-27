import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './helpers/axiosInstance';

const AppContext = createContext();
const value = localStorage.getItem('params');
const Params = localStorage.getItem('url');

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState(value);
  const [params, setParams] = useState(Params);
  const [name, setName] = useState('');

  console.log(query);

  const getData = async () => {
    const result = await axiosInstance.get(`/student/clientDetails/${query}`);
    console.log(result);
    setName(result.data.customer_institute_name);
  };

  const search = window.location.search;
  const location = window.location.href;
  const url = new URL(location);
  const id = url.searchParams.get('tutor_id');

  // useEffect(() => {
  //   sessionStorage.setItem('params', id);
  //   sessionStorage.setItem('url', Url);
  // }, []);

  useEffect(() => {
    localStorage.setItem('params', 1);
    localStorage.setItem('url', '?tutor_id=1');
    getData();
  }, []);

  return (
    <AppContext.Provider value={{ query, params, name }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
