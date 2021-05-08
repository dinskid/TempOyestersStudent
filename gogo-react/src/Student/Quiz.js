import React, { useState, useEffect } from 'react';
import { MdPerson } from 'react-icons/md';
import { IoMdHelp } from 'react-icons/io';
import axios from 'axios';
import { useGlobalContext } from '../context';
import './quiz.css';
import axiosInstance2 from '../helpers/axiosInstance2';
import { useHistory } from 'react-router-dom';
import avatar from './app/pages/profile/Asset 1.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Quiz() {
  const {
    loading,
    quiz_time,
    quiz_name,
    quiz_questions,
    userName,
    ProfilePicture,
  } = useGlobalContext();

  let history = useHistory();

  const [authorOpen, setAuthorOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalTime, setTotalTime] = useState(
    JSON.parse(localStorage.getItem('TIME'))
  );

  const [second, setSecond] = useState(60);

  const [quizData, setQuizData] = useState(
    JSON.parse(localStorage.getItem('DATA'))
  );
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('QUIZ_DATA'))
  );

  const [answerSelectID, setAnswerSelectID] = useState(-1);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [finalValues, setFinalValues] = useState({
    quiz_name: data.quiz_name,
    quiz_id: data.quiz_id,
  });

  // creating new object properties

  const value = quizData.map((item) => ({
    ...item,
    Answered: false,
    marked: false,
    notAnswered: false,
    notVisited: true,
  }));
  const [sectionStyle, setSectionStyle] = useState(value);

  const Option = quizData[questionIndex].question_options.map((item) => ({
    ...item,
    checked: false,
  }));

  const [progress, setProgress] = useState(100);
  const [modal, setModal] = useState(false);

  // handle next and prev buttons

  const prevButton = () => {
    setQuestionIndex((oldValue) => {
      let newValue = oldValue - 1;
      if (newValue < 0) {
        return 0;
      }
      return newValue;
    });
    sectionStyle[questionIndex].notVisited = false;
  };

  const nextButton = () => {
    setQuestionIndex((oldValue) => {
      let newValue = oldValue + 1;
      if (newValue > quizData.length - 1) {
        return quizData.length - 1;
      }
      return newValue;
    });
    sectionStyle[questionIndex].notAnswered = true;
    sectionStyle[questionIndex].notVisited = false;
  };

  // timer

  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (counter > 60) {
      setCounter(0);
      setTimeElapsed(timeElapsed + 1);
    }
  }, [counter]);

  useEffect(() => {
    setTotalTime((old) => {
      let newValue = old - 1;
      if (newValue < 0) {
        return -1;
      }
      return newValue;
    });
  }, [timeElapsed]);

  useEffect(() => {
    const sec = setInterval(() => setSecond(second - 1), 1000);
    return () => clearInterval(sec);
  }, [second]);

  // select answer event

  const handleSelectAnswer = (e, index, item) => {
    setAnswerSelectID(index);
    setSelectedAnswers([
      ...selectedAnswers,
      {
        question_id: quizData[questionIndex].question_id,
        selectedAnswers: e.currentTarget.value,
        // Answered: sectionStyle[questionIndex].Answered,
        // NotAnswered: sectionStyle[questionIndex].notAnswered,
        // NotVisited: sectionStyle[questionIndex].notVisited,
        // marked: sectionStyle[questionIndex].marked,
      },
    ]);
    sectionStyle[questionIndex].Answered = true;
    item.checked = true;
  };

  // console.log(option);

  useEffect(() => {
    setAnswerSelectID(-1);
  }, [questionIndex]);

  // final submission

  const finalSubmit = async () => {
    console.log(finalValues);
    try {
      const submit = await axios.post(
        `${window.location.protocol}//${window.location.hostname}:4003/submitQuiz`,
        finalValues
      );
      console.log(submit);
      history.push('/app/pages/mycourses');
    } catch (error) {
      console.log(Error);
    }
  };

  useEffect(() => {
    setFinalValues({
      ...finalValues,
      answers: selectedAnswers,
      remaining_time: `${totalTime}:${second}`,
    });
  }, [selectedAnswers]);

  const Style = (item) => {
    if (item.Answered) {
      return 'section-btn answered';
    } else if (item.notAnswered) {
      return 'section-btn not-answered';
    } else {
      return 'section-btn';
    }
  };

  const optionStyle = (item, index) => {
    if (item.checked) {
      return 'option-btn option-btn-active';
    } else {
      return 'option-btn';
    }
  };

  useEffect(() => {
    if (second < 0) {
      setSecond(60);
    }
  }, [second]);

  useEffect(() => {
    if (totalTime < 0) {
      finalSubmit();
      history.push('/app/pages/mycourses');
    }
  }, [totalTime]);

  document.addEventListener(
    'contextmenu',
    function (e) {
      e.preventDefault();
    },
    false
  );

  useEffect(() => {
    const progressBar = setInterval(() => setProgress(progress - 1), 1000);
    return () => clearInterval(progressBar);
  }, [progress]);

  const openPopup = () => {
    setModal(true);
  };

  const closePopup = () => {
    setModal(false);
  };

  useEffect(() => {
    if (totalTime < 5) {
      setModal(true);
    }
  }, [totalTime]);

  if (!quizData) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="quiz-center">
        <MdPerson
          className="section-open"
          onClick={() => setAuthorOpen(!authorOpen)}
        />
        <IoMdHelp
          className="section-open help"
          onClick={() => setSectionOpen(!sectionOpen)}
        />
        <div className="quiz-title">
          <h3>{quiz_name.toUpperCase()} QUIZ</h3>
        </div>
        <section className="quiz">
          <div className="quiz-container">
            {/* quiz header */}
            <div className="quiz-header">
              <button className="quiz-btn" onClick={prevButton}>
                {' '}
                Previous
              </button>
              <div className="question-numbers">
                <h4>
                  QUESTION <span>{questionIndex + 1}</span> OF{' '}
                  <span>{quizData.length}</span>
                </h4>
              </div>
              {quizData.length - 1 === questionIndex ? (
                <button className="quiz-btn" onClick={() => openPopup()}>
                  Submit
                </button>
              ) : (
                <button className="quiz-btn" onClick={nextButton}>
                  Next
                </button>
              )}
            </div>
            {/* quiz-question-container */}

            <div className="quiz-question-container">
              <div className="quiz-question">
                <h4>
                  <span>Q {questionIndex + 1}. </span>
                  {quizData && quizData[questionIndex].question_body}
                </h4>
                {quizData[questionIndex].question_body_img_url && (
                  <div className="question-image-container">
                    <h2>REFERENCE IMAGE</h2>
                  </div>
                )}
              </div>
              <div className="quiz-options option-container">
                {Option.map((item, index) => {
                  return (
                    <div class="option-container">
                      <button
                        // className={`${
                        //   index === answerSelectID
                        //     ? "option-btn option-btn-active"
                        //     : "option-btn"
                        // }`}
                        className={optionStyle(item, index)}
                        key={index}
                        value={item.option_body}
                        onClick={(e) => handleSelectAnswer(e, index, item)}
                      >
                        {item.option_body}
                      </button>
                      {item.option_body_img && (
                        <div className="options-image-container">
                          <h2>REFERENCE IMAGE</h2>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* <label class="container">
                  option A
                  <input type="radio" name="radio" />
                  <span class="checkmark"></span>
                  <div className="options-image-container">
                    <h2>REFERENCE IMAGE</h2>
                  </div>
                </label>
                <label class="container">
                  option B
                  <input type="radio" name="radio" />
                  <span class="checkmark"></span>
                  <div className="options-image-container">
                    <h2>REFERENCE IMAGE</h2>
                  </div>
                </label>
                <label class="container">
                  option C
                  <input type="radio" name="radio" />
                  <span class="checkmark"></span>
                  <div className="options-image-container">
                    <h2>REFERENCE IMAGE</h2>
                  </div>
                </label>
                <label class="container">
                  option D
                  <input type="radio" name="radio" />
                  <span class="checkmark"></span>
                  <div className="options-image-container">
                    <h2>REFERENCE IMAGE</h2>
                  </div>
                </label> */}
              </div>
            </div>
            <div className="mobile-button-container">
              <button className="mobile-btn quiz-btn" onClick={prevButton}>
                Previous
              </button>
              {quizData.length - 1 === questionIndex ? (
                <button
                  className="mobile-btn quiz-btn"
                  onClick={() => openPopup()}
                >
                  Submit
                </button>
              ) : (
                <button className="mobile-btn quiz-btn" onClick={nextButton}>
                  Next
                </button>
              )}
            </div>
          </div>
          <div className="question-section-container">
            <div className="time_profile-container">
              <div className="timer-container">
                <h4>TIME LEFT</h4>
                <div className="timer">
                  <div className="present-time">
                    <div className="progress-bar">
                      <div
                        className="bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <h2>
                      {totalTime}:{second}
                    </h2>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  authorOpen
                    ? 'profile-container profile-container-1'
                    : 'profile-container'
                }`}
              >
                <div className="img">
                  <img
                    src={ProfilePicture || avatar}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    alt="profile-pic"
                  />
                </div>
                <h5>{userName ? userName : 'lorem ipsum'}</h5>
              </div>
            </div>
            <div
              className={`${
                sectionOpen
                  ? 'question-section question-section-1'
                  : 'question-section'
              }`}
            >
              <h4>QUESTION SECTION</h4>
              <div className="sections">
                <div className="btn-container">
                  {sectionStyle.map((item, index) => {
                    return (
                      <button
                        className={Style(item)}
                        onClick={() => setQuestionIndex(index)}
                      >
                        {index + 1}{' '}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* <div className="sections">
                <h4>Section A</h4>
                <div className="btn-container">
                  <button className="btn answered">1</button>
                  <button className="btn ">2</button>
                  <button className="btn not-answered">3</button>
                  <button className="btn not-answered">4</button>
                  <button className="btn marked">5</button>
                  <button className="btn not-answered">6</button>
                  <button className="btn answered">7</button>
                  <button className="btn answered">8</button>
                  <button className="btn not-answered">9</button>
                  <button className="btn answered">10</button>
                  <button className="btn answered">11</button>
                  <button className="btn">12</button>
                  <button className="btn not-answered">13</button>
                  <button className="btn answered">14</button>
                </div>
              </div>
              <div className="sections">
                <h4>Section B</h4>
                <div className="btn-container">
                  <button className="btn answered">15</button>
                  <button className="btn answered">16</button>
                  <button className="btn marked">17</button>
                  <button className="btn">19</button>
                  <button className="btn">19</button>
                  <button className="btn">20</button>
                  <button className="btn">21</button>
                  <button className="btn">22</button>
                  <button className="btn">23</button>
                  <button className="btn">24</button>
                  <button className="btn">25</button>
                </div>
              </div> */}
              {/* <div className="marked-btn-container">
                <button className="marked tab">Marked for Review</button>
              </div> */}
            </div>
            <div
              className={`${
                sectionOpen
                  ? 'question-tab-container question-tab-container-1'
                  : 'question-tab-container'
              }`}
            >
              <div className="tab answered">Answered</div>
              <div className=" tab not-answered">Not Answered</div>
              <div className="tab marked">Marked for Review</div>
              <div className="tab not-visited">Not Visited</div>
            </div>
          </div>
        </section>
        <div className={`${modal ? 'popup popup-active' : 'popup'}`}>
          <h3>
            {totalTime < 5
              ? `Your quiz will be automatically submitted after ${totalTime}:${second} minutes`
              : 'Do you want to submit your quiz ? '}
          </h3>
          <div className="submit-btn-container">
            <button className="btn-submit" onClick={closePopup}>
              No
            </button>
            <button className="btn-submit" onClick={() => finalSubmit()}>
              YES
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
