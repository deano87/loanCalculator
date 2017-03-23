import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import Settings from './components/settings/settings';
import Jobs from './components/jobs/jobs';
import Scripts from './components/scripts/scripts';
import reducers from './reducers';

import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// The middleware handles the promise stage
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
    <div>
      <ul>
        <li><Link to="/">Settings</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/scripts">Scripts</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Settings}/>
      <Route path="/jobs" component={Jobs}/>
      <Route path="/scripts" component={Scripts}/>
    </div>
  </Router>
  </Provider>
  , document.querySelector('#container'));
