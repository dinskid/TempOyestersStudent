import React from 'react';
import disabled from './Disabled.svg';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
const Disabled = () => {
  return (
    <>
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          padding: '0rem 0',
        }}
      >
        <Fade left cascade>
          <img
            src={disabled}
            alt="you don't have any sessions yet logo"
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '300px',
              height: '300px',
            }}
          />{' '}
        </Fade>
        <Fade right casecade effect="delayOut">
          <h1
            style={{
              // marginBottom: '20px',
              textAlign: 'center',
              color: 'purple',
              fontSize: '35px',
            }}
          >
            Prohibited
          </h1>
          <h3 style={{ textAlign: 'center' }}>
            Contact your Tutor for more details
          </h3>
        </Fade>
      </div>
    </>
  );
};
export default Disabled;
