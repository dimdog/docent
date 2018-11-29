import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import Met from './img/Met-logo.png';
import {Link} from "react-router-dom";


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
      var profile_img = <a className="Profile-img" width="50px"></a>;
      /*if (this.state.user != null){
         profile_img = <Link to="/mysaves"><img src={this.state.user.image_url} className="Profile-img" width="50px"></img></Link>;
      }*/
        return (<div>
          <div className="Navbar">
              <Link to="/highlights" className="Highlights-button">
                <img src={Met} width="40px" alt="Met-logo"></img>
              </Link>
              <Link to="/mysaves" className="Profile-img" width="50px"></Link>
              <div className="App-title">Virtual Docent</div>
              <div className="Signed-in" onClick="">{profile_img}</div>
          </div>
          <Gallery images={this.state.items} className="Gallery" onClickThumbnail={this.tileClick} />

        </div>)

    }
}
export default Highlights;
