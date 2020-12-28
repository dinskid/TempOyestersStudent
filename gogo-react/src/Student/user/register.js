import React, { useEffect } from 'react';
import { iconsmind, simplelineicons } from '../../data/icons';
//import './auth.css'
import { Row, Card, CardTitle, FormGroup, Label, Button } from 'reactstrap';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import IntlMessages from '../../helpers/IntlMessages';
//import Google from './google.png'
import { Colxx } from '../../components/common/CustomBootstrap';
import Logo from './logo.png';
import './auth.css';
import Google from './google.png';
import { useGoogleLogin } from 'react-google-login';
import Apple from './apple.png';
import { NotificationManager } from '../../components/common/react-notifications';
import { registerUser } from '../../redux/actions';
import { registerUserError } from '../../redux/auth/actions';
import { refreshTokenSetup } from './utils/refreshTokenSetup';

const initialValues = {
  customer_first_name: '',
  customer_email: '',
  customer_phone_number: '',
  customer_last_name: '',
  customer_password: '',
  customer_password_confirm: '',
  acceptTerms: false,
};

const validation = Yup.object().shape({
  customer_first_name: Yup.string()
    .min(2, 'please enter correct name')
    .max(20, 'please enter correct name')
    .required('Name is required'),

  customer_email: Yup.string()
    .min(7, 'Email should be min 7 characters')
    .required('Email is required'),
  acceptTerms: Yup.bool().oneOf(
    [true],
    'Accept Terms & Conditions is required'
  ),
  customer_phone_number: Yup.number()
    .typeError('Must specify a number')
    .positive('Please enter correct mobile')
    .required('Required')
    .nullable(),
  customer_last_name: Yup.string()
    .min(2, 'please enter correct name')
    .max(20, 'please enter correct name')
    .required('Name is required'),
  customer_password: Yup.string()
    .min(8, 'min 8 characters')
    .max(100, 'please enter correct password')
    .required('Name is required'),
  customer_password_confirm: Yup.string().oneOf(
    [Yup.ref('customer_password'), null],
    'Passwords must match'
  ),
  // institutename: Yup.string()
  //  .min(2, "please enter correct insitute")
  //  .max(50, "please enter correct institute")
  //   .required("insitute name is required")
});

const Register = ({
  loading,
  error,
  registerUserAction,
  history,
  ...props
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        'Registeration Error',
        3000,
        null,
        null,
        ''
      );
    }
  }, [error]);

  const onSuccess = (res) => {
    // console.log('login success', res.profileObj);
    refreshTokenSetup(res);
    console.log(
      res.profileObj.name,
      res.profileObj.email,
      res.profileObj.imageUrl
    );
    const values = {
      customer_first_name: res.profileObj.name[0],
      customer_last_name: res.profileObj.name.substr(
        res.profileObj.name.indexOf(' ') + 1
      ),
      customer_email: res.profileObj.email,
      customer_imageUrl: res.profileObj.imageUrl,
      using_google: true,
    };
    registerUserAction({ history, values });
  };
  const onFailure = (err) => {
    dispatch(registerUserError(err.error || 'unable to register'));
    console.log(err);
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
    isSignedIn: false,
    accessType: 'offline',
  });

  const onSubmit = (values) => {
    console.log(values);
    registerUserAction({ history, values });
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2"> Ed - tech startup </p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please
              <NavLink to="/Student/user/login" className="black">
                <b> login </b>
              </NavLink>
            </p>
          </div>
          <div className="form-side">
            <NavLink to="" className="white">
              <img src={Logo} className="image" alt="1111" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validation}
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Form
                  className="av-tooltip tooltip-label-bottom"
                  autoComplete="true"
                >
                  <FormGroup className="form-group has-float-label">
                    <Label>Firstname</Label>
                    <Field
                      className="form-control"
                      name="customer_first_name" /*  value="firstname" onChange={(e) => setFirstname(e.target.value)} */
                    />
                    {errors.customer_first_name &&
                    touched.customer_first_name ? (
                      <div className="invalid-feedback d-block">
                        {errors.customer_first_name}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>Lastname</Label>
                    <Field
                      className="form-control"
                      name="customer_last_name" /* value="lastname" onChange={(e) => setLastname(e.target.value)} */
                    />
                    {errors.customer_last_name && touched.customer_last_name ? (
                      <div className="invalid-feedback d-block">
                        {errors.customer_last_name}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>Email</Label>
                    <Field
                      className="form-control"
                      name="customer_email" /* value="email" onChange={(e) => setEmail(e.target.value)} */
                    />
                    {errors.customer_email && touched.customer_email ? (
                      <div className="invalid-feedback d-block">
                        {errors.customer_email}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>Mobile</Label>
                    <Field
                      className="form-control"
                      name="customer_phone_number" /* value="mobile" onChange={(e) => setMobile(e.target.value)} */
                    />
                    {errors.customer_phone_number &&
                    touched.customer_phone_number ? (
                      <div className="invalid-feedback d-block">
                        {errors.customer_phone_number}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label">
                    <Label>Password</Label>
                    <Field
                      className="form-control"
                      name="customer_password"
                      type="password" /*  value="password" onChange={(e) => setPassword(e.target.value)} */
                    />
                    {errors.customer_password && touched.customer_password ? (
                      <div className="invalid-feedback d-block">
                        {errors.customer_password}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>Confirm Password</Label>
                    <Field
                      className="form-control"
                      name="customer_password_confirm"
                      type="password"
                    />
                    {errors.customer_password_confirm &&
                    touched.customer_password_confirm ? (
                      <div className="invalid-feedback d-block">
                        {errors.customer_password_confirm}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Field
                        type="checkbox"
                        name="acceptTerms"
                        className={
                          'form-check-input ' +
                          (errors.acceptTerms && touched.acceptTerms
                            ? ' is-invalid'
                            : '')
                        }
                      />{' '}
                      I accept the terms & conditions
                    </Label>
                    {errors.acceptTerms && touched.acceptTerms ? (
                      <div className="invalid-feedback d-block">
                        {errors.acceptTerms}
                      </div>
                    ) : null}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/Student/user/login">
                      Already Registered?
                    </NavLink>
                    <Button color="primary" type="submit" className="register">
                      Register
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
                  <span>Continue with Google</span>
                </Button>
                <Button
                  outline
                  color="secondary"
                  className="mb-2 d-flex align-items-center p-3 registerug"
                >
                  <img src={Apple} className="logo2" />
                  <span>Continue with Apple</span>
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
  registerUserAction: registerUser,
})(Register);
