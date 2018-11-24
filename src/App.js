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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function galItemfromItem(item){
    return {
        src: item.primary_image,
        thumbnail: item.primary_image,
        thumbnailWidth: 500, // TOOO
        thumbnailHeight: 500, // TODO
        caption: item.title,
        id: item.id
    }
}


class Highlights extends Component {
    tileClick (index){
        this.props.history.push('/object/'+this.state.items[index].id)
    }
    constructor(props) {
            super(props);
            this.state = {
                    error: null,
                    isLoaded: false,
                    items: []
            }
            this.tileClick = this.tileClick.bind(this);
    }
    componentDidMount() {
        fetch("https://virtual-docent.herokuapp.com/")
            .then(res => res.json())
                .then(
                    (result) => {
                        var items = [];
                        result.items.forEach(function(item){
                            items.push(galItemfromItem(item));
                        });
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
        return <Gallery images={this.state.items} className="Gallery" onClickThumbnail={this.tileClick} />
    }
}
class ObjectPage extends Component {
	constructor(props) {
		super(props);
                var id = props.id;
                if (props.match && props.match.params){
                    id = props.match.params.id || props.id || 0;
                }
		this.state = {
			error: null,
			isLoaded: false,
                        language: "EN",
                        id: id,
			item: {}
		}
                this.getPropForLanguage = this.getPropForLanguage.bind(this);
	}

  getPropForLanguage(prop){
      console.log("-------");
      console.log(this.state.item);
      if (this.state.item && this.state.item.languages){
        return this.state.item.languages[this.state.language][prop];
      }
      return prop;
  }
  componentDidMount() {
    fetch("https://virtual-docent.herokuapp.com/"+this.state.id)
        .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                            isLoaded: true,
                            item: result,
                            language: this.state.language,
                            id: this.state.id
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
					<h1 className="Item-title">{this.getPropForLanguage('title')}</h1>
          <a className="Item-year" href = "#">{this.state.item.obj_date}</a>
          <div className="Button-bar">
             <a href = "#"><img src={listen} className="Button-listen" width="40px" alt="listen" /></a>
             <a href = "#" ><img src={save} className="Button-save" width ="40px" alt="save"/></a></div>
          <p className="Item-medium">{this.getPropForLanguage('medium')}</p>
          <div className="skinny-break"></div>
          <p className="Item-artist">{this.state.item.artist}</p>
          <p className="Item-description">{this.getPropForLanguage('description')}</p>
          </div>
        </header>
        <footer>
        <div class="languages"><a href="#" class = "english">🇺🇸 english</a><a href="#" class = "dutch">🇳🇱 dutch</a></div>
        </footer>
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
          <div className="Next-button"><Link to="/camera"><img src={next} width="80" alt="Next-button"/></Link></div>
        </div>

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
          <div className="Allow-access-button"><a onClick={this.activateCamera} href="#"> Allow Access </a> </div>];
      }
      else{
          return (<div className="Camera-view">
          <div className="Camera-intro">Scan the QRcode on the art placard</div>
          <QrReader onScan={this.handleScan} className="Scan-area"/>
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

const AppRouter = () => (
  <Router>
	<div>
      <Route path="/" exact component={Welcome} />
      <Route path="/camera" exact component={CameraPage} />
      <Route path="/highlights/" component={Highlights} />
      <Route path="/object/:id" component={ObjectPage} />
	</div>
  </Router>
);

export default AppRouter;
