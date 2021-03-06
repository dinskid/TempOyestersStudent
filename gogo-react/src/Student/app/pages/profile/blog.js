import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import axiosInstance from '../../../../helpers/axiosInstance';
import Disabled from './Disabled';

import { IoIosPeople } from 'react-icons/io';
import { BiComment } from 'react-icons/bi';
import { AiFillLike, AiFillEye } from 'react-icons/ai';

import Table from './Table';
import NoDataFound from "../NoDataFound";
import './styles.css';

const Blog = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [blog, setBlog] = useState({
    blog_writer_name: '',
    blog_writer_email: '',
    blog_title: '',
    blog_thumbnail: '',
    blog_body: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [enabled, setEnabled] = useState(true);

  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  const [reload, setReload] = useState(false);
  const handleReloadTable = () => setReload(!reload);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const blog_columns = [
    {
      Header: 'Blog Title',
      accessor: 'blog_title',
      cellClass: 'text-muted w-45',
      Cell: (props) => (
        <p style={{ marginLeft: '10px', fontSize: '1rem' }}>{props.value}</p>
      ),
      sortType: 'basic',
    },
    // {
    //   Header: 'Blog Writer Email',
    //   accessor: 'blog_writer_email',
    //   cellClass: 'text-muted w-45',
    //   Cell: (props) => (
    //     <p style={{ marginLeft: '40px', fontSize: '1rem' }}>{props.value}</p>
    //   ),
    //   sortType: 'basic',
    // },
    {
      Header: 'Likes',
      accessor: 'blog_likes',
      cellClass: 'text-muted w-45',
      Cell: (props) => (
        <p style={{ marginLeft: '23px', fontSize: '1rem' }}>{props.value}</p>
      ),
      sortType: 'basic',
    },
    {
      Header: 'Blogs Comments',
      accessor: 'blog_comments',
      cellClass: 'text-muted w-45',
      Cell: (props) => (
        <p style={{ marginLeft: '40px', fontSize: '1rem' }}>{props.value}</p>
      ),
      sortType: 'basic',
    },
    {
      Header: 'Blog Views',
      accessor: 'blog_id',
      cellClass: 'text-muted w-45',
      Cell: (props) => (
        <p style={{ marginLeft: '40px', fontSize: '1rem' }}>{props.value}</p>
      ),
      sortType: 'basic',
    },
  ];

  const [blogList, setBlogList] = useState([]);

  const onEditorStateChange = (editorState) => {
    setBlog((prevState) => ({
      ...prevState,
      ['blog_body']: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
    setEditorState(editorState);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      NotificationManager.warning(error, 'Blog Error', 3000, null, null, '');
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      NotificationManager.success(
        success,
        'Blog Success',
        3000,
        null,
        null,
        ''
      );
      setSuccess(null);
    }
  }, [success]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axiosInstance.get('/student/blog');
        
        setEnabled(result.data.isEnabled);
        // if (result.data.isEnabled) {
          const data = result.data.result.map((doc) => {
            return {
              blog_id: doc.blog_id,
              blog_title: doc.blog_title,
              blog_writer_email: doc.blog_writer_email,
              blog_likes: '20 Static',
              blog_comments: '30 Static',
            };
          });
          
          setTotalBlogs(data.length);
          setBlogList(data);
          setTotalLikes('20 Static');
          setTotalComments('20 Static');
          setTotalViews('0 Static');
        // }
      } catch (error) {
        try {
          setError(error.response.data.error);
        } catch (error) {
          setError('Unable to find blogs');
        }
      }
    };
    getData();
  }, [reload, setReload]);

  const [displayProfileImage, setDisplayProfileImage] = useState(null);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    
    if (!blog.blog_writer_name) setError('Writer name not provided');
    else if (!blog.blog_writer_email) setError('Email not provided');
    else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        blog.blog_writer_email
      )
    )
      setError('Invalid Email');
    else if (!blog.blog_title) setError('Blog title not provided');
    else if (!blog.blog_body || blog.blog_body === '<p></p>\n')
      setError('Blog body not provided');
    else if (!blog.blog_thumbnail) setError('blog thumbnail not provided');
    else {
      try {
        const formData = new FormData();
        formData.append('blog_thumbnail', blog.blog_thumbnail);
        formData.append('values', JSON.stringify(blog));

        const result = await axiosInstance.post('/student/blog', formData);
        if (result.data.success) {
          toggleModal();
          setSuccess('Blog Saved Successfully');
          setReload(!reload);
          setBlog({
            blog_writer_name: '',
            blog_writer_email: '',
            blog_title: '',
            blog_thumbnail: '',
            blog_body: '',
          });
          setDisplayProfileImage(null);
        } else {
          try {
            setError(result.data.error);
          } catch (e) {
            setError('Could not post blog');
          }
        }
      } catch (err) {
        console.log(err);
        try {
          setError(err.response.data.error);
        } catch (error) {
          setError('Could not post blog');
        }
      }
    }
  };

  if (!enabled) return <Disabled />;

 

  // return <div>Hello</div>;
  const height = !blogList.length ? '80px' : `${blogList.length * 50}px`;
  return (
    <div id="jt_blog_css">
      {modal ? (
        <>
          <Row>
            <Col sm="3" xs="12" className="mb-3">
              <Card
                body
                id="crd"
                className="text-center"
                style={{ backgroundColor: '#FFA07A' }}
              >
                <Row>
                  <Col md="6" xs="6">
                    <IoIosPeople id="myicon" className="text-light" />
                  </Col>
                  <Col md="6" xs="6">
                    <CardText className="font-weight-bold head text-light">
                      {totalBlogs}
                    </CardText>
                    <CardText className="font-weight-bold para text-light">
                      Total Blogs
                    </CardText>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm="3" xs="12" className="mb-3">
              <Card
                body
                id="crd"
                className="text-center"
                style={{ backgroundColor: '#AF7AC5' }}
              >
                <Row>
                  <Col md="6" xs="6">
                    <AiFillLike id="myicon" className="text-light" />
                  </Col>
                  <Col md="6" xs="6">
                    <CardText className="font-weight-bold head text-light">
                      {totalLikes}
                    </CardText>
                    <CardText className="font-weight-bold para text-light">
                      Total Likes
                    </CardText>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm="3" xs="12" className="mb-3">
              <Card
                body
                id="crd"
                className="text-center"
                style={{ backgroundColor: '#52BE80' }}
              >
                <Row>
                  <Col md="6" xs="6">
                    <BiComment id="myicon" className="text-light" />
                  </Col>
                  <Col md="6" xs="6" className="mb-3">
                    <CardText className="font-weight-bold head text-light">
                      {/* <BiRupee /> */}
                      {totalComments}
                    </CardText>
                    <CardText className="font-weight-bold para text-light">
                      Total Comments
                    </CardText>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm="3" xs="12" className="mb-3">
              <Card
                body
                id="crd"
                className="text-center"
                style={{ backgroundColor: '#5499C7' }}
              >
                <Row>
                  <Col md="6" xs="6">
                    <AiFillEye id="myicon" className="text-light" />
                  </Col>
                  <Col md="6" xs="6" className="mb-3">
                    <CardText className="font-weight-bold head text-light">
                      {totalViews}
                    </CardText>
                    <CardText className="font-weight-bold para text-light">
                      Total Views
                    </CardText>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Card
            style={{
              height: !blogList.length ? '120px' : `${blogList.length * 100}px`,
              marginBottom: '5rem',
              paddingBottom: !blogList.length ? '0' : '21rem',
            }}
          >
            <CardBody>
              {/* <div className="create_button_here"> */}
              {blogList.length==0 ? (
                <Button className="mt-3" onClick={toggleModal}>
                  {' '}
                  Create Blog
                  
                </Button>
              ) : (
                <div style={{ position: 'relative' }}>
                  <Button
                    className="mt-3"
                    style={{ position: 'absolute', right: 0 }}
                    onClick={toggleModal}
                  >
                    Create Blog
                  </Button>
                  <Table
                    columns={blog_columns}
                    data={blogList}
                    handleReloadTable={handleReloadTable}
                  />
                </div>
              )}
              {/* </div> */}
            </CardBody>
          </Card>{' '}
          <Modal
            isOpen={modal}
            toggle={toggleModal}
            wrapClassName="modal-right"
            backdrop="static"
          >
            <ModalHeader toggle={toggleModal}>
              <IntlMessages id="Add New Blog" />
            </ModalHeader>
            <Card className="mx-auto" style={{ marginLeft: '-50rem' }}>
              <CardBody>
                <h2 className="font-weight-bold text-center">
                  Express Your inner voice !!!
                </h2>
                <Row className="mt-4">
                  <Col md={6}>
                    <label>Name</label>
                    <Input
                      placeholder="Enter your name"
                      name="blog_writer_name"
                      onChange={handlechange}
                      value={blog.blog_writer_name}
                    />
                  </Col>
                  <Col md={6}>
                    <label>Email</label>
                    <Input
                      placeholder="Enter your Email"
                      name="blog_writer_email"
                      onChange={handlechange}
                      value={blog.blog_writer_email}
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={6}>
                    <label>Title</label>
                    <Input
                      placeholder="Enter Title of Blog"
                      name="blog_title"
                      onChange={handlechange}
                      value={blog.blog_title}
                    />
                  </Col>
                  <Col md={6}>
                    <label>Upload thumbnail</label>
                    <img
                      src={displayProfileImage}
                      style={{ width: '20%', marginLeft: '10px' }}
                    />
                    <input
                      type="file"
                      name="customer_profile_picture"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        
                        const file = URL.createObjectURL(e.target.files[0]);
                        const currentImage = e.target.files[0];
                        if (
                          currentImage.type != 'image/jpg' &&
                          currentImage.type != 'image/jpeg' &&
                          currentImage.type != 'image/png'
                        )
                          setError('only jpg,jpeg,png formats are allowed');
                        else {
                          if (currentImage.size > 2048000)
                            setError('max image size limit is 2MB');
                          else {
                            setBlog((prevState) => ({
                              ...prevState,
                              ['blog_thumbnail']: currentImage,
                            }));
                            setDisplayProfileImage(file);
                          }
                        }
                      }}
                    />

                    {/* <UploadPreview /> */}
                  </Col>
                </Row>
                <Card
                  className="mt-4" /* style={{boxShadow: 'none', height:'400px', border: '1px solid gray'}} */
                >
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    editorStyle={{ height: '400px' }}
                  />
                </Card>

                <Button
                  style={{ borderRadius: '0px' }}
                  className="mx-auto d-flex mt-4"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </CardBody>
            </Card>
            <br />
          </Modal>
        </>
      ) : (
        <>
          <Row>
            <Col sm="3" xs="12" className="mb-3">
              <Card
                body
                id="crd"
                className="text-center"
                style={{ backgroundColor: '#FFA07A' }}
              >
                <Row>
                  <Col md="6" xs="6">
                    <IoIosPeople id="myicon" className="text-light" />
                  </Col>
                  <Col md="6" xs="6">
                    <CardText className="font-weight-bold head text-light">
                      {totalBlogs}
                    </CardText>
                    <CardText className="font-weight-bold para text-light">
                      Total Blogs
                    </CardText>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm="3" xs="12" className="mb-3">
              <Card
                body
                id="crd"
                className="text-center"
                style={{ backgroundColor: '#AF7AC5' }}
              >
                <Row>
                  <Col md="6" xs="6">
                    <AiFillLike id="myicon" className="text-light" />
                  </Col>
                  <Col md="6" xs="6">
                    <CardText className="font-weight-bold head text-light">
                      {totalLikes}
                    </CardText>
                    <CardText className="font-weight-bold para text-light">
                      Total Likes
                    </CardText>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm="3" xs="12" className="mb-3">
              <Card
                body
                id="crd"
                className="text-center"
                style={{ backgroundColor: '#52BE80' }}
              >
                <Row>
                  <Col md="6" xs="6">
                    <BiComment id="myicon" className="text-light" />
                  </Col>
                  <Col md="6" xs="6" className="mb-3">
                    <CardText className="font-weight-bold head text-light">
                      {/* <BiRupee /> */}
                      {totalComments}
                    </CardText>
                    <CardText className="font-weight-bold para text-light">
                      Total Comments
                    </CardText>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm="3" xs="12" className="mb-3">
              <Card
                body
                id="crd"
                className="text-center"
                style={{ backgroundColor: '#5499C7' }}
              >
                <Row>
                  <Col md="6" xs="6">
                    <AiFillEye id="myicon" className="text-light" />
                  </Col>
                  <Col md="6" xs="6" className="mb-3">
                    <CardText className="font-weight-bold head text-light">
                      {totalViews}
                    </CardText>
                    <CardText className="font-weight-bold para text-light">
                      Total Views
                    </CardText>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {blogList.length!=0?(<>
            <Card 
          className="jt_table"
            style={{
              height: !blogList.length ? '120px' : `${blogList.length * 100}px`,
              marginBottom: '5rem',
              paddingBottom: !blogList.length ? '0' : '21rem',
            }}
          >
          {/* {console.log(blogList.length*50)} */}
            <CardBody  style={{
              height: !blogList.length ? '120px' : `${blogList.length * 100}px`,
            }} >
              {/* <div className="create_button_here"> */}
              {blogList.length==0 ? (
                <Button 
                style={{ position: 'absolute', right: "20px" }}
                className="mt-3" onClick={toggleModal}>
                  {' '}
                  Create Blog
                </Button>
              ) : (
                <div style={{ position: 'relative' }}>
                  <Button
                    className="mt-3"
                    style={{ position: 'absolute', right: 0 }}
                    onClick={toggleModal}
                  >
                    Create Blog
                  </Button>
                  <br/>
                  <br/>
        
                  <Table
                   
                    columns={blog_columns}
                    data={blogList}
                    handleReloadTable={handleReloadTable}
                  />
                </div>
              )}
              {/* </div> */}
            </CardBody>
          </Card>{' '}
          </>)
          :(<div className="nodata_jt">
                <div className="button_create_blog_">
                  <Button className="mt-3" onClick={toggleModal}>
                    {' '}
                    Create Blog
                  </Button>
                </div>
              <NoDataFound/>
          </div>)}
        </>
      )}
    </div>
  );

  //   }
};

export default Blog;
