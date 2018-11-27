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
              <div className="Museum">
                <div className="Saved-work"><a href="#"><image src="" alt="work-you-saved"></image></a></div>
              </div>
        </div>
      </div>
    );
  }
}

export default MySaves;
