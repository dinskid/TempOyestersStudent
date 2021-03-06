import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import retry from '../../../retry';

const Product = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "pages-product" */ './product'))
);
/* const Faq = React.lazy(() =>
  import(/* webpackChunkName: "miscellaneous-faq"  './faq')
); */
const Profile = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "pages-profile" */ './profile'))
);
const Miscellaneous = React.lazy(() =>
  retry(() =>
    import(/* webpackChunkName: "pages-miscellaneous" */ './miscellaneous')
  )
);
const Message = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "pages-miscellaneous" */ './Message'))
);
const Blog = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "pages-blog" */ './blog'))
);
const Faq = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "miscellaneous-faq" */ './faq'))
);
const Course = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "miscellaneous-faq" */ './course'))
);
const QuizResults = React.lazy(() =>
  retry(() => import(/* webpackChunkName: "quiz-results" */ './quiz-results'))
);

const Pages = ({ match }) => (
  < Suspense fallback={< div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/product`} />
      <Route
        path={`${match.url}/product`}
        render={(props) => <Product {...props} />}
      />
      {/*     <Route path={`${match.url}/faq`} render={(props) => <Faq {...props} />} /> */}
      <Route
        path={`${match.url}/profile`}
        render={(props) => <Profile {...props} />}
      />
      <Route
        path={`${match.url}/blog`}
        render={(props) => <Blog {...props} />}
      />
      <Route
        path={`${match.url}/miscellaneous`}
        render={(props) => <Miscellaneous {...props} />}
      />
      <Route
        path={`${match.url}/message`}
        render={(props) => <Message {...props} />}
      />
      <Route
        path={`${match.url}/course`}
        render={(props) => <Course {...props} />}
      />

      <Route
        path={`${match.url}/mycourses`}
        render={(props) => <Faq {...props} />}
      />

      <Route
        path={`${match.url}/quiz-results`}
        render={props => <QuizResults {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense >
);
export default Pages;
