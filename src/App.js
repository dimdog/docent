import React, { Component } from 'react';
import logo from './logo.svg';
import listen from './img/Listen@3x.png';
import save from './img/Save.png';
import './App.css';
import Gallery from 'react-grid-gallery';
import Met from './img/Met-logo.png';
import Angle_BR from './img/Angle_BR.png';
import Angle_TL from './img/Angle_TL.png';
import next from './img/next.png';
import QrReader from "react-qr-reader";


function tile(props){
    return <img src={props.src} alt={props.alt} className="tile" />; // TODO need to encode id in here as href
}

function galItemfromItem(item){
    return {
        src: item.primary_image,
        thumbnail: item.primary_image,
        thumbnailWidth: 320, // TOOO
        thumbnailHeight: 212, // TODO
        caption: item.title,
        objectId: item.id
    }
}

function tileClick(){
    console.log(this.state);
}

class Highlights extends Component {

    constructor(props) {
            super(props);
            this.state = {
                    error: null,
                    isLoaded: false,
                    items: []
            }
    }
    componentDidMount() {
        fetch("https://virtual-docent.herokuapp.com/")
            .then(res => res.json())
                .then(
                    (result) => {
                        var items = [];
                        result.items.forEach(function(item){
                            console.log(item);
                            items.push(galItemfromItem(item));
                        });
                        console.log(items);
                        this.setState({
                                isLoaded: true,
                                items: items
                        });
                    },
                    (error) => {
                        this.setState({
                                isLoaded: true,
                                error
                    });
            }
        )
    }
    render() {
        return <Gallery images={this.state.items} onSelectImage={tileClick} enableLightbox="false" />
    }
}
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			item: {}
		}
	}
  componentDidMount() {
    fetch("https://virtual-docent.herokuapp.com/64")
        .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);

                    this.setState({
                            isLoaded: true,
                            item: result
                    });
                },
                (error) => {
                    this.setState({
                            isLoaded: true,
                            error
                    });
                }
            )
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className="Grid-container">
          <img src={this.state.item.primary_image} className="Primary-image" alt="primaryImage" />
					<h1 className="Item-title">{this.state.item.title}</h1>
          <a className="Item-year" href = "#"> 1994</a>
          <div className="Button-bar">
             <a href = "#"><img src={listen} className="Button-listen" width="40px" alt="listen" /></a>
             <a href = "#" ><img src={save} className="Button-save" width ="40px" alt="save"/></a></div>
          <p className="Item-medium">{this.state.item.medium}</p>
          <div className="skinny-break"></div>
          <p className="Item-artist">{this.state.item.artist}</p>
          <p className="Item-description">Bourgeois, who grew up in a family of five and built her own family of five as an adult, constructed this quintet of spiders from salvaged metal parts and stock rods of steel. The size and materials lend the work of an industrial, futuristic feel. The artist often emphasized the contrast between the sculptural value of spiders’ bodies and the spindly lengths of their legs; she likened these limbs to drawn lines, and drawing itself to spinning a web: “What is a drawing? It is a secretion, like the thread in a spider’s web… It is knitting, a spiral, a spider web and other significant organizations of space.”
          </p>
          </div>
        </header>
      </div>
    );
  }
}

class Welcome extends Component {

  render() {
    return (
      <div className ="View-container">
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
          <div className="Next-button"><a href="#"><img src={next} width="80" alt="Next-button"/></a></div>
        </div>

        </div>
    );
  }
}

class CameraPermission extends Component {
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
    }
    handleScan(data) {
        if (data) {
          console.log("DATA"+data);
          this.setState({
            result: data,
            camera: true
          });
        }
    }
    render() {
      var displayTag = "";
      console.log(this.state);
      if (!this.state.camera){
          return [<div className="Intro-text">Allow camera access to start scanning</div>,
          <div className="Allow-access-button"><a onClick={this.activateCamera} href="#"> Allow Access </a> </div>];
      }
      else{
          return <QrReader className="Camera-View"/>;
      }
    }
}
class Camera extends Component {
  render() {
    return (
      <div className ="View-container">
      <div className="Allow-camera">
          <div><a href="#"className="back">back</a></div>
          <CameraPermission />
</div>
        </div>
    );
  }
}

export default Camera;
