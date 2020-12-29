import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardText, CardBody, Col, Row } from 'reactstrap';
import './course1.css';
import axiosInstance from '../../../../helpers/axiosInstance';
import NotificationManager from '../../../../components/common/react-notifications';

const Live_Session = () => {
  const [names, setNames] = useState([]);
  const [error, setError] = useState(null);

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
    async function fetchData() {
      try {
        const result = await axiosInstance.get('/sessions/live');
        console.log(result);
        if (result.data.success) {
          const data = result.data.sessions.map((doc) => ({
            img: doc.session_thumbnail,
            course: doc.session_name,
            genre: doc.session_tagline,
            desc: doc.session_description,
            cost: doc.session_fee,
            tags: doc.session_tags,
          }));
          console.log(data);
          setNames(data);
        } else {
          try {
            setError(result.data.error);
          } catch (e) {
            setError('Unable to fetch data');
          }
        }
      } catch (err) {
        try {
          setError(err.response.data.error);
        } catch (error) {
          setError('Unable to fetch data');
        }
      }
    }
    fetchData();
  }, []);

  return (
    <Row>
      {names.map((name) => {
        return (
          <Col md={3} xs={12}>
            <Card
              className="mt-2 mb-2"
              style={{
                width: '100%',
                height: '450px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {/* <Route><Link to="details"> */}
              <CardImg
                top
                style={{ width: '100%' }}
                src={require('./vue.png') || name.img}
                alt="Card image cap"
              />
              {/* </Link></Route> */}
              <CardBody>
                <h2 className="font-weight-bold">{name.course}</h2>
                <h6 className="mb-2 font-weight-bold">{name.genre}</h6>
                <CardText>{name.desc}</CardText>
                <Row>
                  <h5 className="mr-auto ml-4">
                    <b>${name.cost}</b>
                  </h5>
                  <h5 className="ml-auto mr-4">
                    <b>Tags:</b> {name.tags}
                  </h5>
                </Row>
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Live_Session;
