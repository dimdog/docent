import React, { Component } from 'react';
import Met from './img/Met-logo.png';
import Rijks from './img/rijksmuseum-logo.png';
import {Link} from "react-router-dom";


var repository_map = {
    1: Met,
    2: Rijks
};

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {repository: this.props.repository || {}};
        this.setMuseum = this.setMuseum.bind(this)
    }
    setMuseum(){
        var repository_id = 2;
        if (this.state.repository){
            repository_id = this.state.repository.id;
        }
        // set color of navbar here too!
        return repository_map[repository_id];
    }
    render() {
      var profile_img = <div></div>;
      if (this.props.parentState && this.props.parentState.user != null){
         profile_img = <Link to="/mysaves" className="Signed-in"><img src={this.props.parentState.user.image_url} className="Profile-img" width="50px"></img></Link>;
      }
      return (

          <div className="NavBar">
              <Link to="/highlights" className="Highlights-button"><img src={this.setMuseum()} width="40px" alt="Met-logo"></img></Link>
              <div className="App-title">Virtual Docent</div>
              {profile_img}
          </div>
      );
    }
}

export default NavBar;
