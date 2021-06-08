import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCurrentUser } from '../../helpers/Utils';

const Validate = () => {
  const history = useHistory();
  useEffect(() => {
    try {
      if (!getCurrentUser().uid) history.push('/Student/user/login');
    } catch (e) {
      history.push('/Student/user/login');
    }
  });
  return null;
};

export default Validate;
