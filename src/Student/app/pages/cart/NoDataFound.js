import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import logo from '../session.svg';

const NoDataFound = () => {
  const history = useHistory();
  return (
    <>
      <img
        src={logo}
        alt="you don't have any sessions yet logo"
        style={{
          marginTop: '15%',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '15%',
          height: '15%',
        }}
      />{' '}
      <h3
        style={{ marginBottom: '20px', textAlign: 'center', color: 'purple' }}
      >
        {' '}
        You Don 't Have Any Data Yet <br />{' '}
        <Button onClick={() => history.push('/app/pages/product/data-list')}>
          Explore Courses
        </Button>
      </h3>
      <br />
      <br />
      <br />
    </>
  );
};
export default NoDataFound;
