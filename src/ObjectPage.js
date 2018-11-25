import React, { Component } from 'react';
import listen from './img/Listen@3x.png';
import save from './img/Save.png';
import GoogleLogin from 'react-google-login';
import Modal from 'react-modal';

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
                this.changetoEn = this.changetoEn.bind(this);
                this.changetoNl = this.changetoNl.bind(this);
	}

  getPropForLanguage(prop){
      if (this.state.item && this.state.item.languages){
        return this.state.item.languages[this.state.language][prop];
      }
      return prop;
  }
  changetoEn(){
      this.setState({
        isLoaded: true,
        item: this.state.item,
        language: "EN",
        id: this.state.id
      })
  }
  changetoNl(){
      this.setState({
        isLoaded: true,
        item: this.state.item,
        language: "NL",
        id: this.state.id
      })
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
             <GoogleLogin /><a href = "#" ><img src={save} className="Button-save" width ="40px" alt="save"/><div className="Save-modal"></div></a></div>
          <p className="Item-medium">{this.getPropForLanguage('medium')}</p>
          <div className="skinny-break"></div>
          <p className="Item-artist">{this.state.item.artist}</p>
          <p className="Item-description">{this.getPropForLanguage('description')}</p>
          </div>
        </header>
        <footer>
        <div className="languages"><a href="#" onClick={this.changetoEn} className = "english">🇺🇸 english</a><a href="#" onClick={this.changetoNl} className = "dutch">🇳🇱 dutch</a></div>
        </footer>
      </div>
    );
  }
}
export default ObjectPage;
