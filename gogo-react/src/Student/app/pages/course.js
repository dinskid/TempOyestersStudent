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
  const [colorIs,setColor]=useState(null);
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
        // console.log(result);
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

  const IMgUpload=(e)=>{
    let file=e.target.files[0];
    let sizeis=file.size;
    if(sizeis<=2000){
      alert("correct file formate")
    }else{
      alert("Warning the file size is more then 2mb unable to uplaod")
    }
    // let fileUpload=document.querySelector(".fileUploadIs");
    // console.log(fileUpload);
    // fileUpload.addEventListener("change",(e)=>{
      
    // })

  }
  if (!isLoaded)
    return (
      <div style={{ marginTop: '30%', marginLeft: '50%' }}>
        <Spinner color="primary" />
      </div>
    );
// const lessonColor=(index)=>{
//   let lesson=document.querySelectorAll(".lesson-color");
//   lesson[index].style.backgroundColor="#e92828"
  
// }
  return (
    <>
      <Row>
        <Col  className="jt_video_prt1">
          <VideoPlayer videoSrc={videoSrc} />
          <p className="mt-3" style={{ fontSize: '15px' }}>
            {/* {courseDetails.session_tags.split(',').map((tag) => `# ${tag}`)} */}
          </p>
          <h2 style={{marginTop:"20px"}} className="jt_h2_content">{courseDetails.session_name}</h2>
          <p>{courseDetails.session_start_time.substring(0, 10)}</p>
        </Col>
        <Col  className="jt_video_prt2">
          <Card body className="progressbox" style={{paddingLeft:"14px",paddingRight:"14px"}}>
            <CardTitle tag="h2" className="prog">
              Course Progress
            </CardTitle>
            <Progress value="200" max={500} id="progress" />
            <div  style={{marginTop:"10px",marginBottom:"0"}} className="text-center mt-3 font-weight-bold">45% of 100%</div>

            <div className="content_all" style={{minHeight:"280px"}}>
            <CardTitle style={{marginTop:"20px",marginBottom:"0px",textAlign:"center",backgroundColor:"#E6E6E6",padding:"10px 0px"}} tag="h5" className="font-weight-bold jt_h2">
             Course Contents
            </CardTitle>
            <Scrollbars style={{ width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"#f7f8fa"}}>
              {courseContent.map((doc, index) => {
                const togglerId = `toggler${index}`;
                return (
                  <>
                    <div className="toggle content_jt" style={{margin:"0px",width:"100%",border:"1px solid #E6E6E6"}}>
                      <Button
                        color="link"
                        id={togglerId}
                        style={{ margin: '10px',padding:"0px" }}
                      >
                        <p className="" style={{display:"flex",justifyContent:"space-between",margin:"10px auto",lineHeight:"none"}}>
                          <FcCheckmark style={{  }} />
                          <div style={{padding:"0 10px"}}>
                            {doc.name}
                          </div>
                        </p>
                      </Button>
                    </div>
                   
                    <UncontrolledCollapse toggler={togglerId}>
                      <div className="" style={{paddingLeft:"10px",paddingRight:"10px",display:"flex",justifyContent:"center",alignItem:"center",alignItems:"center"}}>
                        <CardBody style={{padding:"8px 30px"}}>
                          {doc.lesson.map((l,index) => {
                            return (
                              <Row  className="lesson-color">
                                <p
                                  onClick={() => {
                                    setVideoSrc(l.videoUrl);
                                    // lessonColor(index)
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
                      </div>
                    </UncontrolledCollapse>
                  </>
                );
              })}
            </Scrollbars>
            </div>
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
                      <input  onChange={(e)=>{IMgUpload(e)}} accept="image/*" data-max-sizeIs="2000" type="file" className="inp fileUploadIs" />
                      <MdAttachFile className="icon-cmt" />
                      <p style={{ marginLeft: '25px' }}>Attachments</p>
                    </label>
                  </Col>
                  <Col md={7} className="comment_area">
                    <Input type="textarea" name="text" id="exampleText" />
                  </Col>
                  <Col md={2} className="comment-btn">
                    <Button  className="btn4">Comment</Button>
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
