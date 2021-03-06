import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import retry from '../../retry';

const Dashboards = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "dashboards" */ './dashboards'))
);
const Pages = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "pages" */ './pages'))
);
const Applications = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "applications" */ './applications'))
);
const Privacy = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "blank-page" */ './privacy'))
);
const Cookie = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "blank-page" */ './cookie'))
);
const Terms = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "blank-page" */ './terms'))
);
const IRP = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "blank-page" */ './irp'))
);
const Anti = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "blank-page" */ './antispam'))
);
const Abuse = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "blank-page" */ './abuse'))
);
const Ui = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "ui" */ './ui'))
);
const Menu = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "menu" */ './menu'))
);
const BlankPage = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "blank-page" */ './blank-page'))
);

const Validate = React.lazy(() => retry(() => import('./Validate')));

const App = ({ match }) => {
  return (
    <AppLayout>
      <Validate />
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            />
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Route
              path={`${match.url}/privacy`}
              render={(props) => <Privacy {...props} />}
            />
            <Route
              path={`${match.url}/cookie`}
              render={(props) => <Cookie {...props} />}
            />
            <Route
              path={`${match.url}/terms`}
              render={(props) => <Terms {...props} />}
            />
            <Route
              path={`${match.url}/irp`}
              render={(props) => <IRP {...props} />}
            />
            <Route
              path={`${match.url}/antispam`}
              render={(props) => <Anti {...props} />}
            />
            <Route
              path={`${match.url}/abuse`}
              render={(props) => <Abuse {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
