import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import './nav.css';
import { FaFacebook } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import { AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai';
import mob from './black.png';
import com from './white.png';
import { FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="page-footer pt-3">
      <Row className="m-0">
        <Col md="2"></Col>
        <Col md="3" xs="12 " className="text-center">
          <p className=" copy1 ">
            Copyright © Trainer Oyesters Training <br /> All Rights Reserved{' '}
            <br /> <b className="text-center">Contact Trainer at</b>
            <br />
            <a href="https://www.facebook.com/OyestersTraining">
              {' '}
              <FaFacebook
                style={{
                  color: '#046DE4',
                  fontSize: '25px',
                  marginRight: '20px',
                  marginTop: '5px',
                }}
              />
            </a>
            <a href="https://www.instagram.com/oyesters_trainings/?hl=en">
              <FiInstagram
                style={{
                  color: '#ED4956',
                  fontSize: '25px',
                  marginRight: '20px',
                  marginTop: '5px',
                }}
              />
            </a>
            <a href="https://www.linkedin.com/company/oyesterstrainings/">
              <AiFillLinkedin
                style={{ color: '#50ABF1', fontSize: '25px', marginTop: '5px' }}
              />{' '}
            </a>
          </p>
        </Col>
        <Col md="4" xs="12" className=" col2  text-center">
          <Link to="/app/privacy" className=" mt-4 copy">
            Privacy & Policy
          </Link>
          <Link to="/app/cookie" className=" mt-4 ml-2 copy">
            Cookie Policy
          </Link>
          <Link to="/app/terms" className=" mt-4 ml-2 copy">
            Terms of service
          </Link>
          <br />
          <Link to="/app/irp" className=" mt-4 ml-2 copy">
            IPR Complaints
          </Link>
          <Link to="/app/antispam" className=" mt-4 ml-2 copy">
            Anti Spam Policy
          </Link>
          <Link to="/app/abuse" className=" mt-4 ml-2 copy">
            Abuse Policy
          </Link>
        </Col>
        <Col md="3" xs="12" className="text-center  text-light mt-2">
          <p style={{ lineHeight: '0px' }}>Deliver online with Oyesters</p>
          <img
            src={com}
            style={{ width: '30%', marginLeft: 'auto', marginright: 'auto' }}
            id="com"
          />
          <img
            src={mob}
            id="mob"
            style={{ width: '30%', marginLeft: 'auto', marginright: 'auto' }}
          />
          <br />
          <p>Platform by Oyesters</p>
          <a href="https://www.facebook.com/OyestersTraining">
            <FaFacebook
              style={{
                color: '#046DE4',
                fontSize: '20px',
                marginRight: '20px',
                marginTop: '-15px',
              }}
            />
          </a>
          <a href="https://www.instagram.com/oyesters_trainings/?hl=en">
            <FiInstagram
              style={{
                color: '#ED4956',
                fontSize: '20px',
                marginRight: '20px',
                marginTop: '-15px',
              }}
            />
          </a>
          <a href="https://www.linkedin.com/company/oyesterstrainings/">
            <AiFillLinkedin
              style={{ color: '#50ABF1', fontSize: '20px', marginTop: '-15px' }}
            />
          </a>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
