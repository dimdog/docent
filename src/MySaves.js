import React, { Component } from 'react';
import Met from './img/Met-logo.png';
import {Link} from "react-router-dom";

class MySaves extends Component {

  render() {
    return (
      <div className ="View-container">
        <div className="My-saves">
              <div className="back">close</div>
              <div className="My-saves-title-text">My Gallery</div>
              <div className="My-saves-text">Your saved works live here</div>
          <div className="Museum" id="met">
            <div className="Museum-header">
                <div className="Museum-title">the Met Museum</div>
                <div className="Date-visited">Jan 2019</div>
                <div className="Museum-city">New York, NY</div>
            </div>
            <div className="Staggered-grid">
                <div className="Item-a"></div>
                <div className="Item-b"></div>
                <div className="Item-b"></div>
                <div className="Item-a"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MySaves;
