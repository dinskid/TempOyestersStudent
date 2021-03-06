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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
import { FcOk } from 'react-icons/fc';
import { useGlobalContext } from '../../../../context';
// import Logo from '../../../../data/Logo';

const DetailsPages = ({ match, intl, ...props }) => {
  const history = useHistory();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [cartModal, setCartModal] = useState(false);
  const toggleCartModal = () => setCartModal(!cartModal);

  const [cartItemStatus, setCartItemStatus] = useState(false);
  const { logo, profilePicture } = useGlobalContext();

  let session_id;
  try {
    session_id = props.location.state.session_id;
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
    session_trainer_id: '',
  });

  const [instructor, setInstructor] = useState('');
  const [work_exp, setWork_exp] = useState('');
  const [about, setAbout] = useState('');

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

  const checkItem = async () => {
    try {
      const result = await axiosInstance.get(
        `/student/sessions/details/${session_id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const checkEnrollment = (check) => {
    let enrollment = check;
    if (enrollment.student_wish_list_items != 0) {
      JSON.parse(enrollment.student_wish_list_items).map((d) => {
        if (d == session_id) {
          console.log('We have this');
          setCartItemStatus('wishlist');
        } else {
          console.log('we dont have');
          // setCartItemStatus('cart');
        }
      });
    }
    if (enrollment.student_cart_items != 0) {
      JSON.parse(enrollment.student_cart_items).map((d) => {
        if (d == session_id) {
          console.log('We have this');
          setCartItemStatus('cart');
        } else {
          console.log('we dont have');
        }
      });
    }

    // console.log();
  };
  useEffect(() => {
    const getDetails = async () => {
      try {
        const result = await axiosInstance.get(
          `/student/sessions/details/${session_id}`
        );
        console.log(result);

        if (result.data.success) {
          const trainerData = result.data.trainerData;
          console.log(trainerData);
          setSession(result.data.session);
          console.log(result.data.session);
          // setInstructor(trainerData.trainer_full_name);
          // setWork_exp(trainerData.trainer_occupation);
          setAbout(trainerData.trainer_career_summary);
          console.log(result.data.enrollment[0].student_cart_items);
          console.log(result.data.enrollment[0].student_wish_list_items);
          setContent(result.data.ans);
          checkEnrollment(result.data.enrollment[0]);
        } else {
          try {
            setError(result.data.error);
          } catch (er) {
            setError('Could not fetch details ');
          }
        }
      } catch (err) {
        try {
          // console.log(err);
          setError(err);
        } catch (e) {
          setError('Could not fetch details ');
        }
      } finally {
        setIsLoaded(true);
      }
    };
    getDetails();
  }, []);

  // useEffect(()=>{
  //   let data=JSON.parse(cartItemStatus);
  //   console.log(data);
  // },[cartItemStatus])

  const handleWishList = async () => {
    try {
      const values = {
        student_wish_list_items: session_id,
      };
      const result = await axiosInstance.put(
        `${window.location.protocol}//${window.location.hostname}:5000/student/cart/add_to_wish`,
        { values }
      );

      if (result.data.success) {
        setCartItemStatus('wishlist');
        toggle();
      } else {
        try {
          setError(result.data.error);
        } catch (er) {
          setError('Unable to add to wishlist');
        }
      }
    } catch (error) {
      try {
        setError(error.response.data.error);
      } catch (e) {
        setError('Unable to add to wishlist');
      }
    }
  };

  const handleAddToCart = async () => {
    try {
      const values = {
        student_cart_items: session_id,
      };
      const result = await axiosInstance.put(
        `${window.location.protocol}//${window.location.hostname}:5000/student/cart/add_to_cart`,
        { values }
      );

      if (result.data.success) {
        setCartItemStatus('cart');
        toggleCartModal();
      } else {
        try {
          setError(result.data.error);
        } catch (er) {
          setError('Unable to add to wishlist');
        }
      }
    } catch (error) {
      try {
        setError(error.response.data.error);
      } catch (e) {
        setError('Unable to add to wishlist');
      }
    }
  };
  const createMarkup = (data) => {
    return { __html: data };
  };

  if (!isLoaded) return <Loader />;

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Added to WishList</ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex' }}>
            <div>
              <FcOk />
              <img
                src={Man}
                style={{
                  height: '100px',
                  width: '100px',
                }}
                alt="Session Thumbnail"
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '2rem',
              }}
            >
              <h4>{session.session_name}</h4>
              <p>{session.session_description}</p>
            </div>{' '}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" target="_blank">
            <Link to={'/student/wish'} target="blank">
              Visit WishList
            </Link>
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={cartModal} toggle={toggleCartModal}>
        <ModalHeader toggle={toggleCartModal}>Added to Cart</ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex' }}>
            <div>
              <FcOk />
              <img
                src={Man}
                style={{
                  height: '100px',
                  width: '100px',
                }}
                alt="Session Thumbnail"
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '2rem',
              }}
            >
              <h4>{session.session_name}</h4>
              <p>{session.session_description}</p>
            </div>{' '}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">
            <Link to="/student/cart" target="blank">
              Visit Cart
            </Link>
          </Button>{' '}
          <Button color="secondary" onClick={toggleCartModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
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
            {cartItemStatus == 'wishlist' ? (
              <Button className="button ml-3">
                <Link
                  style={{ color: '#fff' }}
                  to="/student/wish"
                  target="_blank"
                >
                  Go To Wishlist <FiHeart />
                </Link>
              </Button>
            ) : cartItemStatus == 'cart' ? (
              <Button className="button ml-3 disabled">
                Wishlist <FiHeart />
              </Button>
            ) : cartItemStatus == 'purchased' ? (
              <Button className="button ml-3 disabled">
                Already Purchased
              </Button>
            ) : (
              <Button className="button ml-3" onClick={handleWishList}>
                Wishlist <FiHeart />
              </Button>
            )}
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
                <img src={logo || profilePicture} className="inst_img" />
                <CardText className="inst_name text-center mt-2">
                  {instructor}
                </CardText>
              </Col>
              <Col md="8">
                <CardText className="font-weight-bold">{work_exp}</CardText>
                <CardText className="">
                  <p
                    className="text-center"
                    style={{ fontSize: '15px' }}
                    dangerouslySetInnerHTML={createMarkup(about)}
                  ></p>
                </CardText>
              </Col>
            </Row>

            <Button className="go_to_profile" style={{ width: '100%' }}>
              <Route>
                <Link
                  to={{
                    pathname: '/app/pages/product/image-list',
                    state: {
                      trainer_id: session.session_trainer_id,
                    },
                  }}
                >
                  <p className="mt-3 innertext">See Full Profile</p>
                </Link>
              </Route>
            </Button>
          </Card>
          <div className="jt_detail_course">
            <h2 className=" font-weight-bold">Course Content</h2>
            {content.map((doc, index) => {
              const togglerId = `toggler${index}`;
              return (
                <>
                  <div className="toggle">
                    <Button
                      color="link"
                      id={togglerId}
                      style={{ marginBottom: '1rem' }}
                    >
                      <p className="p">{doc.name}</p>
                    </Button>
                  </div>
                  <UncontrolledCollapse toggler={togglerId}>
                    <div className="toggled">
                      <CardBody>
                        <ol>
                          {doc.lesson.map((l) => {
                            return (
                              <li>
                                <p className="content m-3">{l.name}</p>
                                {/* <p className="content mt-3 ml-auto mr-3">1:44</p> */}
                              </li>
                            );
                          })}
                        </ol>
                      </CardBody>
                    </div>
                  </UncontrolledCollapse>
                </>
              );
            })}
          </div>
        </Col>
        <Col md="4">
          <Card className="fixed width ">
            <CardImg
              top
              src={session.session_thumbnail || logo || profilePicture}
              alt="Card image cap"
              style={{ width: '100%', height: '50%' }}
            />
            <CardBody>
              <CardText tag="h2" className="price">
                Rs. {session.session_fee}
              </CardText>
              <CardText tag="h6" className="mb-2">
                {/* <ImAlarm className="mr-2" /> Duration {session.session_duration}{' '} */}
                <ImAlarm className="mr-2" /> Duration Lifetime access
              </CardText>
              {cartItemStatus == 'cart' ? (
                <Button className="btn2 mt-4">
                  {/* <Link to="/student/cart" target="blank"> */}
                  <Link to="#">Go To Cart</Link>
                </Button>
              ) : cartItemStatus == 'purchased' ? (
                <Button className="btn2 mt-4 disabled">
                  Already Purchased
                </Button>
              ) : cartItemStatus == 'wishlist' ? (
                <Button className="btn2 mt-4 disabled">Add to Cart</Button>
              ) : (
                <Button className="btn2 mt-4" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              )}
              {cartItemStatus == 'purchased' ? (
                <Button className="btn2 mt-4 disabled">
                  Already Purchased
                </Button>
              ) : (
                <Button outline color="secondary" className="btn3">
                  Buy Now
                </Button>
              )}
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
