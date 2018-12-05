import React, { Component } from 'react';
import Met from './img/met-shadow.png';
import {Link} from "react-router-dom";
import MetBkg from './img/met-bkg.png';
import Rijks from './img/rijksmuseum-logo.png';
import RijksBkg from './img/rijks-bkg.png';
import UserGallery from './UserGallery.js';
import Cookies from 'universal-cookie';



class MySaves extends Component {
  constructor(props) {
    const cookies = new Cookies();
    super(props);
    this.state = {
      cookies: cookies
    }
    this.clearCookies = this.clearCookies.bind(this);
  }
  clearCookies(){
      this.state.cookies.remove("tokenId", {secure:true, path:"/"});
      this.props.history.push("/");
  }

  render() {
    return (
      <div className ="View-container">
      <div className="StickyBar">
          <a herf="#" onClick={this.props.history.goBack} className="back">close</a>
          <a herf="#" onClick={this.clearCookies} className="sign-out">Sign Out</a>
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
