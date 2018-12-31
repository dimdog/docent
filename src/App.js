import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Highlights from './Highlights.js';
import ObjectPage from './ObjectPage.js';
import {Welcome, CameraPage} from './Welcome.js';
import Homepage from './Homepage.js';
import MySaves from './MySaves.js';
import Random from './Random.js';
import HttpsRedirect from 'react-https-redirect';


const AppRouter = () => (
  <HttpsRedirect>
      <Router>
            <div>
          <Route path="/" exact component={Homepage} />
          <Route path="/captive" exact component={Welcome} />
          <Route path="/camera" exact component={CameraPage} />
          <Route path="/highlights/" component={Highlights} />
          <Route path="/object/:id" component={ObjectPage} />
          <Route path="/mysaves" component={MySaves} />
          <Route path="/random" component={Random} />
            </div>
      </Router>
  </HttpsRedirect>
);

export default AppRouter;
