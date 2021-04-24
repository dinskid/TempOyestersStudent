import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  Col,
  CardBody,
  Input,
  InputGroup,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { AiOutlineLeftCircle } from 'react-icons/ai';

import avatar from './Asset 1.png';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import axiosInstance from '../../../../helpers/axiosInstance';
import Loader from '../product/Loader';

function Setting() {
  const [student, setStudent] = useState({
    student_profile_picture: '',
    student_first_name: '',
    student_last_name: '',
    student_bio: '',
    student_website_url: '',
    student_linkedin_url: '',
    student_facebook_url: '',
    student_twitter_url: '',
    student_github_url: '',
    student_youtube_url: '',
  });

  const [displayProfileImage, setDisplayProfileImage] = useState(
    student.student_profile_picture
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Profile Error', 3000, null, null, '');
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      NotificationManager.success(
        success,
        'Profile Success',
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
        const result = await axiosInstance.get('/student/auth/profile');
        console.log(result);
        if (result.data.success) {
          if (result.data.result.student_profile_picture)
            setDisplayProfileImage(result.data.result.student_profile_picture);

          setStudent(result.data.result);
        } else {
          try {
            setError(result.data.error);
          } catch (e) {
            setError('unable to find referal details');
          }
        }
      } catch (error) {
        try {
          setError(error.response.data.error);
        } catch (error) {
          setError('Unable to find blogs');
        }
      } finally {
        setLoaded(true);
      }
    };
    getData();
  }, []);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append(
        'student_profile_picture',
        student.student_profile_picture
      );
      formData.append('values', JSON.stringify(student));
      const result = await axiosInstance.put('/student/auth/profile', formData);
      console.log(result);
      if (result.data.success) setSuccess('Profile Updated Successfully');
      else {
        try {
          setError(result.data.error);
        } catch (e) {
          setError('unable to find referal details');
        }
      }
    } catch (error) {
      try {
        setError(error.response.data.error);
      } catch (error) {
        setError('Unable to find blogs');
      }
    }
  };
  if (!loaded) return <Loader />;
  return (
    <div>
      <Link to="/app/pages/product/data-list">
        <AiOutlineLeftCircle
          className="mb-4"
          style={{ fontSize: '30px', cursor: 'pointer' }}
        />
      </Link>
      <Card className="mx-auto" style={{ width: '100%' }}>
        <CardBody>
          <h2 className=" text-center mx-auto font-weight-bold">
            Your Profile
          </h2>
          <p className=" text-center mx-auto ">
            Add information about yourself
          </p>
          <hr />
          <Row>
            <Col md={12}>
              <Row>
                <label className="mt-3 text-center mx-auto d-flex">
                  Update Avatar
                </label>
              </Row>
              <Row>
                <img
                  // src={avatar}
                  src={displayProfileImage}
                  style={{
                    borderRadius: '50%',
                    width: '150px',
                    height: '150px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    border: '1px solid black',
                  }}
                />
              </Row>
              <Row className="mx-auto d-flex align-items-center">
                <Input
                  type="file"
                  accept="image/*"
                  data-max-sizeIs="2000"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    const file = URL.createObjectURL(e.target.files[0]);
                    const currentImage = e.target.files[0];
                    console.log(
                      currentImage.name.substr(
                        currentImage.name.lastIndexOf('.') + 1
                      )
                    );
                    if (
                      currentImage.type != 'image/jpg' &&
                      currentImage.type != 'image/jpeg' &&
                      currentImage.type != 'image/png' &&
                      currentImage.type != 'image/webp'
                    )
                      setError('only jpg,jpeg,png,webp formats are allowed');
                    else {
                      setStudent((prevState) => ({
                        ...prevState,
                        student_profile_picture: currentImage,
                      }));
                      setDisplayProfileImage(file);
                    }
                  }}
                />
              </Row>
            </Col>
            <Col md={6} xs={12}>
              <label className="mt-3">First Name</label>
              <Input
                type="text"
                placeholder="Enter your firstname"
                name="student_first_name"
                onChange={handlechange}
                value={student.student_first_name}
              />
            </Col>
            <Col md={6} xs={12}>
              <label className="mt-3">Last Name</label>
              <Input
                type="text"
                placeholder="Enter your lasttname"
                name="student_last_name"
                onChange={handlechange}
                value={student.student_last_name}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12} xs={12}>
              <label>Bio</label>
              <Input
                type="textarea"
                placeholder="Enter About yourself"
                name="student_bio"
                onChange={handlechange}
                value={student.student_bio}
              />
            </Col>
          </Row>
          <br />
          <hr />
          <h4 className="text-center">Links</h4>
          <Row>
            <Col md={6} xs={12}>
              <label className="mt-4">Facebook</label>
              <InputGroup>
                <Input
                  placeholder="Enter your facebook profile link"
                  name="student_facebook_url"
                  onChange={handlechange}
                  value={student.student_facebook_url}
                />
              </InputGroup>
            </Col>
            <Col md={6} xs={12}>
              <label className="mt-4">Twitter</label>
              <InputGroup>
                <Input
                  placeholder="Enter your twitter profile link"
                  name="student_twitter_url"
                  onChange={handlechange}
                  value={student.student_twitter_url}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12}>
              <label className="mt-4">LinkedIn</label>
              <InputGroup>
                <Input
                  placeholder="Enter your linkedin profile link"
                  name="student_linkedin_url"
                  onChange={handlechange}
                  value={student.student_linkedin_url}
                />
              </InputGroup>
            </Col>
            <Col md={6} xs={12}>
              <label className="mt-4">Youtube</label>
              <InputGroup>
                <Input
                  placeholder="Enter your youtube profile link"
                  name="student_youtube_url"
                  onChange={handlechange}
                  value={student.student_youtube_url}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12}>
              <label className="mt-4">Github</label>
              <InputGroup>
                <Input
                  placeholder="Enter your github profile link"
                  name="student_github_url"
                  onChange={handlechange}
                  value={student.student_github_url}
                />
              </InputGroup>
            </Col>
            <Col md={6} xs={12}>
              <label className="mt-4">Website(if any)</label>
              <InputGroup>
                <Input
                  placeholder="Enter your website link"
                  name="student_website_url"
                  onChange={handlechange}
                  value={student.student_website_url}
                />
              </InputGroup>
            </Col>
          </Row>
          <Button
            className="mx-auto d-flex mt-4"
            style={{ borderRadius: '0px' }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardBody>
      </Card>
      <br />
      <br />
    </div>
  );
}

export default Setting;
