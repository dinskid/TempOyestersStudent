import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertExample = ({ code }) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert
      color="success"
      style={{ height: '40px', marginTop: '10px' }}
      isOpen={visible}
      toggle={onDismiss}
    >
      {code}{' '}
    </Alert>
  );
};

export default AlertExample;
