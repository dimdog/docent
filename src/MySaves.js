import React, { Component } from 'react';
import {Link} from "react-router-dom";
import UserGallery from './UserGallery.js';



class MySaves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    }
    this.logout = this.logout.bind(this);
  }
  logout(){
      fetch("https://docentapp.com/api/logout").then(
                (result) => {
                  this.props.history.push("/");
                });
  }

  render() {
    return (
      <div className ="View-container">
      <div className="StickyBar">
          <a herf="#" onClick={this.props.history.goBack} className="back">close</a>
          <a herf="#" onClick={this.logout} className="sign-out">Sign Out</a>
      </div>
            <div className="My-saves">
                  <div className="My-saves-title-text">My Gallery</div>
                  <div className="My-saves-text">Your saved works live here</div>
            </div>
            <UserGallery history={this.props.history} className="view" />
            </div>
    );
  }
}

export default MySaves;
