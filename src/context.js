import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './helpers/axiosInstance';
import Cookies from 'universal-cookie';
import Favicon from 'react-favicon';
import Logo from './data/Logo';
import axios from 'axios';
import axiosInstance2 from './helpers/axiosInstance2';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState(localStorage.getItem('TUTOR_ID_QUERY') || '?tutor_id=1');
  const [params, setParams] = useState(localStorage.getItem('TUTOR_ID') || 1);
  const [name, setName] = useState('');
  const [logo, setLogo] = useState(localStorage.getItem('logo') || '');
  const [favicon, setFavicon] = useState('');
  const [quizStartTime, setQuizStartTime] = useState(
    localStorage.getItem('STARTQUIZ')
  );
  const [canQuizStart, setCanQuizStart] = useState('');
  const cookies = new Cookies();
  const Test = cookies.get('Value');

  // fetching data for logo favicon and title

  const getData = async () => {
    console.log('tutor_id used: ', params);
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
      try {
        console.log('query from url: ', query);
        setQuery(search);
        localStorage.setItem('TUTOR_ID_QUERY', search);

        console.log('id from url: ', id);
        setParams(id);
        localStorage.setItem('TUTOR_ID', id);
      } catch (e) {
        console.log('couldn\'t write TUTOR_ID_QUERY to the localStorage', e);
      }
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
    const studentID = localStorage.getItem('STUDENTID');
    const { quiz_id: quizId } = JSON.parse(localStorage.getItem('STARTQUIZ'));
    if (quizId === undefined) {
      err('You can\'t attempt the quiz now.');
      return;
    }
    try {
      const response = await axiosInstance.get(`/student/quiz/getQuiz/${quizId}/${studentID}`);
      console.log(response);
      setData(response.data);
      setQuiz_time(response.data.quiz_timer_time);
      setQuiz_questions(response.data.quiz_all_question);
      setQuiz_name(response.data.quiz_name);
      succ(response.data.quiz_all_question, response.data.quiz_timer_time, response.data);
    } catch (error) {
      console.log(error);
      err('You cannot attempt the quiz several times');
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
      const result = await axiosInstance.get(`/student/quiz/canQuizStart/${params}`);
      localStorage.setItem('STARTQUIZ', JSON.stringify(result.data));
      setCanQuizStart(result.data);
      console.log(result);
    };
    if (params) getQuizStartTime();
  }, [params]);

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
