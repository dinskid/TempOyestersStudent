import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import retry from '../../../../retry';

const Portfolio = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "profile-portfolio" */ './portfolio'))
);
const Social = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "profile-social" */ './social'))
);
const Setting = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "profile-social" */ './setting'))
);
const Affiliate = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "profile-social" */ './affiliate'))
);
const Blog = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "profile-social" */ './blog'))
);

const PagesProfile = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/portfolio`} />
      <Route
        path={`${match.url}/portfolio`}
        render={(props) => <Portfolio {...props} />}
      />
      <Route
        path={`${match.url}/social`}
        render={(props) => <Social {...props} />}
      />
      <Route
        path={`${match.url}/setting`}
        render={(props) => <Setting {...props} />}
      />
      <Route
        path={`${match.url}/affiliate`}
        render={(props) => <Affiliate {...props} />}
      />
      <Route
        path={`${match.url}/blog`}
        render={(props) => <Blog {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PagesProfile;
