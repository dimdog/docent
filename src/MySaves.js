import React, { Component } from 'react';
import Met from './img/met-shadow.png';
import {Link} from "react-router-dom";
import MetBkg from './img/met-bkg.png';
import UserGallery from './UserGallery.js';


class MySaves extends Component {

  render() {
    return (
      <div className ="View-container">
      <div className="back">close</div>
        <div className="My-saves">

              <div className="My-saves-title-text">My Gallery</div>
              <div className="My-saves-text">Your saved works live here</div>
          <div className="Museum" id="met">
            <div className="Museum-header" height="250px">
                <div className="Met-bkg"><img src={MetBkg} width ="100%"></img></div>
                <div className="Details-overlay">
                  <div className="Museum-title"> <img src={Met} width="80px" alt="the Met Museum"></img></div>
                  <div className="Date-visited">Jan 2019</div>
                  <div className="Museum-city">New York, NY</div>
              </div>
            </div>
            <div className="Staggered-grid Saves">
                <UserGallery></UserGallery>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MySaves;
