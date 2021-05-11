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

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [quiz_time, setQuiz_time] = useState('');
  const [quiz_questions, setQuiz_questions] = useState('');
  const [quiz_name, setQuiz_name] = useState('');
  const [userName, setUserName] = useState('');
  const [ProfilePicture, setProfilePicture] = useState('');

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${window.location.protocol}//${window.location.hostname}:5000/student/quiz/getQuiz/Geographypaper2`
      );
      console.log(response);
      setData(response.data);
      setQuiz_time(response.data.quiz_timer_time);
      setQuiz_questions(response.data.quiz_all_question);
      setQuiz_name(response.data.quiz_name);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const getData = async () => {
      const result = await axiosInstance.get('/student/auth/profile');
      console.log(result);
      setUserName(result.data.result.student_first_name);
      setProfilePicture(result.data.result.student_profile_picture);
      setStudentId(result.data.result.student_id);
    };
    getData();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const getQuizStartTime = async () => {
      const result = await axiosInstance.get(
        `${window.location.protocol}//${window.location.hostname}:5000/student/quiz/canQuizStart/demo`
      );
      console.log(result);
      localStorage.setItem('STARTQUIZ', result.data);
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
        loading,
        quiz_time,
        quiz_questions,
        quiz_name,
        userName,
        ProfilePicture,
        fetchQuestions,
        quizStartTime,
        studentId,
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
