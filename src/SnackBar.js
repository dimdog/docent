import React, { Component } from 'react';
import Met from './img/Met-logo.png';
import {Link} from "react-router-dom";
import{save_button} from "./ObjectPage.js"



class SnackBar extends Component {


  function({save_button}) {
      // Get the snackbar DIV
      var x = document.getElementById("snackbar");

      // Add the "show" class to DIV
      x.className = "show";

      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

render() {
  return (


      <div className="SnackBar" id="snackbar">

          <button onClick="{.save_button}">Show Snackbar</button>


          <div id="snackbar">Saved to your gallery </div>
      </div>
  );
  }
}

export default SnackBar;
