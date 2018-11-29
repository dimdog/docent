import React, { Component } from 'react';
import Scan from './img/scan.png';
import {Link} from "react-router-dom";



class Fab extends Component {
render() {
  return (


      <div className="Fab">
      <Link to="/camera" className="Button-scan"><a href="#"><img src={Scan} width="80px"></img></a></Link>
      </div>
  );
  }
}

export default Fab;
