import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Met from './img/met.png';
import Angle_BR from './img/Angle_BR.png';
import Angle_TL from './img/Angle_TL.png';
import next from './img/next.png';
import QrReader from "react-qr-reader";
import Highlights from "./Highlights.js"

class Welcome extends Component {

  render() {
    return (
      <div className="welcome-bk">
            <div className="Museum-launch">
                  <img src={Met} className="Met-logo" width="311px" alt="Met-logo"/>
            </div>
            <div className="cta">
                <div className="Title-text">Virtual Docent</div>
                <div className="Subtitle-text">Scan and <br/> Save Art.</div>
            </div>
              <Link to="/camera" className="Button-next" ><img src={next} width="80" alt="Next-button"/></Link>
      </div>

    );
  }
}

class Camera extends Component {
    activateCamera (){
      this.setState({camera: true, result: null});
    }
    constructor(props) {
        super(props);
        var camera = false;
        console.log(props.history);
        console.log(props.history.location.search === "?activate");
        if (props.history.location.search === "?activate"){
            camera = true;
        }
        this.state = {
            error: null,
            camera: camera,
            result: null
        }
        this.activateCamera = this.activateCamera.bind(this);
        this.handleScan = this.handleScan.bind(this);
    }
    handleScan(data) {
        if (data && data.split("/").length > 0){
            this.setState({camera: true, result:data.split("/").pop()});
            this.props.history.push('/object/'+data.split("/").pop())
        }
    }
    render() {
      if (!this.state.camera){
          return [

            <div className="Camera-view">
            <a onClick={this.props.history.goBack} className="back" >cancel</a>
            <Link to="/highlights" className="skip" href="#">skip</Link>
            <div className="Intro-text">Allow camera access to start scanning</div>
            <div className="Allow-access-button"><a  href="#" onClick={this.activateCamera}> Allow Access </a></div>
            </div>

          ];
  }
      else{
          return (<div className="Camera-view">
                  <a onClick={this.props.history.goBack} className="back" >cancel</a>
                  <Link to="/highlights" className="skip" href="#">skip</Link>
                  <div className="Intro-text">Scan the QRcode on the art placard</div>
                  <div className="Scan-area"><QrReader onScan={this.handleScan}/></div>

            </div>);

      }
    }
}
class CameraPage extends Component {
  render() {
    return (

      <div className="Camera-view">
          <Link to="/" className="back" >back</Link>
          <Camera history={this.props.history}/>
      </div>

    );
  }
}

export {Welcome,
        CameraPage}
