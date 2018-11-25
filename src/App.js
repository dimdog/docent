import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Highlights from './Highlights.js';
import ObjectPage from './ObjectPage.js';
import {Welcome, CameraPage} from './Welcome.js';

const AppRouter = () => (
  <Router>
	<div>
      <Route path="/" exact component={Welcome} />
      <Route path="/camera" exact component={CameraPage} />
      <Route path="/highlights/" component={Highlights} />
      <Route path="/object/:id" component={ObjectPage} />
	</div>
  </Router>
);

export default AppRouter;
