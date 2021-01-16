import React from 'react';
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

const Cart = ({ data, handleRemove, handleUpdate, checkoutPrice }) => {
  if (!data.length) return <NoDataFound />;
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
        <Button style={{ marginBottom: '2rem' }}>Checkout</Button>
        <Coupon />
        <Alert code="DEMO CODE" />
      </Col>
    </Row>
  );
};

export default Cart;
