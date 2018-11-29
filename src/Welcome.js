import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Met from './img/Met-logo.png';
import Angle_BR from './img/Angle_BR.png';
import Angle_TL from './img/Angle_TL.png';
import next from './img/next.png';
import QrReader from "react-qr-reader";

class Welcome extends Component {

  render() {
    return (

      <div className="Welcome">
      <div className="Angle-TL"><img src={Angle_TL} className="Angle-TL" width="100" alt="bracket">
      </img>
        </div>
      <div className="Met-logo"><img src={Met} className="Met-logo" width="183px" alt="Met-logo">
        </img>
        </div>
        <div className="Angle-BR"><img src={Angle_BR} className="Angle-BR" width="100" alt="bracket">
        </img>
          </div>
          <div className="Title-text">Virtual Docent</div>
          <div className="Subtitle-text">Scan and <br/> Save Art.</div>
          <div className="Button-next"><Link to="/camera"><img src={next} width="80" alt="Next-button"/></Link></div>
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
        this.state = {
            error: null,
            camera: false,
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
          return [<div className="Intro-text">Allow camera access to start scanning</div>,
          <a className="Allow-access-button" href="#" onClick={this.activateCamera}> Allow Access </a>];
      }
      else{
          return (<div className="Camera-view">

          <div className="Intro-text">Scan the QRcode on the art placard</div>
          <div className="Scan-area"><QrReader onScan={this.handleScan}/></div>
          <div className="skip"><a href="#">skip</a></div>
            </div>);
      }
    }
}
class CameraPage extends Component {
  render() {
    return (
      <div className ="View-container">
      <div className="Allow-camera">
          <div><Link to="/" className="back" >back</Link></div>
          <Camera history={this.props.history}/>
</div>
        </div>
    );
  }
}

export {Welcome,
        CameraPage}
