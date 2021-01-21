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

const Comments = [
  {
    img: 'img1',
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
    name: 'Wonder woman',
  },
  {
    img: 'img2',
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
    name: 'Ironman',
  },
  {
    img: 'img3',
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
    name: 'Black Cat',
  },
  {
    img: 'img4',
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
    name: 'Mary Jane',
  },
];
const KnowledgeBase = ({ match, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const history = useHistory();
  const [error, setError] = useState(null);
  const [courseDetails, setCourseDetails] = useState('');
  const [courseContent, setCourseContent] = useState([]);
  const [videoSrc, setVideoSrc] = useState(null);

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

  useEffect(() => {
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
        if (result.data.success) {
          setCourseDetails(result.data.sessionData);
          setCourseContent(result.data.ans);
          setVideoSrc(result.data.ans[0].lesson[0].videoUrl);
        } else {
          try {
            setError(result.data.error);
          } catch (e) {
            setError('Unable to fetch courses');
          }
        }
      } catch (err) {
        try {
          setError(err.response.data.error);
        } catch (error) {
          setError('Unable to fetch courses');
        }
      } finally {
        setIsLoaded(true);
      }
    };
    getData();
  }, []);

  if (!isLoaded)
    return (
      <div style={{ marginTop: '30%', marginLeft: '50%' }}>
        <Spinner color="primary" />
      </div>
    );

  return (
    <>
      <Row>
        <Col md="9">
          <VideoPlayer videoSrc={videoSrc} />
          <p className="mt-3" style={{ fontSize: '15px' }}>
            {courseDetails.session_tags.split(',').map((tag) => `# ${tag}`)}
          </p>
          <h2 className="font-weight-bold">{courseDetails.session_name}</h2>
          <p>{courseDetails.session_start_time.substring(0, 10)}</p>
        </Col>
        <Col md="3">
          <Card body className="progressbox">
            <CardTitle tag="h2" className="prog">
              Course Progress
            </CardTitle>
            <Progress value="200" max={500} id="progress" />
            <div className="text-center mt-3 font-weight-bold">45% of 100%</div>

            <CardTitle tag="h5" className="font-weight-bold">
              Contents
            </CardTitle>
            <Scrollbars style={{ width: 280, height: 350 }}>
              {courseContent.map((doc, index) => {
                const togglerId = `toggler${index}`;
                return (
                  <>
                    <Card className="toggle">
                      <Button
                        color="link"
                        id={togglerId}
                        style={{ marginBottom: '1rem' }}
                      >
                        <p className="p1">
                          {doc.name}
                          <FcCheckmark style={{ marginLeft: '80px' }} />
                        </p>
                      </Button>
                    </Card>
                    <UncontrolledCollapse toggler={togglerId}>
                      <Card className="toggled">
                        <CardBody>
                          {doc.lesson.map((l) => {
                            return (
                              <Row>
                                <p
                                  onClick={() => {
                                    console.log(l.videoUrl);
                                    setVideoSrc(l.videoUrl);
                                  }}
                                  target="_blank"
                                  className="content1 m-3"
                                >
                                  <AiFillPlayCircle className="iconvid" />
                                  {l.name}
                                </p>
                                <p className="content1 mt-3 ml-auto mr-3">
                                  <FcCheckmark />
                                </p>
                              </Row>
                            );
                          })}
                        </CardBody>
                      </Card>
                    </UncontrolledCollapse>
                  </>
                );
              })}
            </Scrollbars>
          </Card>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md="9">
          <Card className="mt-4">
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
            <TabContent activeTab={activeFirstTab}>
              <TabPane tabId="1" className="mb-4">
                <Scrollbars style={{ width: 950, height: 400 }} id="scrollme">
                  {Comments.map((list) => (
                    <div
                      id="comments"
                      role="tabpanel"
                      className="mb-3"
                      aria-labelledby="home-tab"
                      show
                    >
                      <Card body className="text-center card-inner">
                        <Row>
                          <Col md={2} xs={12}>
                            <img
                              src={require(`./${list.img}.jpg`)}
                              className="comment_img ml-auto mr-auto"
                            />
                            <CardTitle tag="h5" className="card_comment">
                              {list.name}
                            </CardTitle>
                          </Col>
                          <Col md={10} xs={12}>
                            {' '}
                            <CardText className="mt-4 text-left">
                              {list.comment}
                            </CardText>
                            <a href={img} download>
                              <FiDownload /> Image.jpg
                            </a>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  ))}
                </Scrollbars>
                <FormGroup row>
                  <Col md={2}>
                    <label className="input-label-1 ml-4">
                      <input type="file" className="inp" />
                      <MdAttachFile className="icon-cmt" />
                      <p style={{ marginLeft: '25px' }}>Attachments</p>
                    </label>
                  </Col>
                  <Col md={7} className="comment_area">
                    <Input type="textarea" name="text" id="exampleText" />
                  </Col>
                  <Col md={2} className="comment-btn">
                    <Button className="btn4">Comment</Button>
                  </Col>
                </FormGroup>
              </TabPane>
              <TabPane tabId="2"></TabPane>
            </TabContent>

            <div
              id="material"
              role="tabpanel"
              aria-labelledby="contact-tab"
            ></div>
          </Card>
        </Col>
        <Col md="4"></Col>
      </Row>
      <br />
    </>
  );
};
export default KnowledgeBase;
