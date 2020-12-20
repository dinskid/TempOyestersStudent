import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const Invoice = React.lazy(() =>
  import(/* webpackChunkName: "miscellaneous-invoice" */ './invoice')
);
const KnowledgeBase = React.lazy(() =>
  import(
    /* webpackChunkName: "miscellaneous-knowledge-base" */ './knowledge-base'
  )
);
const Mailing = React.lazy(() =>
  import(/* webpackChunkName: "miscellaneous-mailing" */ './mailing')
);
const Prices = React.lazy(() =>
  import(/* webpackChunkName: "miscellaneous-prices" */ './prices')
);
const Search = React.lazy(() =>
  import(/* webpackChunkName: "miscellaneous-search" */ './search')
);

const PagesMiscellaneous = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      
      <Route
        path={`${match.url}/invoice`}
        render={(props) => <Invoice {...props} />}
      />
      <Route
        path={`${match.url}/knowledge-base`}
        render={(props) => <KnowledgeBase {...props} />}
      />
      <Route
        path={`${match.url}/mailing`}
        render={(props) => <Mailing {...props} />}
      />
      <Route
        path={`${match.url}/prices`}
        render={(props) => <Prices {...props} />}
      />
      <Route
        path={`${match.url}/search`}
        render={(props) => <Search {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PagesMiscellaneous;
