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
  Navbar, Nav, NavItem
} from 'react-bootstrap';

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
    <div className="container">
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Admin Panel
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Link to="/" style={{margin: "15px", display: "inline-block"}}>Settings</Link>
          <Link to="/jobs" style={{margin: "15px", display: "inline-block"}}>Jobs</Link>
          <Link to="/scripts" style={{margin: "15px", display: "inline-block"}}>Scripts</Link>
        </Navbar.Collapse>
      </Navbar>

      <Route exact path="/" component={Settings}/>
      <Route path="/jobs" component={Jobs}/>
      <Route path="/scripts" component={Scripts}/>
    </div>
  </Router>
  </Provider>
  , document.querySelector('#container'));
