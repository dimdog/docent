import React, { Component } from 'react';
import Menu from 'react-burger-menu/lib/menus/slide';
import Logo from './img/logo_Wide_1Color.png';
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
        this.state = {menu_open: false};
        this.setMuseum = this.setMuseum.bind(this)
        this.highlightsUrl = this.highlightsUrl.bind(this);
        this.setMenuOpen = this.setMenuOpen.bind(this);
        this.setMenuClosed = this.setMenuClosed.bind(this);
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
    setMenuOpen(){
        this.setState({menu_open: true});
    }
    setMenuClosed(){
        this.setState({menu_open: false});
    }
    render() {
      var profile_img = <div></div>;
      if (this.props.parentState && this.props.parentState.user != null){
         profile_img = <a href="#" onClick={this.setMenuOpen} className="Signed-in"><img src={this.props.parentState.user.image_url} className="Profile-img" width="50px"></img></a>;
      }
      if (this.props.parentState.repository){
          var styling = {backgroundColor: repository_color_map[this.props.parentState.repository.id]};
      } else {
          var styling = {};
      }
      return (

          <div>
              <Menu right isOpen={this.state.menu_open}>
              <div className="menu-top-section">
                  {profile_img}
                  <div className="menu-hello-user"> Hello Alicia! </div>
                  <div className="menu-hello-prompt"> What would you like to see today? </div>
                  <Link to="/mysaves" className="menu-item">Saved Artwork</Link>
                  <Link to="/" className="menu-item">All Museums</Link>
                  <Link to="/random" className="menu-item">Surprise Me!</Link>
                  <a href="#" className="menu-item menu-signout">Sign out</a>
              </div>
              <div className="menu-footer">
                  <div className="menu-madeby-text">Made by Docent</div>
                  <img src={Logo} className="menu-madeby-logo"></img>
              </div>
              </Menu>
              <div className="NavBar" style={styling}>
                  <Link to={this.highlightsUrl()} className="Highlights-button"><img src={this.setMuseum()} width="40px" alt="Met-logo"></img></Link>
                  <div className="App-title">Virtual Docent</div>
                  {profile_img}
              </div>
          </div>
      );
    }
}

export default NavBar;
