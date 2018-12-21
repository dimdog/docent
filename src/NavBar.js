import React, { Component } from 'react';
import Met from './img/Icon_Met.png';
import Rijks from './img/Icon_Rijks.png';
import CalAcademy from './img/Icon_CalAcademy.png';
import RISD from './img/Icon_RISD.png';
import Glasshouse from './img/Icon_Glasshouse.png';
import {Link} from "react-router-dom";


var repository_map = {
    1: Met,
    2: Rijks,
    3: CalAcademy
};
var repository_color_map = {
    1: "#E4002B",
    2: "#FFFFFF",
    3: "#F27134"
}

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.setMuseum = this.setMuseum.bind(this)
        this.highlightsUrl = this.highlightsUrl.bind(this);
    }
    highlightsUrl(){
        if (this.props.parentState.repository){
            return "/highlights?repository="+this.props.parentState.repository.id;
        }
        return "/highlights";
    }
    setMuseum(){
        var repository_id = 2; // TODO 2 is the default
        if (this.props.parentState.repository){
            repository_id = this.props.parentState.repository.id;
        }
        // set color of navbar here too!
        return repository_map[repository_id];
    }
    render() {
      var profile_img = <div></div>;
      if (this.props.parentState && this.props.parentState.user != null){
         profile_img = <Link to="/mysaves" className="Signed-in"><img src={this.props.parentState.user.image_url} className="Profile-img" width="50px"></img></Link>;
      }
      if (this.props.parentState.repository){
          var styling = {backgroundColor: repository_color_map[this.props.parentState.repository.id]};
      } else {
          var styling = {};
      }
      return (

          <div className="NavBar" style={styling}>
              <Link to={this.highlightsUrl()} className="Highlights-button"><img src={this.setMuseum()} width="40px" alt="Met-logo"></img></Link>
              <div className="App-title">Virtual Docent</div>
              {profile_img}
          </div>
      );
    }
}

export default NavBar;
