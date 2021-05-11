/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  Button,
  TabPane,
  TabContent,
  UncontrolledCollapse,
  FormGroup,
  Input,
  CardTitle,
  CardHeader,
  Spinner,
  CardText,
  CardBody,
  Col,
  Progress,
  Nav,
  NavItem,
} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { NavLink } from 'react-router-dom';
import './miscellaneous/course.css';
import { Scrollbars } from 'react-custom-scrollbars';
import classnames from 'classnames';
import { MdAttachFile } from 'react-icons/md';
import { AiFillPlayCircle } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';
import { FcCheckmark } from 'react-icons/fc';
import { useHistory } from 'react-router-dom';

import img from './img2.jpg';
import { VideoPlayer } from './VideoPlayer';
import axiosInstance from '../../../helpers/axiosInstance';
import NotificationManager from '../../../components/common/react-notifications/NotificationManager';
import NoDataFound from './NoDataFound';
import { useGlobalContext } from '../../../context';
import NoCourseImg from './no-course.svg';
import NoVideoImg from './noVideo.svg';

const Materials = [
  // {
  //   img: 'img1',
  //   comment:
  //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
  //   name: 'Wonder woman',
  // },
  // {
  //   img: 'img2',
  //   comment:
  //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
  //   name: 'Ironman',
  // },
  // {
  //   img: 'img3',
  //   comment:
  //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
  //   name: 'Black Cat',
  // },
  // {
  //   img: 'img4',
  //   comment:
  //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
  //   name: 'Mary Jane',
  // },
];

const KnowledgeBase = ({ match, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const history = useHistory();
  const [error, setError] = useState(null);
  const [courseDetails, setCourseDetails] = useState('');
  const [courseContent, setCourseContent] = useState([]);
  const [videoSrc, setVideoSrc] = useState(null);
  const [Assign, setAssign] = useState(null);
  const [Hangouts, setHangouts] = useState(null);
  const [Quiz, setQuiz] = useState(null);
  const [CurrentLesson, setCurrentLesson] = useState(null);
  const [CurrentChapter, setCurrentChapter] = useState(null);
  const [colorIs, setColor] = useState(null);
  const [CommnetHere, setComment] = useState('');
  const [CommentsHere, setCommentIs] = useState([]);
  const [Material, setMaterial] = useState([]);
  const [newComment, setNewComment] = useState({
    courseContent: CommnetHere,
    comment_img_url: '',
    session_id: courseDetails.session_id,
    customer_id: courseDetails.customer_id,
  });
  const [Image, setImage] = useState(newComment.comment_img_url);

  const {
    fetchQuestions,
    quiz_questions,
    quiz_time,
    data,
    quizStartTime,
  } = useGlobalContext();

  const getData = async () => {
    try {
      if (isNaN(props.location.state.session_id))
        history.push('/app/pages/mycourses');
    } catch (e) {
      history.push('/app/pages/mycourses');
    }

    try {
      const result = await axiosInstance.get(
        `/student/mycourses/${props.location.state.session_id}`
      );
      console.log(result);

      console.log(
        result.data.ans[0].lesson[0].lesson_id,
        'video lessaion data'
      );
      const result2 = await axiosInstance.get(
        `/student/comment/${result.data.ans[0].lesson[0].lesson_id}`
      );
      console.log(result, 'data video and lesson');
      setCommentIs(result2.data);
      console.log(result2, 'comment data');
      console.log(result2.data.result.length, 'length');
      if (result.data.success) {
        console.log(result.data);
        setCourseDetails(result.data.sessionData);
        setCourseContent(result.data.ans);
        if (result.data.ans[0].lesson[0].videoUrl) {
          setVideoSrc(result.data.ans[0].lesson[0].videoUrl);
        }
        if (result.data.ans[0].lesson[0].assignmentUrl) {
          setAssign(result.data.ans[0].lesson[0].assignmentUrl);
        }
        if (result.data.ans[0].lesson[0].quizUrl) {
          setQuiz(result.data.ans[0].lesson[0].quizUrl);
        }
        if (result.data.ans[0].lesson[0].handoutsUrl) {
          setHangouts(result.data.ans[0].lesson[0].handoutsUrl);
        }

        // if(CommentsHere.result.length!=0){
        //   setCommentIs(result2.data);
        // }

        // document.querySelectorAll(".lesson-color")[0].style.backgroundColor="##008ecc";
        // new
        if (CurrentChapter == null || CurrentLesson == null) {
          setCurrentChapter(result.data.ans[0]);
          setCurrentLesson(result.data.ans[0].lesson[0]);
        }
      } else {
        try {
          setError(result.data.error);
        } catch (e) {
          console.log(e, 'error check');
          setError('Unable to fetch courses');
        }
      }
    } catch (err) {
      console.log(err);
      try {
        setError(err.response.data.error);
      } catch (error) {
        console.log(error);
        setError('Unable to fetch courses');
      }
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if (Assign) {
  //     setMaterial([Assign]);
  //   }
  //   if (Hangouts) {
  //     setMaterial([Hangouts]);
  //   }
  //   if (Assign && Hangouts) {
  //     setMaterial([Assign, Hangouts]);
  //   }
  // }, [Assign, Hangouts]);

  console.log(Material);
  console.log('Handout', Hangouts);
  console.log('Assign', Assign);

  useEffect(() => {
    if (error)
      NotificationManager.warning(
        error,
        'My Courses Error',
        3000,
        null,
        null,
        ''
      );
  }, [error]);

  const IMgUpload = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    const currentImage = e.target.files[0];
    console.log(file);
    console.log(currentImage);
    if (
      currentImage.type != 'image/jpg' &&
      currentImage.type != 'image/jpeg' &&
      currentImage.type != 'image/png' &&
      currentImage.type != 'image/webp'
    )
      setError('only jpg,jpeg,png,webp formats are allowed');
    else {
      setNewComment((prevState) => ({
        ...prevState,
        comment_img_url: currentImage,
      }));
      setImage(file);
    }

    // let file = e.target.files[0];
    // console.log(file);
    // // let sizeis = file.size / 125000;
    // // // alert(sizeis)
    // // if (sizeis <= 2) {
    // //   alert('correct file formate', sizeis);
    // // } else {
    // //   alert('Warning the file size is more then 2mb unable to uplaod', sizeis);
    // // }
    // let fileUpload = document.querySelector('.fileUploadIs');
    // console.log(fileUpload);
    // fileUpload.addEventListener('change', (e) => {});
  };

  // http://localhost:5000/student/comment
  // http://localhost:5000/student/auth/login
  const PostComment = async () => {
    console.log(videoSrc);
    console.log(courseDetails, 'Jitul Teron');
    console.log(courseContent);
    console.log(CurrentLesson.lesson_id, 'current lession i ');
    console.log(CurrentChapter.chapter_id);
    const values = {
      comment_content: CommnetHere,
      comment_img_url: Image,
      chapter_id: CurrentChapter.chapter_id,
      lesson_id: CurrentLesson.lesson_id,
      session_id: courseDetails.session_id,
      customer_id: courseDetails.customer_id,
    };
    console.log(values);
    try {
      const result = await axiosInstance.put(`/student/comment/`, { values });
      console.log(result);
      if (result.data.success) {
        alert('done');
        const result2 = await axiosInstance.get(
          `/student/comment/${CurrentLesson.lesson_id}`
        );
        setCommentIs(result2.data);
      } else {
        alert('not done');
      }
    } catch (err) {
      console.log('Error is here', err);
    }
  };

  const getComment = async (l) => {
    try {
      console.log(l);
      console.log(`/student/comment/${l.lesson_id}`, 'Url');
      const result2 = await axiosInstance.get(
        `/student/comment/${l.lesson_id}`
      );
      console.log(result2, 'url data');
      setCommentIs(result2.data);
    } catch (e) {
      console.log(e);
    }
  };

  const MaterialsSet = (lesson) => {
    // if(lesson.)
    // console.log(lesson);
    // if (lesson) {
    //   setMaterial([]);
    // } else {
    //   setMaterial(null);
    // }
  };

  if (!isLoaded)
    return (
      <div style={{ marginTop: '30%', marginLeft: '50%' }}>
        <Spinner color="primary" />
      </div>
    );

  const lessonColor = (ch, ls, l, doc) => {
    // setCurrentLesson(l)
    // setCurrentChapter(doc)
    let lesson1 = document.querySelectorAll(`.lesson-color`);
    for (let i = 0; i < lesson1.length; i++) {
      lesson1[i].style.backgroundColor = '#f8f8f8';
    }
    let lesson2 = document.querySelectorAll(`.chch${ch}`)[ls];
    // console.log(lesson);

    // document.querySelector(`.chch${ch}`).childNodes[0].childNodes[0].childNodes[i].style.backgroundColor="rgb(247, 248, 250)";
    lesson2.style.backgroundColor = '#008ecc';
    // console.log(CurrentLesson);
  };

  const startQuiz = () => {
    fetchQuestions();
    localStorage.setItem('DATA', JSON.stringify(quiz_questions));
    localStorage.setItem('TIME', JSON.stringify(quiz_time));
    localStorage.setItem('QUIZ_DATA', JSON.stringify(data));
    history.push('/quiz');
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      /* Safari */
      document.documentElement.webkitRequestFullscreen();
    }
  };

  return (
    <>
      {courseContent.length ? (
        <div>
          <Row className="wrapper">
            <Col className="jt_video_prt1">
              {videoSrc ? (
                <VideoPlayer
                  videoSrc={videoSrc}
                  assignment={Assign}
                  Quiz={Quiz}
                  Hangouts={Hangouts}
                />
              ) : (
                <div>
                  <img
                    src={NoVideoImg}
                    style={{ width: '100%', height: '100%' }}
                    alt="noVideo"
                  />
                  <h2>No Course Video Available Right now</h2>
                </div>
              )}

              {/* <p className="mt-3" style={{ fontSize: '15px' }}> */}
              {/* {courseDetails.session_tags.split(',').map((tag) => `# ${tag}`)} */}
              {/* </p> */}
              <h2 className="jt_h2_content course-name">
                {courseDetails.session_name}
              </h2>
              {/* <p>{courseDetails.session_start_time.substring(0, 10)}</p> */}
            </Col>
            <Col className="jt_video_prt2">
              <Card
                body
                className="progressbox"
                style={{
                  paddingLeft: '14px',
                  paddingRight: '14px',
                  overflow: 'scroll',
                  height: '475px',
                }}
              >
                {/* course progress bar */}
                {/* <CardTitle tag="h2" className="prog">
              Course Progress
            </CardTitle>
            <Progress className="bar" value="200" max={500} id="progress" />
            <div
              style={{ marginTop: '10px', marginBottom: '0' }}
              className="text-center mt-3 font-weight-bold"
            >
              45% of 100%
            </div> */}
                {quizStartTime && (
                  <button
                    className="btn-secondary"
                    style={{ border: 'none', width: '100%' }}
                    onClick={startQuiz}
                  >
                    StartQuiz
                  </button>
                )}
                <div
                  className="content_all"
                  style={{
                    width: '100%',
                    minHeight: '280px',
                    zIndex: '2',
                  }}
                >
                  <CardTitle
                    style={{
                      marginTop: '20px',
                      marginBottom: '0px',
                      textAlign: 'center',
                      // backgroundColor: '#E6E6E6',
                      padding: '10px 0px',
                      border: '1px solid #E6E6E6',
                    }}
                    tag="h5"
                    className="font-weight-bold jt_h2"
                  >
                    Course Contents
                  </CardTitle>
                  {/* <Scrollbars
                style={{ height: '0px', backgroundColor: 'red' }}
                id="scrollme"
                className="jt_scroll"
              > */}
                  {courseContent.map((doc, index) => {
                    const togglerId = `toggler${index}`;
                    return (
                      <>
                        <div
                          className="toggle content_jt"
                          style={{
                            margin: '0px',
                            width: '100%',
                            border: '1px solid #E6E6E6',
                            position: 'relative',
                          }}
                        >
                          <Button
                            color="link"
                            id={togglerId}
                            style={{ margin: '10px', padding: '0px' }}
                          >
                            <p
                              className=""
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '10px auto',
                                lineHeight: 'none',
                              }}
                            >
                              <FcCheckmark style={{}} />
                              <div style={{ padding: '0 10px' }}>
                                {doc.name}
                              </div>
                            </p>
                          </Button>
                        </div>

                        <UncontrolledCollapse toggler={togglerId}>
                          <div
                            className=""
                            style={{
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItem: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <CardBody style={{ padding: '8px' }}>
                              {doc.lesson.map((l, ls) => {
                                return (
                                  <Row className={`lesson-color chch${index}`}>
                                    <p
                                      onClick={() => {
                                        getComment(l);
                                        setCurrentLesson(l);
                                        setCurrentChapter(doc);

                                        if (l.videoUrl) {
                                          setVideoSrc(l.videoUrl);
                                          setHangouts(null);
                                          MaterialsSet(null);
                                          setAssign(null);
                                          setQuiz(null);
                                        }
                                        if (l.handoutsUrl) {
                                          setHangouts(l.handoutsUrl);
                                          setVideoSrc(null);
                                          //  setAssign(null);
                                          setQuiz(null);
                                          setMaterial([l.handoutsUrl]);
                                        }

                                        if (l.assignmentUrl) {
                                          setAssign(l.assignmentUrl);
                                          setVideoSrc(null);
                                          // setHangouts(null);
                                          setQuiz(null);
                                          setMaterial([l.assignmentUrl]);
                                        }

                                        // if (l.quizUrl) {
                                        //   setQuiz(l.quizUrl);
                                        //   setVideoSrc(null);
                                        //   setAssign(null);
                                        //   setHangouts(null);
                                        //   MaterialsSet(l.quizUrl);
                                        // }

                                        lessonColor(index, ls, l, doc);
                                      }}
                                      target="_blank"
                                      className="content1 m-3"
                                    >
                                      <AiFillPlayCircle className="iconvid" />
                                      {l.name}
                                    </p>
                                    {/* <p className="content1 mt-3 ml-auto mr-3">
                                  <FcCheckmark />
                                </p> */}
                                  </Row>
                                );
                              })}
                            </CardBody>
                          </div>
                        </UncontrolledCollapse>
                      </>
                    );
                  })}
                  {/* </Scrollbars>  */}
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <div className="jt_comment_container">
              <Card>
                <CardHeader className="mt-4">
                  <Nav tabs className="card-header-tabs mt-4">
                    <NavItem className="mr-4">
                      <NavLink
                        to="#"
                        location={{}}
                        className={classnames({
                          active: activeFirstTab === '1',
                          'nav-link': true,
                        })}
                        onClick={() => {
                          setActiveFirstTab('1');
                        }}
                      >
                        Comments
                      </NavLink>
                    </NavItem>

                    <NavItem className="ml-4">
                      <NavLink
                        to="#"
                        location={{}}
                        className={classnames({
                          active: activeFirstTab === '2',
                          'nav-link': true,
                        })}
                        onClick={() => {
                          setActiveFirstTab('2');
                        }}
                      >
                        Material
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <TabContent activeTab={activeFirstTab} className="jt_tab">
                  <TabPane tabId="1" className="jt_tabIs">
                    <Scrollbars
                      style={{ height: '300px' }}
                      id="scrollme"
                      className="jt_scroll"
                    >
                      {CommentsHere.result ? (
                        CommentsHere.result.map((list) => {
                          return (
                            <>
                              <div
                                id="comments"
                                role="tabpanel"
                                className="jt_comment materials"
                                aria-labelledby="home-tab"
                                show
                              >
                                <Card
                                  body
                                  className="text-center card-inner jt_comment "
                                >
                                  <Row>
                                    <Col
                                      md={2}
                                      xs={12}
                                      className="card_comment"
                                    >
                                      <CardTitle tag="h5" className="">
                                        {list.student_first_name}{' '}
                                        {list.student_last_name}
                                      </CardTitle>
                                    </Col>
                                    <Col md={10} xs={12}>
                                      {' '}
                                      <CardText className="mt-4 text-left">
                                        {list.comment_content}
                                      </CardText>
                                      {list.student}
                                      {list.comment_img_url && (
                                        <a href={list.comment_img_url} download>
                                          <FiDownload /> Image.jpg
                                        </a>
                                        // <img
                                        //   src={list.comment_img_url}
                                        //   alt="img"
                                        // />
                                      )}
                                    </Col>
                                  </Row>
                                </Card>
                              </div>
                            </>
                          );
                        })
                      ) : (
                        <div className="nodatahere">
                          <NoDataFound />
                        </div>
                      )}
                    </Scrollbars>
                    <FormGroup className="form_attached">
                      <Col md={2}>
                        <label className="input-label-1 ml-4">
                          <input
                            onChange={(e) => {
                              IMgUpload(e);
                            }}
                            accept="image/*"
                            data-max-sizeIs="2000"
                            type="file"
                            className="inp fileUploadIs"
                          />
                          <MdAttachFile className="icon-cmt" />
                          <p style={{ marginLeft: '25px' }}>Attachments</p>
                        </label>
                      </Col>
                      <Col md={7} className="comment_area">
                        <Input
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                          type="textarea"
                          name="text"
                          id="jt_comment_here"
                        />
                      </Col>
                      <Col md={2} className="comment-btn">
                        <Button
                          onClick={() => {
                            PostComment();
                          }}
                          className="btn4"
                        >
                          Comment
                        </Button>
                      </Col>
                    </FormGroup>
                  </TabPane>
                  <TabPane tabId="2" className="jt_tabIs">
                    <Scrollbars style={{ height: '300px' }}>
                      {Assign || Hangouts ? (
                        <>
                          <div
                            id="material"
                            role="tabpanel"
                            aria-labelledby="contact-tab"
                            show
                          >
                            <Card
                              body
                              className="text-center card-inner jt_comment"
                            >
                              <Row>
                                <Col md={2} xs={12} className="card_comment">
                                  <CardTitle tag="h5" className=""></CardTitle>
                                </Col>
                                {Assign && (
                                  <Col md={12} xs={12}>
                                    {' '}
                                    <CardText className="mt-4 text-left">
                                      Assignment
                                    </CardText>
                                    <a
                                      href={`${Assign}#toolbar=0`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FiDownload /> View
                                    </a>
                                  </Col>
                                )}
                                {Hangouts && (
                                  <Col md={12} xs={12}>
                                    {' '}
                                    <CardText className="mt-4 text-left">
                                      Hangouts
                                    </CardText>
                                    <a
                                      href={`${Hangouts}#toolbar=0`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FiDownload /> View
                                    </a>
                                  </Col>
                                )}
                                {/* <Col md={10} xs={12}>
                                  {' '}
                                  <CardText className="mt-4 text-left">
                                    Document
                                  </CardText>
                                  <a
                                    href={Material}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <FiDownload /> View
                                  </a>
                                </Col> */}
                              </Row>
                            </Card>
                          </div>
                        </>
                      ) : (
                        <div className="nodatahere">
                          <NoDataFound />
                        </div>
                      )}
                    </Scrollbars>
                  </TabPane>
                </TabContent>
                <div
                  id="material"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                ></div>
              </Card>
            </div>
            {/* <Col md="4"></Col> */}
          </Row>
          <br />
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            justifyContent: 'center',
            padding: '0rem 0',
          }}
        >
          <Fade left cascade>
            <img
              src={NoCourseImg}
              alt="you don't have any course yet logo"
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '300px',
                height: '300px',
              }}
            />{' '}
          </Fade>
          <Fade right casecade effect="delayOut">
            <h3 style={{ textAlign: 'center' }}>
              Tutor is yet to add Course Content
            </h3>
          </Fade>
        </div>
      )}
    </>
  );
};
export default KnowledgeBase;
