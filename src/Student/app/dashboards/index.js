import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import retry from '../../../retry';

const DashboardDefault = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "dashboard-default" */ './default'))
);
const ContentDefault = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "dashboard-content" */ './content'))
);
const AnalyticsDefault = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "dashboard-analytics" */ './analytics')
  )
);
const EcommerceDefault = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "dashboard-ecommerce" */ './ecommerce')
  )
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        render={(props) => <DashboardDefault {...props} />}
      />
      <Route
        path={`${match.url}/content`}
        render={(props) => <ContentDefault {...props} />}
      />
      <Route
        path={`${match.url}/ecommerce`}
        render={(props) => <EcommerceDefault {...props} />}
      />
      <Route
        path={`${match.url}/analytics`}
        render={(props) => <AnalyticsDefault {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
