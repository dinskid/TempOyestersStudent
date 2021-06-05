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

export default function Quiz() {
  const history = useHistory();
  const [curSection, setCurSection] = useState(JSON.parse(localStorage.getItem('QUIZ_CURRENT_SECTION')) || 0); // the current section
  const [curQuestion, setCurQuestion] = useState(JSON.parse(localStorage.getItem('QUIZ_CURRENT_QUESTION')) || 0); // the current question
  const [quizData, setQuizData] = useState(JSON.parse(localStorage.getItem('QUIZ_DATA')) || null); // whole quiz data
  const [data, setData] = useState(JSON.parse(localStorage.getItem('DATA')) || null); // only question data
  const [question, setQuestion] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [status, setStatus] = useState(JSON.parse(localStorage.getItem('QUIZ_STATUS')) || []);
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem('QUIZ_ANSWERS')) || []);
  const [sectionNames, setSectionNames] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState((answers[curSection] && answers[curSection][curQuestion]) || ''); // answer to the current question
  const [popup, setPopup] = useState(true);
  const [popupComponent, setPopupComponent] = useState(null);

  const [questionCount, setQuestionCount] = useState(0);

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
          row[i] = new Array().fill([]);
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
    if (status[curSection][curQuestion] === 0) {
      // unvisited till now
      let newStatus = [...status]
      newStatus[curSection][curQuestion] = 2; // notanswered
      setStatus(newStatus);
    }
    if (popup) setPopup(false);
  }, [curSection, curQuestion, questionData]);

  useEffect(() => {
    let newStatus = [...status]
    if (currentAnswer) {
      if (currentAnswer.length > 0)
        newStatus[curSection][curQuestion] = 1; // answered
      else
        newStatus[curSection][curQuestion] = 2; // not-answered

      setStatus(newStatus);
      let ans = [...answers];
      if (ans.length > curSection && ans[curSection].length > curQuestion) {
        ans[curSection][curQuestion] = currentAnswer;
        console.log(currentAnswer);
        setAnswers(ans);
      }
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

  const handleSubmit = () => {
    console.log('submitted');
  };

  const QuestionComponent = () => {
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
                else console.log('answers length: ', answers.length);
                if (answers[curSection].length < curQuestion) return undefined;
                else console.log('answers[curSection] length: ', answers[curSection].length);
                try {
                  let ans = JSON.parse(answers[curSection][curQuestion])
                  if (ans.length === 0) return undefined;
                  console.log(question.question_options.map(option => ans.indexOf(option.option_body) >= 0));
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
            {console.log(typeof (answers[curSection][curQuestion]))}
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
              onTimerExpire={() => {
                console.log('Timer expired');
              }} />
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
                  <span className="text-primary">{curQuestion + 1}</span>&nbsp;
                  OF&nbsp;
                  <span className="text-primary">{questionCount}</span>
                </div>
              </div>
              <div className="next-container h-100">
                <button
                  className="btn btn-primary py-2 h-100"
                  // disabled={curSection === quizData.quiz_section_info.length - 1 && curQuestion === questionCount - 1}
                  onClick={(curSection === quizData.quiz_section_info.length - 1 && curQuestion === questionCount - 1)
                    ? handleSubmit : next
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
                  {console.log(questionData[curSection][curQuestion])}
                  <p className="question">
                    {questionData[curSection][curQuestion].question_body}

                  </p>
                  {QuestionComponent()}
                </>
              }
            </div>
          </div>
          {/* desktop only */}
          <div className="col-4 info-grid">
            <div className="timer-profile-container">
              <Timer onTimerExpire={() => {
                console.log('Timer expired');
              }} />
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