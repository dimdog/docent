import React, { Component } from 'react';
import Scan from './img/scan.png';
import {Link} from "react-router-dom";



class Fab extends Component {
render() {
  return (
<div className="Fixed-area">
    <div className="Fab-instruction">
      <div className="Fab-text">You can scan more work right here 👉</div>
      <div className="Button-okay"><Link to ="#">Got it!</Link></div>
    </div>

      <div className="Fab">
      <Link to="/camera" className="Button-scan"><a href="#"><img src={Scan} width="80px"></img></a></Link>
      </div>

      </div>


  );
  }
}

export default Fab;
