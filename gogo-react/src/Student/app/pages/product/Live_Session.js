import React, { useState, useEffect } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Badge,
  Col,
  Row,
  Spinner,
} from 'reactstrap';
import './course1.css';
import axiosInstance from '../../../../helpers/axiosInstance';
import NotificationManager from '../../../../components/common/react-notifications/NotificationManager';
import NoDataFound from '../NoDataFound';
import Logo from '../../../../data/Logo';

const Live_Session = () => {
  const [names, setNames] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
        const result = await axiosInstance.get('/student/sessions/live');

        if (result.data.success) {
          const data = result.data.sessions.map((doc) => ({
            img: doc.session_thumbnail,
            course: doc.session_name,
            genre: doc.session_tagline,
            desc: doc.session_description,
            cost: doc.session_fee,
            tags: doc.session_tags,
          }));

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
      } finally {
        setIsLoaded(true);
      }
    }
    fetchData();
  }, []);

  if (!isLoaded)
    return (
      <div style={{ marginTop: '30%', marginLeft: '50%' }}>
        <Spinner color="primary" />
      </div>
    );

  if (!names.length) return <NoDataFound />;

  return (
    <Row id="jt_all_course">
      {names.map((name) => {
        return (
          <Col md={3} xs={12}>
            <Card
              className="mt-2"
              style={{
                width: '100%',
                minHeight: '550px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '50px',
              }}
            >
              {/* <Route><Link to="details"> */}
              <CardImg
                top
                style={{ width: '100%' }}
                src={Logo || name.img}
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
                  Rs.{name.cost}
                </p>
              </div>
              {/* </Link></Route> */}
              <CardBody>
                <div className="jt_cart">
                  <h2 className="font-weight-bold">{name.course}</h2>
                  {/* <h6 className="mb-2 font-weight-bold">{name.genre}</h6> */}
                  <CardText>{name.desc}</CardText>
                </div>
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Live_Session;
