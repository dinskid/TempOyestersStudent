import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  CardImg,
  CardText,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { FiHeart } from 'react-icons/fi';
import { AiFillCloseCircle, AiFillClockCircle } from 'react-icons/ai';

import Coupon from './Coupon';
import NoDataFound from './NoDataFound';
import logo from '../angular.png';
import Alert from './Alert';

import axiosInstance from '../../../../helpers/axiosInstance';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import Loader from '../product/Loader';

const Cart = ({
  data,
  reload,
  setReload,
  handleReload,
  handleRemove,
  handleUpdate,
  checkoutPrice,
}) => {
  const [paymentDone, setPaymentDone] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    window.scrollTo({ top: 0 });
    script.onload = () => console.log('script loaded');
    script.onerror = () => console.log('script not loaded');
  }, []);

  useEffect(() => {
    if (error)
      NotificationManager.warning(error, 'Cart Error', 3000, null, null, '');
  }, [error]);

  const razorpay = () => {
    setLoading(true);
    const values = {
      amount: checkoutPrice,
      sessions: data.map((doc) => ({
        session_id: doc.session_id,
        session_fee: doc.cost,
      })),
    };
    axiosInstance
      .post('/student/cart/razorpay', { values })
      .then((res) => {
        console.log(res);
        setLoading(false);

        const data = res.data.data;
        const options = {
          key: process.env.REACT_APP_RAZORPAY_API_KEY,
          currency: data.currency,
          amount: data.amount,
          name: data.name,
          email: data.email,
          contact: data.contact,
          description: 'event',
          order_id: data.id,

          handler: function (response) {
            const element = document.createElement('a');
            element.setAttribute(
              'href',
              'data:text/plain;charset=utf-8,' +
                encodeURIComponent(`Your Registeration Details are as follows - 
                      1. Payment Id: ${response.razorpay_payment_id}
                      2. Order Id: ${response.razorpay_order_id}
                      3. Payment Signature: ${response.razorpay_signature}
                      4. Event Name : ${'event'}
										`)
            );
            element.setAttribute('download', 'Event_Registeration.txt');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();
            document.body.removeChild(element);

            setPaymentDone(1);
          },
          modal: {
            ondismiss: function () {
              setPaymentDone(0);
            },
          },
          prefill: {
            name: data.name,
            email: data.email,
            contact: data.contact,
          },
        };

        const paymentObj = new window.Razorpay(options);
        paymentObj.open();
      })
      .catch((err) => {
        try {
          setError(err.response.data.error);
        } catch (e) {
          setError('Could not fetch details');
        }
      })
      .then(() => {
        handleReload();
        setReload(!reload);
        setLoading(false);
      });
  };

  if (!data.length) return <NoDataFound />;
  if (loading) return <Loader />;
  return (
    <Row>
      <Col md={9} xs={12}>
        <Row>
          {data.map((doc) => {
            if (doc.status == 'cart')
              return (
                <Col md={5} xs={12} key={doc.id}>
                  <Card
                    className="mt-2"
                    style={{
                      width: '100%',
                      minHeight: '300px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginBottom: '50px',
                    }}
                  >
                    <CardImg
                      top
                      style={{
                        width: '100%',
                        position: 'relative',
                        maxHeight: '250px',
                      }}
                      src={doc.img || logo}
                      alt="Card image cap"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '30px',
                        backgroundColor: '#ff0000',
                        borderRadius: '5px',
                      }}
                    >
                      <p
                        className="mt-1 mb-2 mr-2 ml-2"
                        style={{ color: '#fff', fontSize: '16px' }}
                      >
                        Rs.{doc.cost}
                      </p>
                    </div>

                    <CardBody>
                      <h2 className="font-weight-bold">{doc.name}</h2>

                      <CardText>{doc.text}</CardText>

                      <Row>
                        <Button
                          style={{ marginBottom: '1rem', margin: '5px' }}
                          onClick={() => handleRemove(doc.id)}
                        >
                          Remove <AiFillCloseCircle />
                        </Button>

                        <Button
                          style={{
                            marginBottom: '1rem',
                            margin: '5px',
                          }}
                          onClick={() =>
                            handleUpdate(doc.session_id, 'savedforlater')
                          }
                        >
                          Save For Later <AiFillClockCircle />
                        </Button>

                        <Button
                          style={{ marginBottom: '1rem', margin: '5px' }}
                          onClick={() =>
                            handleUpdate(doc.session_id, 'wishlist')
                          }
                        >
                          Move to Wishlist <FiHeart />
                        </Button>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              );
          })}
        </Row>
      </Col>

      <Col md={3} xs={12}>
        <h2>Total:</h2>
        <h4>
          <b> Rs. {checkoutPrice} </b>{' '}
        </h4>
        <Button style={{ marginBottom: '2rem' }} onClick={razorpay}>
          Checkout
        </Button>
        <Coupon />
        <Alert code="DEMO CODE" />
      </Col>
    </Row>
  );
};

export default Cart;
