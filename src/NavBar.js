import React, { Component } from 'react';
import Met from './img/Met-logo.png';
import {Link} from "react-router-dom";



class NavBar extends Component {
render() {
  var profile_img = <div className="Profile-img" width="50px"></div>;
  /*if (this.state.user != null){ // TODO need to remove the link around {profile_img} when we re-enable this
     save_button = this.toggleLike;
     profile_img = <Link to="/mysaves"><img src={this.state.user.image_url} className="Profile-img" width="50px"></img></Link>;
  }*/
  return (


      <div className="NavBar">
          <Link to="/highlights" className="Highlights-button"><img src={Met} width="40px" alt="Met-logo"></img></Link>
          <a className="Profile-img" width="50px"></a>
          <div className="App-title">Virtual Docent</div>
          <Link to="/mysaves" className="Signed-in">{profile_img}</Link>
      </div>
  );
  }
}

export default NavBar;
