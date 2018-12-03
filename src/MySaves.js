import React, { Component } from 'react';
import Met from './img/met-shadow.png';
import {Link} from "react-router-dom";
import MetBkg from './img/met-bkg.png';
import Rijks from './img/rijksmuseum-logo.png';
import RijksBkg from './img/rijks-bkg.png';
import UserGallery from './UserGallery.js';



class MySaves extends Component {

  render() {
    return (
      <div className ="View-container">
      <div className="StickyBar">
          <Link to="" className="back">close</Link>
          <Link to="" className="sign-out">Sign Out</Link>
      </div>
            <div className="My-saves">
                  <div className="My-saves-title-text">My Gallery</div>
                  <div className="My-saves-text">Your saved works live here</div>
            </div>
            <div className="Museum view" id="met">
                <div className="Museum-header" height="250px">
                    <div className="Met-bkg"><img src={MetBkg} width ="100%"></img></div>
                    <div className="Details-overlay">
                      <div className="Museum-title"> <img src={Met} width="150px" alt="the Met Museum"></img></div>
                      <div className="Date-visited">Jan 2019</div>
                      <div className="Museum-city">New York, NY</div>
                    </div>
                </div>
              </div>
            <div className="Museum view" id="rijks">
                  <div className="Museum-header">
                      <div className="Rijks-bkg"><img src={RijksBkg} width ="100%" height="250px"></img></div>
                        <div className="Details-overlay">
                          <div className="Museum-title"> <img src={Rijks} width="250px" alt="the Rijks Museum"></img></div>
                          <div className="Date-visited">March 2019</div>
                          <div className="Museum-city">Amsterdam, NL</div>
                        </div>
                      </div>

                  <UserGallery className="view" />
                  </div>
            </div>
    );
  }
}

export default MySaves;
