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
import NoDataFound from './NoDataFound';

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
  const [CurrentLesson,setCurrentLesson]=useState(null)
  const [CurrentChapter,setCurrentChapter]=useState(null)
  const [colorIs,setColor]=useState(null);
  const [CommnetHere,setComment]=useState("");
  const [CommentsHere,setCommentIs]=useState([]);
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
      const result2=await axiosInstance.get("/student/comment");
      console.log(result2);
      // console.log(result);
      if (result.data.success&&result2.data.length!=0) {
        console.log(result.data);
        setCourseDetails(result.data.sessionData);
        setCourseContent(result.data.ans);
        if(result.data.ans[0].lesson[0].videoUrl){
          setVideoSrc(result.data.ans[0].lesson[0].videoUrl);
        }
        if(result.data.ans[0].lesson[0].assignmentUrl){
          setAssign(result.data.ans[0].lesson[0].assignmentUrl);
        }
        if(result.data.ans[0].lesson[0].quizUrl){
          setQuiz(result.data.ans[0].lesson[0].quizUrl);
        }
        if(result.data.ans[0].lesson[0].handoutsUrl){
          setHangouts(result.data.ans[0].lesson[0].handoutsUrl)
        }
        
        
        
        
        setCommentIs(result2.data);
        // document.querySelectorAll(".lesson-color")[0].style.backgroundColor="##008ecc";
        // new 
        if(CurrentChapter==null||CurrentLesson==null){
          setCurrentChapter(result.data.ans[0])
          setCurrentLesson(result.data.ans[0].lesson[0])
        }
        
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

  useEffect(() => {
   
    getData();
    console.log(CommentsHere);
    
  }, []);

  const IMgUpload=(e)=>{
    let file=e.target.files[0];
    console.log(file);
    let sizeis=file.size/125000;
    // alert(sizeis)
    if(sizeis<=2){
      alert("correct file formate",sizeis)
    }else{
      alert("Warning the file size is more then 2mb unable to uplaod",sizeis)
    }
    let fileUpload=document.querySelector(".fileUploadIs");
    console.log(fileUpload);
    fileUpload.addEventListener("change",(e)=>{
      
    })

  }

// http://localhost:5000/student/comment
// http://localhost:5000/student/auth/login
  const PostComment= async()=>{

    
    
    console.log(videoSrc);
    console.log(courseDetails,"Jitul Teron");
    console.log(courseContent);
    console.log(CurrentLesson.lesson_id);
    console.log(CurrentChapter.chapter_id);
    const values={
          comment_content:CommnetHere,
          comment_img_url:null,
          chapter_id:CurrentChapter.chapter_id,
          lesson_id:CurrentLesson.lesson_id,
          session_id:courseDetails.session_id,
          customer_id:courseDetails.customer_id
        };
    console.log(values);
    try{
      const result=await axiosInstance.post("/student/comment/",{values});
      console.log(result);
      if(result.data.success){
        alert("done")
      }else{
        alert("not done")
      }
      
    }catch(err){
      console.log("Error is here",err);
    }
    getData();
  }
  if (!isLoaded)
    return (
      <div style={{ marginTop: '30%', marginLeft: '50%' }}>
        <Spinner color="primary" />
      </div>
    );
const lessonColor=(ch,ls,l,doc)=>{
  // setCurrentLesson(l)
  // setCurrentChapter(doc)
  let lesson1=document.querySelectorAll(`.lesson-color`)
  for(let i =0;i<lesson1.length;i++){
    lesson1[i].style.backgroundColor="#f8f8f8"
  }
  let lesson2=document.querySelectorAll(`.chch${ch}`)[ls]
  // console.log(lesson);
  
  // document.querySelector(`.chch${ch}`).childNodes[0].childNodes[0].childNodes[i].style.backgroundColor="rgb(247, 248, 250)";
  lesson2.style.backgroundColor="#008ecc"
  // console.log(CurrentLesson);
 }
  return (
    <>
      <Row>
        <Col  className="jt_video_prt1">

          {videoSrc?<VideoPlayer videoSrc={videoSrc} assignment={Assign} Quiz={Quiz} Hangouts={Hangouts}/>
          :Assign?(<>
      
  
      <div className="quize_assg_jt" style={{ width: '100%' }}>
        <Scrollbars
          style={{ width: '100%',height:"450px"}}
          className="content_quize_assg_jt"
        >
        <div className="content_quiz">
            <h2>Welcome</h2>
            <p>
              Hello my friends,
            </p>
            <p>
            Welcome to this new section on Data Preprocessing in R!
            </p>
            <p>
          
            Just a quick reminder that it is absolutely not necessary to study the two programming languages Python and R. The only reason why we provided the two trainings in Python and R, was for everyone to be able to learn Machine Learning on their favourite programming language. Therefore if you only want to study Machine Learning in Python, feel absolutely free to skip this section and move on to the next one to tackle the next Machine Learning model in Python.
            
            </p>
            <p>Until then, enjoy Machine Learning!</p>
            <p>Hadelin</p>
            <a target="blank" href={Assign}>Click here your assignment</a>
        </div>
        </Scrollbars>
        <div  className="quize_assg_jt_bottom"><button>Next</button></div>
  
        
      </div>
      </>):Quiz?(<>
      
  
      <div className="quize_assg_jt" style={{ width: '100%' }}>
        <Scrollbars
          style={{ width: '100%',height:"450px"}}
          className="content_quize_assg_jt"
        >
        <div className="content_quiz">
            <h2>Welcome</h2>
            <p>
              Hello my friends,
            </p>
            <p>
            Welcome to this new section on Data Preprocessing in R!
            </p>
            <p>
          
            Just a quick reminder that it is absolutely not necessary to study the two programming languages Python and R. The only reason why we provided the two trainings in Python and R, was for everyone to be able to learn Machine Learning on their favourite programming language. Therefore if you only want to study Machine Learning in Python, feel absolutely free to skip this section and move on to the next one to tackle the next Machine Learning model in Python.
            
            </p>
            <p>Until then, enjoy Machine Learning!</p>
            <p>Hadelin</p>
            <a target="blank" href={Quiz}>Click here your Quize</a>
        </div>
        </Scrollbars>
        <div className="quize_assg_jt_bottom"><button>Next</button></div>
  
        
      </div>
      </>):( <div className="quize_assg_jt" style={{ width: '100%' }}>
        <Scrollbars
          style={{ width: '100%',height:"450px"}}
          className="content_quize_assg_jt"
        >
        <div className="content_quiz">
            <h2>Welcome</h2>
            <p>
              Hello my friends,
            </p>
            <p>
            Welcome to this new section on Data Preprocessing in R!
            </p>
            <p>
          
            Just a quick reminder that it is absolutely not necessary to study the two programming languages Python and R. The only reason why we provided the two trainings in Python and R, was for everyone to be able to learn Machine Learning on their favourite programming language. Therefore if you only want to study Machine Learning in Python, feel absolutely free to skip this section and move on to the next one to tackle the next Machine Learning model in Python.
            
            </p>
            <p>Until then, enjoy Machine Learning!</p>
            <p>Hadelin</p>
            <a target="blank" href={Hangouts}>Click here your Hangouts</a>
        </div>
        </Scrollbars>
        <div className="quize_assg_jt_bottom"><button>Next</button></div>
  
        
      </div>)}

          <p className="mt-3" style={{ fontSize: '15px' }}>
            {/* {courseDetails.session_tags.split(',').map((tag) => `# ${tag}`)} */}
          </p>
          <h2  className="jt_h2_content">{courseDetails.session_name}</h2>
          {/* <p>{courseDetails.session_start_time.substring(0, 10)}</p> */}
        </Col>
        <Col  className="jt_video_prt2">
          <Card body className="progressbox" style={{paddingLeft:"14px",paddingRight:"14px"}}>
            <CardTitle tag="h2" className="prog">
              Course Progress
            </CardTitle>
            <Progress className="bar" value="200" max={500} id="progress" />
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
                   
                    <UncontrolledCollapse toggler={togglerId} >
                      <div className="" style={{paddingLeft:"10px",paddingRight:"10px",display:"flex",justifyContent:"center",alignItem:"center",alignItems:"center"}}>
                        <CardBody style={{padding:"8px"}}>
                          {doc.lesson.map((l,ls) => {
                            return (
                              <Row  className={`lesson-color chch${index}`}>
                                <p
                                  onClick={() => {
                                    setCurrentLesson(l);
                                    setCurrentChapter(doc);
                                    if(l.videoUrl){
                                      setVideoSrc(l.videoUrl);
                                      setHangouts(null)
                                      
                                      setAssign(null)
                                      setQuiz(null)
                                    }
                                    if(l.handoutsUrl){
                                      setHangouts(l.handoutsUrl)
                                      setVideoSrc(null);
                                      setAssign(null)
                                      setQuiz(null)
                                    }
                                    
                                    if(l.assignmentUrl){
                                      setAssign(l.assignmentUrl)
                                      setVideoSrc(null);
                                      setHangouts(null)
                                      setQuiz(null)
                                    }
                                    
                                    if(l.quizUrl){
                                      setQuiz(l.quizUrl)
                                      setVideoSrc(null);
                                      setAssign(null)
                                      setHangouts(null)
                                    }
                                    

                                    lessonColor(index,ls,l,doc);
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
      <Row >
        <div className="jt_comment_container">
          <Card >
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
                <Scrollbars style={{ height: 450 }} id="scrollme" className="jt_scroll">
                  {CommentsHere.result.map((list) => {
                    return (
                      <>
                      <div
                      id="comments"
                      role="tabpanel"
                      className="jt_comment materials"
                      aria-labelledby="home-tab"
                      show
                    >
                      <Card body className="text-center card-inner jt_comment ">
                        <Row>
                          <Col md={2} xs={12} className="card_comment">
                            
                            <CardTitle tag="h5" className="">
                              {list.student_first_name} {list.student_last_name} 
                            </CardTitle>
                          </Col>
                          <Col md={10} xs={12}>
                            {' '}
                            <CardText className="mt-4 text-left">
                              {list.comment_content}
                            </CardText>
                            <a href={img} download>
                              <FiDownload /> Image.jpg
                            </a>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                      </>
                    );
                  })}
                </Scrollbars>
                <FormGroup  className="form_attached">
                  <Col md={2}>
                    <label className="input-label-1 ml-4">
                      <input  onChange={(e)=>{IMgUpload(e)}} accept="image/*" data-max-sizeIs="2000" type="file" className="inp fileUploadIs" />
                      <MdAttachFile className="icon-cmt" />
                      <p style={{ marginLeft: '25px' }}>Attachments</p>
                    </label>
                  </Col>
                  <Col md={7} className="comment_area">
                    <Input onChange={(e)=>{setComment(e.target.value)}}  type="textarea" name="text" id="jt_comment_here" />
                  </Col>
                  <Col md={2} className="comment-btn">
                    <Button  onClick={()=>{PostComment()}} className="btn4">Comment</Button>
                  </Col>
                </FormGroup>
              </TabPane>
              <TabPane tabId="2">
                <Scrollbars style={{ height: 450 }}>
                {
                  Materials.length!=0?Materials.map((doc)=>{
                    return(
                      <>
                      <div
                      id="material"
                      role="tabpanel"
                      aria-labelledby="contact-tab"
                      show
                    >
                      <Card body className="text-center card-inner jt_comment">
                        <Row>
                          <Col md={2} xs={12} className="card_comment">
                            
                            <CardTitle tag="h5" className="">
                              {doc.name}
                            </CardTitle>
                          </Col>
                          <Col md={10} xs={12}>
                            {' '}
                            <CardText className="mt-4 text-left">
                              {doc.comment}
                            </CardText>
                            <a href={img} download>
                              <FiDownload /> CheatSheet.pdf
                            </a>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                    
                      </>
                    )
                  }):<div className="nodatahere"><NoDataFound/></div>
                }
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
    </>
  );
};
export default KnowledgeBase;
