import React, { Component } from 'react';
import listen from './img/Listen.png';
import save from './img/Save.png';
import saved from './img/Saved.png';
import GoogleLogin from 'react-google-login';
import Modal from 'react-modal';
import Met from './img/Met-logo.png';
import {Link, Redirect} from "react-router-dom";
import NavBar from './NavBar.js';
import Fab from './fab.js';
import SnackBar from './SnackBar.js';
import Gallery from 'react-grid-gallery';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

function galItemfromItem(item){
    // TODO FACTOR ME OUT TO ONE FUNCTION, NOT COPY / PASTED EVERYWHERE
    return {
        src: item.primary_image,
        thumbnail: item.primary_image,
        thumbnailWidth: item.primary_image_width / 10,
        thumbnailHeight: item.primary_image_height / 10,
        caption: item.title,
        id: item.id
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
			item: {},
                        items: [],
                        modalIsOpen: false,
                        loggedIn: false,
                        redirect: false
		}
                this.getPropForLanguage = this.getPropForLanguage.bind(this);
                this.changetoEn = this.changetoEn.bind(this);
                this.changetoNl = this.changetoNl.bind(this);
                this.closeModal = this.closeModal.bind(this);
                this.openModal = this.openModal.bind(this);
                this.googleLogin = this.googleLogin.bind(this);
                this.demoLogin = this.demoLogin.bind(this);
                this.toggleLike = this.toggleLike.bind(this);
                this.tileClick = this.tileClick.bind(this);

	}
    tileClick (index){
        this.setState({id_changed: true, id: this.state.items[index].id});
    }

  googleLogin(data){
      var post_data = {
          email: data.profileObj.email,
          accessToken: data.accessToken,
          tokenId: data.tokenId
      }
      fetch('https://docentapp.com/api/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post_data)
      })
        .then(res => res.json())
            .then(
                (result) => {
                    this.setState({user: result});
                    this.toggleLike();
                    this.closeModal();
                },
                (error) => {
                }
            );
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
  demoLogin(){
      fetch('https://docentapp.com/api/demologin')
        .then(res => res.json())
            .then(
                (result) => {
                    this.setState({user: result});
                    this.toggleLike();
                    this.closeModal();
                },
                (error) => {
                }
            );
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
    var method = (this.state.liked) ? 'DELETE' : 'POST';
    fetch("https://docentapp.com/api/like/"+this.state.id, {method:method})
        .then(res => res.json())
            .then(
                (result) => {
                    this.setState({liked: !this.state.liked});
                },
                (error) => {
                }
            );
  }
  componentDidMount() {
    fetch("https://docentapp.com/api/"+this.state.id)
        .then(res => res.json())
            .then(
                (result) => {
                    var user = null;
                    var liked = false;
                    if (result.user){
                        user = result.user;
                    }
                    liked = result.liked;
                    var unprocessed_items = result.artist_other_works.concat(result.department_other_works);
                    var items = [];
                    unprocessed_items.forEach(function(item){
                        items.push(galItemfromItem(item));
                    });
                    console.log(items);
                    this.setState({
                            isLoaded: true,
                            user: user,
                            liked: liked,
                            item: result,
                            items: items,
                            id: this.state.id,
                            id_changed:false
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
    console.log(this.state.item);
    var style = { backgroundImage: "url(" + this.state.item.primary_image + ")", height:this.state.item.primary_image_height || 9000};
    if (this.state.id_changed){
        this.componentDidMount();
    }
    var save_button = this.openModal;
    var profile_img = <a className="Profile-img" width="50px"></a>;
    if (this.state.user != null){
       save_button = this.toggleLike;
       profile_img = <Link to="/mysaves"><img src={this.state.user.image_url} className="Profile-img" width="50px"></img></Link>;
    } else {
        save_button = this.openModal;
    }
    return (
      <div className="App">
        <header className="App-header">


        <div className="Grid-container">
        <NavBar parentState={this.state} />

          <div className="Primary-image" style={style}  />
          <h1 className="Item-title">{this.getPropForLanguage('title')}</h1>
          <a className="Item-year" href = "#">{this.state.item.obj_date}</a>
          <a className="Item-medium">{this.getPropForLanguage('medium')}</a>
          <div className="Button-group"><Link to ="/" className="Button-listen" href = "#"><img src={listen} width="40px" alt="listen" /></Link>
          <a className="Button-save" href = "#" ><img src={(this.state.liked) ? saved : save} onClick={save_button}  width ="40px" alt="save"/><SnackBar/></a>
          </div>
          <p className="Item-artist">{this.state.item.artist}</p>
          <p className="Item-description">{this.getPropForLanguage('description')}</p>
          </div>

        <div className="Login-modal">
          <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Login Modal">

            <div className="Modal-title">Save the works <br/> you love.</div>
              <div>
                  <a onClick={this.closeModal} href="#" className="Button-close">Cancel</a>
                  <a onClick={this.demoLogin} href="#" className="Button-demo">Demo Login</a>
                <GoogleLogin
                    buttonText="Login With Google"
                    clientId="633799705698-fs81n284e1iv4318fk2vdclksv29d82e.apps.googleusercontent.com"
                    onSuccess={this.googleLogin}
                    onFailure={this.googleLogin}
                    className="Button-login"
                />
              </div>

            </Modal>
          </div>
          <div className="Section-label">Related Works</div>
          <Gallery images={this.state.items} className="Gallery" onClickThumbnail={this.tileClick} />
        </header>

        <Fab/>
        <footer>
        <div className="languages"><a href="#" onClick={this.changetoEn} className = "english">🇺🇸 english</a><a href="#" onClick={this.changetoNl} className = "dutch">🇳🇱 dutch</a></div>
        </footer>
      </div>
    );
  }
}
export default ObjectPage;
