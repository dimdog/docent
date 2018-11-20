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
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/204503")
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
          <img src={this.state.item.primaryImage} className="App-logo" alt="primaryImage" />
					<h1 className="Item-title">{this.state.item.title}</h1>
					<h2 className="Item-artist">{this.state.item.artistDisplayName}</h2>
                                        <h3 className="Item-medium">{this.state.item.medium}</h3>
        </header>
      </div>
    );
  }
}

export default App;
