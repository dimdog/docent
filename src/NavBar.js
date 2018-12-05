import React, { Component } from 'react';
import Met from './img/Met-logo.png';
import {Link} from "react-router-dom";



class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      var profile_img = <div></div>;
      if (this.props.parentState.user != null){
         profile_img = <Link to="/mysaves" className="Signed-in"><img src={this.props.parentState.user.image_url} className="Profile-img" width="50px"></img></Link>;
      }
      return (

          <div className="NavBar">
              <Link to="/highlights" className="Highlights-button"><img src={Met} width="40px" alt="Met-logo"></img></Link>
              <div className="App-title">Virtual Docent</div>
              {profile_img}
          </div>
      );
    }
}

export default NavBar;
