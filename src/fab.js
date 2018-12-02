import React, { Component } from 'react';
import Scan from './img/scan.png';
import {Link} from "react-router-dom";



class Fab extends Component {
    constructor(props) {
        super(props);
        this.state = {showInstruction:true};
        this.hideInstruction = this.hideInstruction.bind(this);
    }
    hideInstruction(){
        this.setState({showInstruction: false});
    }
    render() {
        var instruction = null;
        if (this.state.showInstruction){
            instruction = <div className="Fab-instruction">
                          <div className="Fab-text">You can scan more work right here 👉</div>
                          <div className="Button-okay"><a onClick={this.hideInstruction}>Got it!</a></div>
                               </div>;
        }

      return (
          <div className="Fixed-area">
              <div className="Fab">
                  {instruction}
                  <Link to="/camera" className="Button-scan"><a href="#"><img src={Scan} width="80px"></img></a></Link>
              </div>
          </div>


      );
      }
}

export default Fab;
