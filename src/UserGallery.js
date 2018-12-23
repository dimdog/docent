import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import CalAcademy from './img/Header_CalAcademy.png';
import GlassHouse from './img/Header_GlassHouse.png';
import Met from './img/Header_Met.png';
import NEWSM from './img/Header_NEWSM.png';
import RISDMuseum from './img/Header_RISDMuseum.png';
import Rijksmuseum from './img/Header_Rijksmuseum.png';

var repository_map = {
    1: Met,
    2: Rijksmuseum,
    3: CalAcademy
};
function galItemfromItem(item){
    return {
        src: item.primary_image,
        thumbnail: item.primary_image,
        thumbnailWidth: item.primary_image_width || 500,
        thumbnailHeight: item.primary_image_height || 500,
        caption: item.title,
        id: item.id
    }
}
function templateRow(repository, tileclick){
    var items = [];
    repository.items.forEach(function(item){
        items.push(galItemfromItem(item));
    });
    return (
        <div className="Museum view" id={repository.name}>
          <div className="Museum-header" height="250px">
            <div className="gallery-header"><img src={repository_map[repository.id]} width ="100%"></img></div>
                  <Gallery images={items} className="Gallery" onClickThumbnail={tileclick} />
          </div>
        </div>);
}
class UserGallery extends Component {
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
            this.content = <div />
    }
    componentDidMount() {
        var that = this;
        fetch("https://docentapp.com/api/gallery")
            .then(res => res.json())
                .then(
                    (result) => {
                        var rows = [];
                        result.repositories.forEach(function(repository){
                            rows.push(templateRow(repository, that.tileClick));
                        });
                        this.content = rows;
                        this.setState({
                                isLoaded: true,
                                user: result.user
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
        return <div>{this.content}</div>;
    }
}
export default UserGallery;
