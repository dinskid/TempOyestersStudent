import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import './styles.css'
import avatar from '../app/pages/profile/Asset 1.png';
import QuizSections from './QuizSection';
import { useHistory } from 'react-router';
import SingleWord from './SingleWord';
import IntegerType from './IntegerType';
import MCQType from './MCQType';
import MatchType from './MatchType';
import SliderType from './SliderType';
import Popup from './Popup';
import { MdPerson } from 'react-icons/md';
import { IoMdHelp } from 'react-icons/io';
import axios from '../../helpers/axiosInstance';
import NotificationManager from '../../components/common/react-notifications/NotificationManager';

export default function Quiz() {
  const history = useHistory();
  const [curSection, setCurSection] = useState(JSON.parse(localStorage.getItem('QUIZ_CURRENT_SECTION')) || 0); // the current section
  const [curQuestion, setCurQuestion] = useState(JSON.parse(localStorage.getItem('QUIZ_CURRENT_QUESTION')) || 0); // the current question
  const [quizData, setQuizData] = useState(JSON.parse(localStorage.getItem('QUIZ_DATA')) || null); // whole quiz data
  const [data, setData] = useState(JSON.parse(localStorage.getItem('DATA')) || null); // only question data
  const [question, setQuestion] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [status, setStatus] = useState(JSON.parse(localStorage.getItem('QUIZ_STATUS')) || []);
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem('QUIZ_ANSWERS')) || "");
  const [sectionNames, setSectionNames] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState((answers[curSection] && answers[curSection][curQuestion]) || ''); // answer to the current question
  const [popup, setPopup] = useState(true);
  const [popupComponent, setPopupComponent] = useState(null);

  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionCount, setQuestionCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!(data && quizData)) {
      history.push('/error');
    }
    setQuestionCount(quizData.quiz_section_info[curSection].section_no_of_ques);
    const sections = quizData.quiz_section_info.map(item => item.section_name);
    setSectionNames(sections);

    setQuestionData(sections.map(section => data.filter(d => d.question_section_name === section)));

    if (status.length === 0) {
      // status has to be initialised from sections info
      setStatus(quizData.quiz_section_info.map(section => Array(section.section_no_of_ques).fill(0)));
    }

    if (answers.length === 0) {
      let tempAnswers = quizData.quiz_section_info.map(section => Array(section.section_no_of_ques));
      for (let row of tempAnswers) {
        for (let i = 0; i < row.length; i++) {
          row[i] = "";
        }
      }
      setAnswers(tempAnswers);
    }
    setSectionNames(quizData.quiz_section_info.map(section => section.section_name));

    // check why following doesn't work - know it is cos of ref, but check
    // let qData = Array(sections.length).fill(new Array());
    // console.log(qData);
    // data.forEach(q => {
    //   console.log(q)
    //   const pos = sections.indexOf(q.question_section_name);
    //   console.log('position to insert into: ', pos, ' ', qData[pos]);
    //   qData[pos].push(q);
    //   console.log(qData);
    // });
    // console.log(qData);
    // setQuestionData(qData);
  }, [quizData]);

  useEffect(() => {
    // any changes to status must be written to localStorage
    localStorage.setItem('QUIZ_ANSWERS', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    // any changes to status must be written to localStorage
    localStorage.setItem('QUIZ_STATUS', JSON.stringify(status));
  }, [status]);

  useEffect(() => {
    if (questionData.length > 0)
      setQuestion(questionData[curSection][curQuestion]);
    if (answers.length > 0)
      setCurrentAnswer(answers[curSection][curQuestion]);
    if (status.length > curSection && status[curSection].length > curQuestion) {
      if (status[curSection][curQuestion] === 0) {
        // unvisited till now
        let newStatus = [...status]
        newStatus[curSection][curQuestion] = Math.max(newStatus[curSection][curQuestion], 2); // notanswered
        setStatus(newStatus);
      }
    }
    if (popup) setPopup(false);

    let qNo = 0;
    for (let i = 0; i < curSection; i++) {
      qNo += quizData.quiz_section_info[i].section_no_of_ques;
    }
    qNo += curQuestion + 1;
    setQuestionNumber(qNo);
  }, [curSection, curQuestion, questionData]);

  useEffect(() => {
    let newStatus = [...status]
    if (newStatus.length > curSection && newStatus[curSection].length > curQuestion) {
      if (currentAnswer.length > 0)
        newStatus[curSection][curQuestion] = newStatus[curSection][curQuestion] !== 3 ? 1 : 3; // notanswered
      else
        newStatus[curSection][curQuestion] = newStatus[curSection][curQuestion] !== 3 ? 2 : 3; // notanswered

      setStatus(newStatus);
    }
    let ans = [...answers];
    if (ans.length > curSection && ans[curSection].length > curQuestion) {
      ans[curSection][curQuestion] = currentAnswer;
      setAnswers(ans);
    }
  }, [currentAnswer]);

  useEffect(() => {
    localStorage.setItem('QUIZ_CURRENT_SECTION', curSection);
  }, [curSection]);

  useEffect(() => {
    localStorage.setItem('QUIZ_CURRENT_QUESTION', curQuestion);
  }, [curQuestion]);

  const previous = () => {
    if (curQuestion > 0) {
      setCurQuestion(curQuestion - 1);
    } else {
      if (curSection > 0) {
        let sectionNow = curSection - 1;
        setCurSection(sectionNow);
        setCurQuestion(questionData[sectionNow].length - 1);
      }
    }
  }

  const next = () => {
    if (curQuestion < questionCount - 1) {
      setCurQuestion(curQuestion + 1);
    } else {
      // last question in this section
      if (curSection < quizData.quiz_section_info.length - 1) {
        setCurSection(curSection + 1);
        setCurQuestion(0);
      }
    }
  }

  const closePopup = () => {
    setPopup(false);
    setPopupComponent(null);
  };

  const handleSubmit = async () => {
    setPopup(false);
    setPopupComponent(null);
    const ansToPost = [];
    questionData.forEach((section, idx) =>
      section.forEach((question, jdx) => ansToPost.push({
        question_id: question.question_id,
        selectedAnswers: answers[idx][jdx],
      }))
    );
    try {
      const student_id = localStorage.getItem('STUDENTID');
      const timeLeft = localStorage.getItem('TIME');
      const valuesToPost = {
        quiz_name: quizData.quiz_name,
        quiz_id: quizData.quiz_id,
        student_id,
        answers: ansToPost,
        remaining_time: `${Math.floor(timeLeft) / 60}:${timeLeft % 60}`
      }
      const submit = await axios.post('/student/quiz/submitQuiz', valuesToPost);
      if (submit.status === 200) {
        setLoading(false);
        localStorage.removeItem('DATA');
        localStorage.removeItem('QUIZ_DATA');
        localStorage.removeItem('TIME');
        localStorage.removeItem('QUIZ_TOTAL_TIME');
        localStorage.removeItem('QUIZ_STATUS');
        localStorage.removeItem('QUIZ_CURRENT_SECTION');
        localStorage.removeItem('QUIZ_CURRENT_QUESTION');
        localStorage.removeItem('QUIZ_ANSWERS');
        history.push('/app/pages/mycourses');
      } else {
        setLoading(false);
        NotificationManager.error("Couldn't submit the quiz. Please try again.", 'Error', 3000, null, null, '');
      }
    } catch (e) {
      setLoading(false);
      console.log('Error', e);
      NotificationManager.error("Couldn't submit the quiz. Please try again.", 'Error', 3000, null, null, '');
    }
  };

  const QuestionComponent = (questionHadImage) => {
    if (!question || !answers) return null;
    switch (question.question_type) {
      case 'single_correct_type':
      case 'multiple_correct_type':
        return (
          <>
            {/* <h1>MCQ</h1> */}
            <MCQType
              initialState={(() => {
                if (!answers) return undefined
                if (answers.length < curSection) return undefined;
                if (answers[curSection].length < curQuestion) return undefined;
                try {
                  let ans = JSON.parse(answers[curSection][curQuestion])
                  if (ans.length === 0) return undefined;
                  return question.question_options.map(option => ans.indexOf(option.option_body) >= 0);
                } catch (e) {
                  return undefined;
                }
              })()}
              setAnswer={setCurrentAnswer}
              type={question.question_type}
              options={question.question_options}
            />
          </>
        );
      case 'single_word':
        return (
          <>
            {/* <h1>Single word</h1> */}
            <SingleWord
              className={!questionHadImage ? "top-spacing" : ""}
              initialState={answers[curSection][curQuestion]}
              setAnswer={setCurrentAnswer}
            />
          </>
        );
      case 'integer':
        return (
          <>
            {/* <h1>Integer</h1> */}
            <IntegerType
              className={!questionHadImage ? "top-spacing" : ""}
              initialState={Number(answers[curSection][curQuestion])}
              setAnswer={setCurrentAnswer}
            />
          </>
        );
      case 'slide':
        return (
          // <h1>Slider</h1>
          <SliderType
            initialState={answers[curSection][curQuestion]}
            options={question.question_scale_options}
            setAnswer={setCurrentAnswer}
          />
        );
      case 'match':
        return (
          <>
            <MatchType
              options={question.question_match_options}
              setAnswer={setCurrentAnswer}
              initialState={(() => {
                if (answers[curSection][curQuestion].length === 0) return undefined;
                return answers[curSection][curQuestion];
              })()}
            />
          </>
        );
      default:
        return null;
    }
  }

  if (!quizData) return null;

  if (loading) return <div className="loading" />;

  return (
    <>
      {
        popup &&
        <Popup onClose={closePopup}>
          {popupComponent}
        </Popup>
      }
      <div className="quiz-container container-fluid">
        <h1 className="title-bg rounded w-100 d-flex align-items-center m-0 p-0 h-50 px-lg-3 justify-content-center justify-content-lg-start">
          {quizData.quiz_name || 'Quiz'}
        </h1>

        <div className="d-lg-none d-flex justify-content-center position-relative">
          <div className="mobile-only-toggle person-toggle rounded-right"
            onClick={() => {
              setPopupComponent(
                <div className="profile-container d-flex flex-column justify-content-around">
                  <div className="img-profile">
                    <img
                      src={localStorage.getItem('PROFILEPICTURE') || avatar}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      alt="profile-pic"
                    />
                  </div>
                  <div className="font-weight-bold text-primary">
                    {localStorage.getItem('USERNAME')
                      ? localStorage.getItem('USERNAME')
                      : 'lorem ipsum'}
                  </div>
                </div>
              );
              setPopup(true);
            }}
          >
            <MdPerson />
          </div>
          <div className="w-50">
            <Timer
              onTimerExpire={handleSubmit}
            />
          </div>
          <div className="mobile-only-toggle section-toggle rounded-left"
            onClick={() => {
              setPopupComponent(
                <div className="sections-container shadow-box p-3 h-100">
                  <h3 className="text-center">SECTIONS</h3>
                  <QuizSections status={status} sectionNames={sectionNames} setSection={setCurSection} setQuestion={setCurQuestion} />
                </div>
              );
              setPopup(true);
            }}
          >
            <IoMdHelp />
          </div>
        </div>

        <div className="row p-0 h-100">
          <div className="col-12 col-lg-8 overflow-auto question-grid">
            <div className="quiz-control d-flex justify-content-between align-items-center mb-5">
              <div className="prev-container h-100">
                <button
                  disabled={curSection === 0 && curQuestion === 0}
                  className="btn btn-primary py-2 h-100"
                  onClick={previous}>
                  &lt;
                  <span className="d-none d-lg-inline">&nbsp;Previous</span>
                </button>
              </div>
              <div className="question-count d-flex flex-column flex-lg-row align-items-center shadow-box px-3 py-0 py-lg-2 h-100">
                <div>
                  QUESTION&nbsp;
                </div>
                <div>
                  {/* <span className="text-primary">{currentQuestion}</span> */}
                  <span className="text-primary">{questionNumber}</span>&nbsp;
                  OF&nbsp;
                  <span className="text-primary">{data.length}</span>
                </div>
              </div>
              <div className="next-container h-100">
                <button
                  className="btn btn-primary py-2 h-100"
                  // disabled={curSection === quizData.quiz_section_info.length - 1 && curQuestion === questionCount - 1}
                  onClick={(curSection === quizData.quiz_section_info.length - 1 && curQuestion === questionCount - 1)
                    ? () => {
                      setPopup(true);
                      setPopupComponent(
                        <div className="submit-popup d-flex flex-column justify-content-center">
                          <h3>Do you want to submit your quiz ?</h3>
                          <div className="d-flex justify-content-around">
                            <button className="btn btn-primary rounded-0" onClick={() => setPopup(false)}>
                              No
                            </button>
                            <button className="btn btn-primary rounded-0" onClick={handleSubmit}>
                              YES
                            </button>
                          </div>
                        </div>
                      );
                    } : next
                  }
                >
                  <span className="d-none d-lg-inline">
                    {
                      (curSection === quizData.quiz_section_info.length - 1 && curQuestion === questionCount - 1) ?
                        'Submit' : 'Next'
                    }
                    &nbsp;
                  </span>

                  {/* mobile only */}
                  <span className="d-lg-none">
                    {
                      (curSection === quizData.quiz_section_info.length - 1 && curQuestion === questionCount - 1) ?
                        'Submit' : ''
                    }
                    &nbsp;
                  </span>&gt;
                </button>
              </div>
            </div>
            <div className="question-container shadow-box p-3 mt-3 overflow-auto">
              {
                (questionData.length > curSection && questionData[curSection].length > curQuestion) &&
                <>
                  <p className="question">
                    <span className="font-weight-bold">Q {questionNumber}.</span> {questionData[curSection][curQuestion].question_body}
                  </p>
                  <div className="mark-btn-wrap d-flex justify-content-end">
                    <button
                      className="btn p-0 px-1 marked text-white mark-btn"
                      onClick={() => {
                        let s = [...status]
                        if (s[curSection][curQuestion] === 3) {
                          s[curSection][curQuestion] = (answers[curSection][curQuestion].length > 0) ? 1 : 2;
                        } else s[curSection][curQuestion] = 3;
                        setStatus(s);
                      }}
                    >
                      {
                        status[curSection][curQuestion] === 3 ? 'Unmark' : 'Mark'
                      }
                    </button>
                  </div>
                  {
                    questionData[curSection][curQuestion].quesion_body_img_url &&
                    <div className="question-img-wrap d-flex justify-content-center align-items-center">
                      <img src={questionData[curSection][curQuestion].quesion_body_img_url} alt="question-related-image" className="question-img" />
                    </div>
                  }
                  {QuestionComponent(questionData[curSection][curQuestion].quesion_body_img_url)}
                </>
              }
            </div>
          </div>
          {/* desktop only */}
          <div className="col-4 info-grid">
            <div className="timer-profile-container">
              <Timer onTimerExpire={handleSubmit} />

              <div className="profile-container d-flex flex-column justify-content-around">
                <div className="img-profile">
                  <img
                    src={localStorage.getItem('PROFILEPICTURE') || avatar}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    alt="profile-pic"
                  />
                </div>
                <div className="font-weight-bold text-primary">
                  {localStorage.getItem('USERNAME')
                    ? localStorage.getItem('USERNAME')
                    : 'lorem ipsum'}
                </div>
              </div>
            </div>
            <div className="sections-container shadow-box p-3 h-100">
              <h3 className="text-center">SECTIONS</h3>
              <QuizSections status={status} sectionNames={sectionNames} setSection={setCurSection} setQuestion={setCurQuestion} />
            </div>
            <div className="label-container shadow-box p-3 container-fluid d-flex flex-column justify-content-center">
              <div className="row mb-2">
                <div className="col d-flex justify-content-center">
                  <div className="label answered">Answered</div>
                </div>
                <div className="col d-flex justify-content-center">
                  <div className="label not-answered">Not Answered</div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col d-flex justify-content-center">
                  <div className="label marked">Marked for review</div>
                </div>
                <div className="col d-flex justify-content-center">
                  <div className="label unvisited">Not Visited</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}