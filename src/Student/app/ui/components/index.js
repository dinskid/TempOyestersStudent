import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import retry from '../../../../retry';

const Alerts = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "components-alerts" */ './alerts'))
);
const Badges = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "components-badges" */ './badges'))
);
const Buttons = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "components-buttons" */ './buttons'))
);
const Cards = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "components-cards" */ './cards'))
);
const Carousel = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "components-carousel" */ './carousel')
  )
);
const Charts = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "components-charts" */ './charts'))
);
const Collapse = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "components-collapse" */ './collapse')
  )
);
const Dropdowns = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "components-dropdowns" */ './dropdowns')
  )
);
const Editors = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "components-editors" */ './editors'))
);
const Icons = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "components-icons" */ './icons'))
);
const InputGroups = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "components-input-groups" */ './input-groups')
  )
);
const Jumbotron = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "components-jumbotron" */ './jumbotron')
  )
);
const Maps = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "components-maps" */ './maps'))
);
const Modal = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "components-modal" */ './modal'))
);
const Navigation = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "components-navigation" */ './navigation')
  )
);
const PopoverTooltip = React.lazy(() =>
  retry(() =>
    import(
      /* webpackChunkName: "components-popover-tool)ip" */ './popover-tooltip'
    )
  )
);
const Sortable = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "components-sortable" */ './sortable')
  )
);
const Tables = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "components-tables" */ './tables'))
);

const Components = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/alerts`} />
      <Route
        path={`${match.url}/alerts`}
        render={(props) => <Alerts {...props} />}
      />
      <Route
        path={`${match.url}/badges`}
        render={(props) => <Badges {...props} />}
      />
      <Route
        path={`${match.url}/buttons`}
        render={(props) => <Buttons {...props} />}
      />
      <Route
        path={`${match.url}/cards`}
        render={(props) => <Cards {...props} />}
      />
      <Route
        path={`${match.url}/carousel`}
        render={(props) => <Carousel {...props} />}
      />
      <Route
        path={`${match.url}/charts`}
        render={(props) => <Charts {...props} />}
      />
      <Route
        path={`${match.url}/collapse`}
        render={(props) => <Collapse {...props} />}
      />
      <Route
        path={`${match.url}/dropdowns`}
        render={(props) => <Dropdowns {...props} />}
      />
      <Route
        path={`${match.url}/editors`}
        render={(props) => <Editors {...props} />}
      />
      <Route
        path={`${match.url}/icons`}
        render={(props) => <Icons {...props} />}
      />
      <Route
        path={`${match.url}/input-groups`}
        render={(props) => <InputGroups {...props} />}
      />
      <Route
        path={`${match.url}/jumbotron`}
        render={(props) => <Jumbotron {...props} />}
      />
      <Route
        path={`${match.url}/maps`}
        render={(props) => <Maps {...props} />}
      />
      <Route
        path={`${match.url}/modal`}
        render={(props) => <Modal {...props} />}
      />
      <Route
        path={`${match.url}/navigation`}
        render={(props) => <Navigation {...props} />}
      />
      <Route
        path={`${match.url}/popover-tooltip`}
        render={(props) => <PopoverTooltip {...props} />}
      />
      <Route
        path={`${match.url}/sortable`}
        render={(props) => <Sortable {...props} />}
      />
      <Route
        path={`${match.url}/tables`}
        render={(props) => <Tables {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Components;
