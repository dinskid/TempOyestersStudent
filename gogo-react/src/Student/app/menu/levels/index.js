import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import retry from '../../../../retry';

const ThirdLevel1 = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "menu-level-1" */ './third-level-1'))
);
const ThirdLevel2 = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "menu-level-2" */ './third-level-2'))
);
const ThirdLevel3 = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "menu-level-3" */ './third-level-3'))
);

const MenuLevels = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/third-level-1`}
      />
      <Route
        path={`${match.url}/third-level-1`}
        render={(props) => <ThirdLevel1 {...props} />}
      />
      <Route
        path={`${match.url}/third-level-2`}
        render={(props) => <ThirdLevel2 {...props} />}
      />
      <Route
        path={`${match.url}/third-level-3`}
        render={(props) => <ThirdLevel3 {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuLevels;
