import React, { createContext, useContext, useState, useEffect } from 'react';
import Query from './data/query';
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  // useEffect(() => {
  //   const Data = async () => {
  //     const result = await axiosInstance.get(`/student/clientDetails/${query}`);
  //     console.log(result);
  //   };
  //   Data();
  // }, []);

  return (
    <AppContext.Provider value={{ query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
