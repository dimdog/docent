import React, { Component } from 'react';
import listen from './img/Listen.png';
import save from './img/Save.png';
import saved from './img/Saved.png';
import GoogleLogin from 'react-google-login';
import Modal from 'react-modal';
import Met from './img/Met-logo.png';
import Scan from './img/scan.png';
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ObjectPage extends Component {

	constructor(props) {
                const cookies = new Cookies();
		super(props);
                var id = props.id;
                if (props.match && props.match.params){
                    id = props.match.params.id || props.id || 0;
                }
		this.state = {
                        cookies: cookies,
			error: null,
			isLoaded: false,
                        language: "EN",
                        id: id,
			item: {},
                        modalIsOpen: false,
                        loggedIn: false
		}
                this.getPropForLanguage = this.getPropForLanguage.bind(this);
                this.changetoEn = this.changetoEn.bind(this);
                this.changetoNl = this.changetoNl.bind(this);
                this.closeModal = this.closeModal.bind(this);
                this.openModal = this.openModal.bind(this);
                this.googleLogin = this.googleLogin.bind(this);
                this.toggleLike = this.toggleLike.bind(this);

	}

  googleLogin(data){
      this.state.cookies.set("tokenId", data.tokenId, {secure:true});
      var post_data = {
          email: data.profileObj.email,
          accessToken: data.accessToken,
          tokenId: data.tokenId
      }
      fetch('https://virtual-docent.herokuapp.com/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post_data)
      });
      this.toggleLike();
  }
  getPropForLanguage(prop){
      if (this.state.item && this.state.item.languages){
        return this.state.item.languages[this.state.language][prop];
      }
      return prop;
  }
  changetoEn(){
      this.setState({
        language: "EN"
      });
  }
  changetoNl(){
      this.setState({
        language: "NL"
      });
  }
  openModal(){
      if (!this.state.loggedIn){
          this.setState({
            modalIsOpen: true
          });
      }
  }
  closeModal(){
      this.setState({
        modalIsOpen: false
      });
  }
  toggleLike() {
    var options = {};
    var method = (this.state.liked) ? 'DELETE' : 'POST';
    if (this.state.cookies.get("tokenId")){
        options = {
            method: method,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({"tokenId": this.state.cookies.get("tokenId")})
        };
    }
    fetch("https://virtual-docent.herokuapp.com/like/"+this.state.id, options)
        .then(res => res.json())
            .then(
                (result) => {
                    this.setState({liked: !this.state.liked});
                },
                (error) => {
                }
            )
  }
  componentDidMount() {
    var options = {};
    console.log(this.state.cookies.get("tokenId"));
    if (this.state.cookies.get("tokenId")){
        console.log("we have the cookie");
        options = {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({"tokenId": this.state.cookies.get("tokenId")})
        };
    }
    fetch("https://virtual-docent.herokuapp.com/"+this.state.id, options)
        .then(res => res.json())
            .then(
                (result) => {
                    var user = null;
                    var liked = false;
                    user = result.user;
                    liked = result.liked;
                    console.log("setting user:"+user);

                    this.setState({
                            isLoaded: true,
                            user: user,
                            liked: liked,
                            item: result,
                            id: this.state.id
                    });
                    console.log(this.state);
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
    var save_button = (this.state.user === null) ? this.openModal : this.toggleLike;
    console.log(this.state.user == null);
    return (
      <div className="App">
        <header className="App-header">


        <div className="Grid-container">
        <div className="Navbar">
            <Link to="/highlights" className="Highlights-button"><a href="#"><img src={Met} width="40px" alt="Met-logo"></img></a><a className="Profile-img" width="50px"></a>
            </Link>
            <div className="App-title">Virtual Docent</div>
            <div className="Signed-in" onClick=""><a className="Profile-img" width="50px"></a></div>
        </div>

          <img src={this.state.item.primary_image} className="Primary-image" alt="primaryImage" />

          <h1 className="Item-title">{this.getPropForLanguage('title')}</h1>
          <a className="Item-year" href = "#">{this.state.item.obj_date}</a>
          <a className="Item-medium">{this.getPropForLanguage('medium')}</a>
          <a className="Button-listen" href = "#"><img src={listen} width="40px" alt="listen" /></a>
          <a className="Button-save" href = "#" ><img src={(this.state.liked) ? saved : save} onClick={save_button}  width ="40px" alt="save"/><div className="Save-modal"></div></a>
          <div className="skinny-break"></div>
          <p className="Item-artist">{this.state.item.artist}</p>
          <p className="Item-description">{this.getPropForLanguage('description')}</p>
          </div>

        <div className="Modal-style">
          <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Login Modal">
          <div className="Login-modal">
            <div className="Modal-title">Save the works <br/> you love.</div>
              <div><a onClick={this.closeModal} href="#" className="Button-close">Cancel</a>
                <GoogleLogin
                    buttonText="Login With Google"
                    clientId="633799705698-fs81n284e1iv4318fk2vdclksv29d82e.apps.googleusercontent.com"
                    onSuccess={this.googleLogin}
                    onFailure={this.googleLogin}
                    className="Button-login"
                />
              </div>
              </div>
            </Modal>
          </div>
          <div className="Section-label">Related Works</div>
          <div className="Staggered-grid">
                <div className="Item-a">also by #artist</div>
                <div className="Item-b"> more from #time period</div>
                <div className="Item-b"> also by #artist</div>
                <div className="Item-a"> from the same collector</div>
          </div>
                <div className="Item-c">in the #gallery</div>
        </header>
        <div className="Button-scan"><a href="#"><img src={Scan} width="80px"></img></a></div>
        <footer>
        <div className="languages"><a href="#" onClick={this.changetoEn} className = "english">🇺🇸 english</a><a href="#" onClick={this.changetoNl} className = "dutch">🇳🇱 dutch</a></div>
        </footer>
      </div>
    );
  }
}
export default ObjectPage;
