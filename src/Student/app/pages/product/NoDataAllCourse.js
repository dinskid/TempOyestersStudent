import React from 'react';
import logo from '../noData.svg';

function NoDataAllCourse() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem, 0',
      }}
    >
      <img
        src={logo}
        alt="you haven't purchase any course yet"
        className="nodata-img"
      />{' '}
      <h3
        style={{
          marginBottom: '20px',
          textAlign: 'center',
          color: 'purple',
          fontSize: '18px',
          fontWeight: '500',
        }}
      >
        {' '}
        No Courses created yet
      </h3>
    </div>
  );
}

export default NoDataAllCourse;
