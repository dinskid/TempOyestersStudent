import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../components/common/react-notifications';
import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import Logo from './logo.png';
import './auth.css';
import Google from './google.png';
import Apple from './apple.png';

import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './utils/refreshTokenSetup';
import { loginUserError } from '../../redux/auth/actions';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};
const initialvalue = {
  email: '',
  password: '',
};
const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};
const validation = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password should have min 8 characters')
    .required('Password is required'),
  email: Yup.string()
    .min(6, 'Email should have min 7 characters')
    .required('Email is required'),
});

const Login = ({ history, loading, error, loginUserAction }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);
  const onUserLogin = (values) => {
    if (!loading) {
      console.log(values);
      loginUserAction({ history, values });
    }
  };

  const onSuccess = (res) => {
    console.log('login success', res.profileObj);
    refreshTokenSetup(res);
    console.log(
      res.profileObj.name,
      res.profileObj.email,
      res.profileObj.imageUrl
    );
    const values = {
      customer_name: res.profileObj.name,
      email: res.profileObj.email,
      using_google: true,
    };
    loginUserAction({ history, values });
  };
  const onFailure = (err) => {
    dispatch(loginUserError(err.error || 'unable to register'));
    console.log(err);
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
    isSignedIn: false,
    accessType: 'offline',
  });

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{' '}
              <NavLink to="/Student/user/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              {/* <span className="logo-single" /> */}
              <img src={Logo} className="image" alt="1111" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik
              initialValues={initialvalue}
              onSubmit={onUserLogin}
              validationSchema={validation}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      //validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      //validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/Student/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        isSubmitting ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            <Row className="mt-4 d-flex justify-content-center">
              <div style={{ width: '90%' }}>
                <Button
                  outline
                  color="secondary"
                  onClick={signIn}
                  className="mb-2 d-flex align-items-center p-3 registerug"
                >
                  {/*<div className={`glyph-icon ${simplelineicons[176]} mr-2 `} />*/}
                  <img src={Google} className="logo" />
                  <span id="text">Continue with Google</span>
                </Button>
                <Button
                  outline
                  color="secondary"
                  className="mb-2 d-flex align-items-center p-3 registerug"
                >
                  <img src={Apple} className="logo2" />
                  <span id="text">Continue with Apple</span>
                </Button>
              </div>{' '}
            </Row>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
