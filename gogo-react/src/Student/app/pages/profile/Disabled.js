import React from 'react';
import logo from '../session.svg';

const Disabled = () => {
  return (
    <>
      <img
        src={logo}
        alt="you don't have any sessions yet logo"
        style={{
          marginTop: '23%',
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
        This Functionality is Disabled By Tutor
      </h3>
      <br />
      <br />
      <br />
    </>
  );
};
export default Disabled;
