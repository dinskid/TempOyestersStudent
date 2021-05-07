import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import { NotificationContainer } from './components/common/react-notifications';
import { isMultiColorActive, adminRoot } from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import retry from './retry';
import Favicon from 'react-favicon';
import Logo from './data/Logo';
import { useGlobalContext } from './context';

const ViewHome = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "views" */ './Student/home'))
);
/* const ViewInst = React.lazy(() =>
  import(/* webpackChunkName: "views"  './views/app/pages/product/Instructor')
); */
const ViewApp = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "views-app" */ './Student/app'))
);
const ViewUser = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "views-user" */ './Student/user'))
);
const ViewError = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "views-error" */ './Student/error'))
);
const ViewUnauthorized = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "views-error" */ './Student/unauthorized')
  )
);
const Cart = React.lazy(() =>
  retry(() => import('./Student/app/pages/cart/index'))
);

const Quiz = React.lazy(() => retry(() => import('./Student/Quiz')));
class App extends React.Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <Route
                    path="/Student/user"
                    render={(props) => <ViewUser {...props} />}
                  />
                  <Route
                    path="/error"
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                  <Route
                    path="/unauthorized"
                    exact
                    render={(props) => <ViewUnauthorized {...props} />}
                  />
                  <Route
                    path="/home"
                    exact
                    render={(props) => <ViewHome {...props} />}
                  />
                  <Route
                    path="/app"
                    // exact
                    render={(props) => <ViewApp {...props} />}
                  />
                  <Route
                    path="/student/cart"
                    exact
                    render={(props) => <Cart {...props} />}
                  />
                  <Route
                    path="/student/wish"
                    exact
                    render={(props) => <Cart {...props} />}
                  />
                  <Route
                    path="/student/save"
                    exact
                    render={(props) => <Cart {...props} />}
                  />
                  <Route
                    path="/student/next"
                    exact
                    render={(props) => <Cart {...props} />}
                  />

                  <Route
                    path="/student/next"
                    exact
                    render={(props) => <Cart {...props} />}
                  />

                  <Route
                    path="/quiz"
                    exact
                    render={(props) => <Quiz {...props} />}
                  />

                  <Redirect exact from="/" to={'/Student/user'} />

                  {/* <Redirect to="/error" /> */}
                </Switch>
              </Router>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { currentUser } = authUser;
  const { locale } = settings;
  return { currentUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
