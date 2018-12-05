import React, { Component } from 'react';
import Scan from './img/scan.png';
import {Link} from "react-router-dom";



class Fab extends Component {
    constructor(props) {
        super(props);
        this.state = {showInstruction:true};
        this.hideInstruction = this.hideInstruction.bind(this);
        this.fixedAreaClass = this.fixedAreaClass.bind(this);
    }
    hideInstruction(){
        this.setState({showInstruction: false});
    }
    fixedAreaClass(){
        console.log(this.state);
        if (this.state.showInstruction){
            return "Fixed-area";
        }
        return "";
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
          <div className="{this.fixedAreaClass}">
              <div className="Fab">
                  {instruction}
                  <Link to="/camera?activate" className="Button-scan"><img src={Scan} width="80px"></img></Link>
              </div>
          </div>


      );
      }
}

export default Fab;
