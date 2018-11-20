import React, { Component } from 'react';
import logo from './logo.svg';
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
          <img src={this.state.item.primaryImage} className="Primary-image" alt="primaryImage" />
					<h1 className="Item-title">{this.state.item.title}</h1>
          <p className="item-year"> 1994
          </p>
					<h2 className="Item-artist">{this.state.item.artistDisplayName}</h2>
                                        <h3 className="Item-medium">{this.state.item.medium}</h3>
          <p className="Item-description">Bourgeois, who grew up in a family of five and built her own family of five as an adult, constructed this quintet of spiders from salvaged metal parts and stock rods of steel. The size and materials lend the work of an industrial, futuristic feel. The artist often emphasized the contrast between the sculptural value of spiders’ bodies and the spindly lengths of their legs; she likened these limbs to drawn lines, and drawing itself to spinning a web: “What is a drawing? It is a secretion, like the thread in a spider’s web… It is knitting, a spiral, a spider web and other significant organizations of space.”
          </p>
        </header>
      </div>
    );
  }
}

export default App;
