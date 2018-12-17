import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Highlights from './Highlights.js';
import ObjectPage from './ObjectPage.js';
import {Welcome, CameraPage} from './Welcome.js';
import MySaves from './MySaves.js';
import HttpsRedirect from 'react-https-redirect';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-131092657-1');

class AppRouter extends Component {
    render() {
      ReactGA.pageview(window.location.pathname + window.location.search);
      return (
          <HttpsRedirect>
              <Router>
                    <div>
                  <Route path="/" exact component={Welcome} />
                  <Route path="/camera" exact component={CameraPage} />
                  <Route path="/highlights/" component={Highlights} />
                  <Route path="/object/:id" component={ObjectPage} />
                  <Route path="/mysaves" component={MySaves} />
                    </div>
              </Router>
          </HttpsRedirect>

      );
    }
}

export default AppRouter;
