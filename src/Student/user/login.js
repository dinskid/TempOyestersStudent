import './auth.css';
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
import Logo from '../../data/Logo';
import Google from './google.png';
import Url from '../../data/urlparams';
import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './utils/refreshTokenSetup';
import { loginUserError, loginUserSuccess } from '../../redux/auth/actions';
import { useGlobalContext } from '../../context';
import Cookies from 'universal-cookie';

const initialvalue = {
  email: ''.toLowerCase(),
  password: '',
};

const validation = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password should have min 8 characters')
    .required('Password is required'),
  email: Yup.string()
    .min(6, 'Email should have min 7 characters')
    .required('Email is required'),
});

function validateEmail(value) {
  let error;

  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }

  return error;
}

const Login = ({ history, loading, error, loginUserAction, currentUser }) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const [URLParams, setURLParams] = useState('');
  const { query, name, params, logo } = useGlobalContext();

  console.log(error);

  useEffect(() => {
    if (error === undefined) {
      NotificationManager.error(
        error,
        'Email or Password is incorrect',
        3000,
        null,
        null,
        ''
      );
    }
  }, [error]);
  const onUserLogin = (values) => {
    if (!loading) {
      loginUserAction({ history, values });
    }
  };

  const onSuccess = (res) => {
    refreshTokenSetup(res);

    const values = {
      customer_name: res.profileObj.name,
      email: res.profileObj.email,
      using_google: true,
    };
    loginUserAction({ history, values });
  };
  const onFailure = (err) => {
    if (err) {
      dispatch(loginUserError(err.error || 'unable to register'));
      console.log(err);
    }
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
    isSignedIn: false,
    accessType: 'offline',
  });

  const cookies = new Cookies();
  const optionalParams = window.location.search;
  const search = window.location.href;
  const url = new URL(search);
  const id = url.searchParams.get('tutor_id');

  console.log(query);
  useEffect(() => {
    cookies.set('Params', optionalParams);
    cookies.set('Value', id);
  }, []);

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">{name}</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{' '}
              <NavLink to={`/student/user/register/${query}`}>register</NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              {/* <span className="logo-single" /> */}
              <img src={logo} className="image" alt="1111" />
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
                      className="form-control "
                      name="email"
                      style={{ textTransform: 'lowercase' }}
                      validate={validateEmail}
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
                    <NavLink to={`/Student/user/forgot-password${query}`}>
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        clicked ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">Login</span>
                      {/* <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span> */}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            <Row className="mt-4 d-flex justify-content-center">
              <div style={{ width: '100%' }}>
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
                {/* <Button
                  outline
                  color="secondary"
                  className="mb-2 d-flex align-items-center p-3 registerug"
                >
                  <img src={Apple} className="logo2" />
                  <span id="text">Continue with Apple</span>
                </Button> */}
              </div>{' '}
            </Row>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error, currentUser } = authUser;
  console.log(authUser);
  return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
