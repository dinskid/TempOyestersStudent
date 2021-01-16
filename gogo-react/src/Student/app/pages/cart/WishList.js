import React from 'react';
import {
  Card,
  Button,
  CardImg,
  CardText,
  Row,
  Col,
  CardBody,
} from 'reactstrap';

import { FiHeart } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';

import logo from '../angular.png';
import NoDataFound from './NoDataFound';

const WishList = ({ data, handleRemove, handleUpdate }) => {
  if (!data.length) return <NoDataFound />;
  return (
    <Row>
      {data.map((doc) => {
        if (doc.status == 'wishlist')
          return (
            <Col md={3} xs={12} key={doc.id}>
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
                      style={{ marginBottom: '1rem', margin: '5px' }}
                      onClick={() => handleUpdate(doc.session_id, 'cart')}
                    >
                      Move to Cart <FiHeart />
                    </Button>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          );
      })}
    </Row>
  );
};

export default WishList;
