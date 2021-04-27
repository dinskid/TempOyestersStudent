import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './helpers/axiosInstance';
import Cookies from 'universal-cookie';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [params, setParams] = useState('');
  const [name, setName] = useState('');

  const cookies = new Cookies();

  console.log(`/student/clientDetails/${params}`);
  const Test = cookies.get('Value');

  const getData = async () => {
    const result = await axiosInstance.get(`/student/clientDetails/${Test}`);
    console.log(result);
    setName(result.data.customer_institute_name);
  };

  // useEffect(() => {
  //   sessionStorage.setItem('params', id);
  //   sessionStorage.setItem('url', Url);
  // }, []);

  useEffect(() => {
    setQuery(cookies.get('Params'));
    setParams(cookies.get('Value'));
    getData();
  }, []);

  console.log(query);

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
