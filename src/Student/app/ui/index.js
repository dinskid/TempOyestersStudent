import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import retry from '../../../retry';

const Forms = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "ui-forms" */ './forms'))
);
const Components = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "ui-components" */ './components'))
);

const UI = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/forms`} />
      <Route
        path={`${match.url}/forms`}
        render={(props) => <Forms {...props} />}
      />
      <Route
        path={`${match.url}/components`}
        render={(props) => <Components {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default UI;
