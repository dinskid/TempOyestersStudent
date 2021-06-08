import React, { Suspense, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';
import retry from '../../retry';

const Login = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "user-login" */ './login'))
);
const Register = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "user-register" */ './register'))
);
const ForgotPassword = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "user-forgot-password" */ './forgot-password')
  )
);
const ResetPassword = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "user-reset-password" */ './reset-password')
  )
);

const User = ({ match, location }) => {
  // const params = window.location.search;

  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect
            exact
            from={`${match.url}/`}
            to={`${match.url}/login?tutor_id=1`}
            refresh="true"
          />
          <Route
            path={`${match.url}/login`}
            render={(props) => <Login {...props} />}
          />
          <Route
            path={`${match.url}/register`}
            render={(props) => <Register {...props} />}
          />
          <Route
            path={`${match.url}/forgot-password`}
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route
            path={`${match.url}/reset-password`}
            render={(props) => <ResetPassword {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </UserLayout>
  );
};

export default User;
