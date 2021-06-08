import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {
  return (
    <div style={{ marginTop: '30%', marginLeft: '50%' }}>
      <Spinner color="primary" />
    </div>
  );
};

export default Loader;
