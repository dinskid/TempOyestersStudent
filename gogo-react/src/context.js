import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './helpers/axiosInstance';
import Cookies from 'universal-cookie';
import Favicon from 'react-favicon';
import Logo from './data/Logo';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('?tutor_id=1');
  const [params, setParams] = useState(1);
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [favicon, setFavicon] = useState('');

  const cookies = new Cookies();

  console.log(`/student/clientDetails/${params}`);
  const Test = cookies.get('Value');

  const getData = async () => {
    const result = await axiosInstance.get(`/student/clientDetails/${params}`);
    console.log(result);
    setName(result.data.customer_institute_name);
    setFavicon(result.data.customer_institute_logo_favicon_icon_url);
    setLogo(result.data.customer_institute_logo_url);
  };

  document.title = name;

  // useEffect(() => {
  //   sessionStorage.setItem('params', id);
  //   sessionStorage.setItem('url', Url);
  // }, []);
  const search = window.location.search;
  const href = window.location.href;
  const url = new URL(href);
  const id = url.searchParams.get('tutor_id');

  useEffect(() => {
    // setQuery(cookies.get('Params'));
    // setParams(cookies.get('Value'));
    if (search) {
      setQuery(search);
      setParams(id);
      console.log(params);
    } else {
      setQuery((old) => {
        return old;
      });
      setParams((old) => {
        return old;
      });
    }

    getData();
    // window.onload = function () {
    //   if (!window.location.hash) {
    //     window.location = window.location + '#loaded';
    //     window.location.reload();
    //     window.location.reload();
    //   }
    // };
  }, [query]);

  console.log(query);

  return (
    <AppContext.Provider value={{ query, params, name, logo, favicon }}>
      <Favicon url={favicon} />
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
