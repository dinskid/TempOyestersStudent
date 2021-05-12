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
    <div className="course-card-container">
      {names.map((name, index) => {
        return (
          <div className="course-card">
            <p className="course-card-price"> Rs.{name.cost}</p>
            <div className="img-container">
              <img src={name.img || Logo} alt="Card image cap" />
            </div>
            <div className="course-card-content">
              <h2>{name.course.substr(0, 38)}</h2>
              <p>{name.genre ? name.genre.substr(0, 200) : ''}</p>
              <p>{name.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Live_Session;
