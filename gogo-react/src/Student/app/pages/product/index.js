import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import retry from '../../../../retry';
import UrlParams from '../../../../data/urlparams';

const DataList = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "product-data-list" */ './data-list'))
);
const ImageList = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "product-image-list" */ './image-list')
  )
);
const ThumbList = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "product-thumb-list" */ './thumb-list')
  )
);
const LiveSession = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "product-thumb-list" */ './Live_Session')
  )
);
const Details = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "product-details" */ './details'))
);
const DetailsAlt = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "product-details-alt" */ './details-alt')
  )
);

const PagesProduct = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/data-list`} />
      <Route
        path={`${match.url}/data-list`}
        render={(props) => <DataList {...props} />}
      />
      <Route
        path={`${match.url}/image-list`}
        render={(props) => <ImageList {...props} />}
      />
      <Route
        path={`${match.url}/thumb-list`}
        render={(props) => <ThumbList {...props} />}
      />
      <Route
        path={`${match.url}/Live_Session`}
        render={(props) => <LiveSession {...props} />}
      />
      <Route
        path={`${match.url}/details`}
        render={(props) => <Details {...props} />}
      />
      <Route
        path={`${match.url}/details-alt`}
        render={(props) => <DetailsAlt {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PagesProduct;
