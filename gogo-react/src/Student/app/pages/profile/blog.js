import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Card, CardBody, Row, Col, Input, Button } from 'reactstrap';
import UploadPreview from './preview';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import axiosInstance from '../../../../helpers/axiosInstance';

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

  const [displayProfileImage, setDisplayProfileImage] = useState(null);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(blog);
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
        if (result.data.success) setSuccess('Blog Saved Successfully');
        else {
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

  return (
    <div>
      <Card className="mx-auto" style={{ width: '70%' }}>
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
                  console.log(e.target.files[0]);
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
    </div>
  );
  //   }
};

export default Blog;
