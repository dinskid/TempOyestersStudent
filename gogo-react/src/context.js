import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './helpers/axiosInstance';
import Cookies from 'universal-cookie';
import Favicon from 'react-favicon';
import Logo from './data/Logo';
import axios from 'axios';
import axiosInstance2 from './helpers/axiosInstance2';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('?tutor_id=1');
  const [params, setParams] = useState(1);
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [favicon, setFavicon] = useState('');
  const [quizStartTime, setQuizStartTime] = useState(
    localStorage.getItem('STARTQUIZ')
  );
  const [canQuizStart, setCanQuizStart] = useState('');
  const cookies = new Cookies();
  const Test = cookies.get('Value');

  // fetching data for logo favicon and title

  const getData = async () => {
    const result = await axiosInstance.get(`/student/clientDetails/${params}`);
    console.log(result);
    setName(result.data.customer_institute_name);
    setFavicon(result.data.customer_institute_logo_favicon_icon_url);
    setLogo(result.data.customer_institute_logo_url);
  };

  document.title = name;

  const search = window.location.search;
  const href = window.location.href;
  const url = new URL(href);
  const id = url.searchParams.get('tutor_id');

  // fetching query params from url

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
    // window.onload = function () {
    //   if (!window.location.hash) {
    //     window.location = window.location + '#loaded';
    //     window.location.reload();
    //     window.location.reload();
    //   }
    // };
  }, [search]);

  useEffect(() => {
    // localStorage.setItem('QUERY', query);
    // localStorage.setItem('PARAMS', params);
    getData();
  }, [query, params]);

  console.log(query);

  const [data, setData] = useState();
  const [quiz_time, setQuiz_time] = useState('');
  const [quiz_questions, setQuiz_questions] = useState('');
  const [quiz_name, setQuiz_name] = useState('');

  // fetching quiz data

  const fetchQuestions = async (succ, err) => {
    try {
      const response = await axios.get(
        `${window.location.protocol}//${window.location.hostname}:5000/student/quiz/getQuiz/1`
      );
      console.log(response);
      setData(response.data);
      setQuiz_time(response.data.quiz_timer_time);
      setQuiz_questions(response.data.quiz_all_question);
      setQuiz_name(response.data.quiz_name);
      succ();
    } catch (error) {
      console.log(error);
      err();
    }
  };

  // useEffect(() => {
  //   const getProfile = async () => {
  //     const result = await axiosInstance.get(`/student/auth/profile`);
  //     console.log(result);
  //     setUserName(result.data.result.student_first_name);
  //     setProfilePicture(result.data.result.student_profile_picture);
  //     setStudentId(result.data.result.student_id);
  //     localStorage.setItem('STUDENTID', result.data.result.student_id);
  //     localStorage.setItem('USERNAME', result.data.result.student_first_name);
  //     localStorage.setItem(
  //       'PROFILEPICTURE',
  //       result.data.result.student_profile_picture
  //     );
  //   };
  //   getProfile();
  // }, []);

  // useEffect(() => {
  //   fetchQuestions();
  // }, []);

  // fetching quiz start timer

  useEffect(() => {
    const getQuizStartTime = async () => {
      const result = await axiosInstance.get(`/student/quiz/canQuizStart/1`);
      localStorage.setItem('STARTQUIZ', result.data);
      setCanQuizStart(result.data);
      console.log(result);
    };
    getQuizStartTime();
  }, []);

  return (
    <AppContext.Provider
      value={{
        query,
        params,
        name,
        logo,
        favicon,
        data,
        quiz_time,
        quiz_questions,
        quiz_name,
        fetchQuestions,
        quizStartTime,
        canQuizStart,
      }}
    >
      <Favicon url={favicon} />
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
