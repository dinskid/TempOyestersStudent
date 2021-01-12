import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  Button,
  Col,
  CardText,
  UncontrolledCollapse,
  CardImg,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { HiOutlineShare } from 'react-icons/hi';
import { FiHeart } from 'react-icons/fi';
import { BiCheck } from 'react-icons/bi';
import { AiFillPlayCircle } from 'react-icons/ai';
import { ImAlarm } from 'react-icons/im';
import { Route, Link, useHistory } from 'react-router-dom';

import './course1.css';
import Man from './man.jpg';
import axiosInstance from '../../../../helpers/axiosInstance';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import Loader from './Loader';

const DetailsPages = ({ match, intl, ...props }) => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let session_id;
  try {
    session_id = props.location.state.session_id;
    console.log(session_id);
  } catch (err) {
    history.push('/app/pages/product/data-list');
  }
  const [session, setSession] = useState({
    session_name: '',
    session_description: '',
    session_fee: '',
    session_thumbnail: '',
    session_fee: '',
    session_duration: '',
    chapter_learnings: [],
  });

  const [instructor, setInstructor] = ['Udit Narayan'];

  const [work_exp, setWork_exp] = [
    'Senior Web Developer, Flexor Inc. from 2013 - 2017',
  ];

  const [about, setAbout] = [
    'Full stack web developer responsible for end-to-end web app development and creative cloud engineering. Led three teams of five employees each. Prototyped an average of 25 new product features per year. Drove best practice implementation for 22 employees across multiple departments. Decreased rework by 23% and costs by 15%. Boosted user experience scores by 55% over company-wide previous best.',
  ];

  const [content, setContent] = useState([]);

  useEffect(() => {
    if (error)
      NotificationManager.warning(
        error,
        'All Courses Error',
        3000,
        null,
        null,
        ''
      );
  }, [error, setError]);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const result = await axiosInstance.get(
          `/student/sessions/details/${session_id}`
        );
        console.log(result);

        if (result.data.success) {
          setSession(result.data.session);
          setContent(result.data.ans);
        } else {
          try {
            setError(result.data.error);
          } catch (er) {
            setError('Could not fetch details');
          }
        }
      } catch (err) {
        try {
          setError(err.response.data.error);
        } catch (e) {
          setError('Could not fetch details');
        }
      } finally {
        setIsLoaded(true);
      }
    };
    getDetails();
  }, []);

  if (!isLoaded) return <Loader />;

  return (
    <>
      <Row>
        <Col md="8">
          <div>
            <h2 className="heading">{session.session_name}</h2>
            <h6>{session.session_description}</h6>
            <p className="para">
              Instructor: <a href="#">{instructor}</a>
            </p>
            <Button className="button">
              Share <HiOutlineShare />
            </Button>
            <Button className="button ml-3">
              Wishlist <FiHeart />
            </Button>
            <Card body className="what_to_learn">
              <CardTitle tag="h2" className="head">
                What you'll learn
              </CardTitle>
              <Row>
                {session.chapter_learnings
                  ? session.chapter_learnings.map((doc) => {
                      return (
                        <>
                          <Col md="1">
                            <BiCheck className="bicheck" />
                          </Col>
                          <Col md="5">
                            <CardText className="ct">{doc}</CardText>
                          </Col>
                        </>
                      );
                    })
                  : ''}
              </Row>
            </Card>
          </div>
          <Card body className="trainer">
            <CardTitle tag="h2" className="head">
              About Trainer
            </CardTitle>
            <Row>
              <Col md="4">
                <img src={Man} className="inst_img" />
                <CardText className="inst_name text-center mt-2">
                  {instructor}
                </CardText>
              </Col>
              <Col md="8">
                <CardText className="font-weight-bold">{work_exp}</CardText>
                <CardText className="">{about}</CardText>
              </Col>
            </Row>

            <Button className="go_to_profile">
              <Route>
                <Link to="/app/pages/product/image-list">
                  <p className="mt-3 innertext">See Full Profile</p>
                </Link>
              </Route>
            </Button>
          </Card>
          <h2 className="mt-4 font-weight-bold">Course Content</h2>
          <Card className="toggle">
            {content.map((doc, index) => {
              const togglerId = `toggler${index}`;
              return (
                <>
                  <Card className="toggle">
                    <Button
                      color="link"
                      id={togglerId}
                      style={{ marginBottom: '1rem' }}
                    >
                      <p className="p">
                        {doc.name}
                        {/* <FcCheckmark style={{ marginLeft: '80px' }} /> */}
                      </p>
                    </Button>
                  </Card>
                  <UncontrolledCollapse toggler={togglerId}>
                    <Card className="toggled">
                      <CardBody>
                        {doc.lesson.map((l) => {
                          return (
                            <Row>
                              <p className="content m-3">
                                <AiFillPlayCircle className="iconvid" />
                                {l.name}
                              </p>
                              <p className="content mt-3 ml-auto mr-3">1:44</p>
                            </Row>
                          );
                        })}
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </>
              );
            })}
            <Button color="link" id="toggler" style={{ marginBottom: '1rem' }}>
              <p className="p">Getting started</p>
            </Button>
          </Card>
          <UncontrolledCollapse toggler="#toggler">
            <Card className="toggled">
              <CardBody>
                <Row>
                  <p className="content m-3">
                    <AiFillPlayCircle className="iconvid" />
                    content-1
                  </p>
                  <p className="content mt-3 ml-auto mr-3">1:44</p>
                </Row>
                <Row>
                  <p className="content m-3">
                    <AiFillPlayCircle className="iconvid" />
                    content-3
                  </p>
                  <p className="content mt-3 ml-auto mr-3">3:48</p>
                </Row>
                <Row>
                  <p className="content m-3">
                    <AiFillPlayCircle className="iconvid" />
                    content-2
                  </p>
                  <p className="content mt-3 ml-auto mr-3">5:05</p>
                </Row>
                <Row>
                  <p className="content m-3">
                    <AiFillPlayCircle className="iconvid" />
                    content-4
                  </p>
                  <p className="content mt-3 ml-auto mr-3">2:30</p>
                </Row>
                <Row>
                  <p className="content m-3">
                    <AiFillPlayCircle className="iconvid" />
                    content-5
                  </p>
                  <p className="content mt-3 ml-auto mr-3">1:44</p>
                </Row>
                <Row>
                  <p className="content m-3">
                    <AiFillPlayCircle className="iconvid" />
                    content-6
                  </p>
                  <p className="content mt-3 ml-auto mr-3">6:54</p>
                </Row>
                <Row>
                  <p className="content m-3">
                    <AiFillPlayCircle className="iconvid" />
                    content-7
                  </p>
                  <p className="content mt-3 ml-auto mr-3">5:49</p>
                </Row>
                <Row>
                  <p className="content m-3">
                    <AiFillPlayCircle className="iconvid" />
                    content-8
                  </p>
                  <p className="content mt-3 ml-auto mr-3">6:47</p>
                </Row>
                <Row>
                  <p className="content m-3">
                    <AiFillPlayCircle className="iconvid" />
                    content-9
                  </p>
                  <p className="content mt-3 ml-auto mr-3">3:46</p>
                </Row>
                <Row>
                  <p className="content m-3">
                    <AiFillPlayCircle className="iconvid" />
                    content-10
                  </p>
                  <p className="content mt-3 ml-auto mr-3">3:43</p>
                </Row>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
          <Card className="toggle2">
            <Button color="link" id="toggler2" style={{ marginBottom: '1rem' }}>
              <p className="p">The Basics</p>
            </Button>
          </Card>
          <UncontrolledCollapse toggler="#toggler2">
            <Card className="toggled">
              <CardBody>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-1
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-2
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-3
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-4
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-5
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-6
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-7
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-8
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-9
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-10
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
          <Card className="toggle2">
            <Button color="link" id="toggler3" style={{ marginBottom: '1rem' }}>
              <p className="p">Course Projects - The Basics</p>
            </Button>
          </Card>
          <UncontrolledCollapse toggler="#toggler3">
            <Card className="toggled">
              <CardBody>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-1
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-2
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-3
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-4
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-5
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-6
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-7
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-8
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-9
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-10
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
          <Card className="toggle2">
            <Button color="link" id="toggler4" style={{ marginBottom: '1rem' }}>
              <p className="p">Debugging</p>
            </Button>
          </Card>
          <UncontrolledCollapse toggler="#toggler4">
            <Card className="toggled">
              <CardBody>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-1
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-2
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-3
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-4
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-5
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-6
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-7
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-8
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-9
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-10
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
          <Card className="toggle2">
            <Button color="link" id="toggler5" style={{ marginBottom: '1rem' }}>
              <p className="p">Components </p>
            </Button>
          </Card>
          <UncontrolledCollapse toggler="#toggler5">
            <Card className="toggled">
              <CardBody>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-1
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-2
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-3
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-4
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-5
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-6
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-7
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-8
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-9
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-10
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
          <Card className="toggle2">
            <Button color="link" id="toggler6" style={{ marginBottom: '1rem' }}>
              <p className="p">Project - Components </p>
            </Button>
          </Card>
          <UncontrolledCollapse toggler="#toggler6">
            <Card className="toggled">
              <CardBody>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-1
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-2
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-3
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-4
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-5
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-6
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-7
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-8
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-9
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-10
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
          <Card className="toggle2">
            <Button color="link" id="toggler7" style={{ marginBottom: '1rem' }}>
              <p className="p">Directives</p>
            </Button>
          </Card>
          <UncontrolledCollapse toggler="#toggler7">
            <Card className="toggled">
              <CardBody>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-1
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-2
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-3
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-4
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-5
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-6
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-7
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-8
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-9
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-10
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
          <Card className="toggle2">
            <Button color="link" id="toggler8" style={{ marginBottom: '1rem' }}>
              <p className="p">Project - Directives</p>
            </Button>
          </Card>
          <UncontrolledCollapse toggler="#toggler8">
            <Card className="toggled">
              <CardBody>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-1
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-2
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-3
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-4
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-5
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-6
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-7
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-8
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-9
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-10
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
          <Card className="toggle2">
            <Button color="link" id="toggler9" style={{ marginBottom: '1rem' }}>
              <p className="p">Mega Projects</p>
            </Button>
          </Card>
          <UncontrolledCollapse toggler="#toggler9">
            <Card className="toggled">
              <CardBody>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-1
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-2
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-3
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-4
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-5
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-6
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-7
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-8
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-9
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
                <Row>
                  {' '}
                  <p className="content">
                    <AiFillPlayCircle className="iconvid" />
                    content-10
                  </p>
                  <p className="content mt-1 ml-auto mr-3">0:44</p>
                </Row>
              </CardBody>
            </Card>
          </UncontrolledCollapse>
        </Col>
        <Col md="4">
          <Card className="fixed width ">
            <CardImg
              top
              src={require('./angular.png') || session.session_thumbnail}
              alt="Card image cap"
              style={{ width: '100%', height: '50%' }}
            />
            <CardBody>
              <CardText tag="h2" className="price">
                Rs. {session.session_fee}
              </CardText>
              <CardText tag="h6" className="mb-2">
                <ImAlarm className="mr-2" /> Duration {session.session_duration}{' '}
                days
              </CardText>

              <Button className="btn2 mt-4">Add to Cart</Button>
              <Button outline color="secondary" className="btn3">
                Buy Now
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
    </>
  );
};
export default injectIntl(DetailsPages);
