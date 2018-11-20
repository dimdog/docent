import React, { Component } from 'react';
import logo from './logo.svg';
import listen from './img/Listen@3x.png';
import save from './img/Save.png';
import './App.css';

function tile(props){
    return <img src={props.src} alt={props.alt} className="tile" />; // TODO need to encode id in here as href
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
    fetch("http://localhost:5000/11676")
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
          <img src={this.state.item.primaryImage} className="Primary-image" alt="primaryImage" />
					<h1 className="Item-title">{this.state.item.title}</h1>
          <a className="Item-year" href = "#"> 1994</a>
          <div className="Button-bar">
             <a href = "#"><img src={listen} className="Button-listen" width="40px" alt="listen" /></a>
             <a href = "#" ><img src={save} className="Button-save" width ="40px" alt="save"/></a></div>
          <p className="Item-medium">{this.state.item.medium}</p>
          <div className="skinny-break"></div>
					<p className="Item-artist">{this.state.item.artistDisplayName}</p>
          <p className="Item-description">Bourgeois, who grew up in a family of five and built her own family of five as an adult, constructed this quintet of spiders from salvaged metal parts and stock rods of steel. The size and materials lend the work of an industrial, futuristic feel. The artist often emphasized the contrast between the sculptural value of spiders’ bodies and the spindly lengths of their legs; she likened these limbs to drawn lines, and drawing itself to spinning a web: “What is a drawing? It is a secretion, like the thread in a spider’s web… It is knitting, a spiral, a spider web and other significant organizations of space.”
          </p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
