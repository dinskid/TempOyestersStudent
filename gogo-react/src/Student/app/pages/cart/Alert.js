import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertExample = ({ code, onRemove }) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
    onRemove(code);
  };

  return (
    <Alert
      color="success"
      style={{ height: '40px', marginTop: '10px' }}
      isOpen={visible}
      toggle={onDismiss}
    >
      {code} is Applied
    </Alert>
  );
};

export default AlertExample;
