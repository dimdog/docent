import React, { Component } from 'react';
import Met from './img/Met-logo.png';
import {Link} from "react-router-dom";



class NavBar extends Component {
render() {
  var profile_img = <a className="Profile-img" width="50px"></a>;
  /*if (this.state.user != null){
     save_button = this.toggleLike;
     profile_img = <Link to="/mysaves"><img src={this.state.user.image_url} className="Profile-img" width="50px"></img></Link>;
  }*/
  return (


      <div className="NavBar">
          <Link to="/highlights" className="Highlights-button"><a href="#"><img src={Met} width="40px" alt="Met-logo"></img></a><a className="Profile-img" width="50px"></a>
          </Link>
          <div className="App-title">Virtual Docent</div>
          <Link to="/mysaves" className="Signed-in" onClick="">{profile_img}</Link>
      </div>
  );
  }
}

export default NavBar;
