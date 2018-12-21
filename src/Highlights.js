import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import Met from './img/Met-logo.png';
import {Link} from "react-router-dom";
import NavBar from './NavBar.js';
import Fab from './fab.js';
import queryString from "query-string";


function galItemfromItem(item){
    return {
        src: item.primary_image,
        thumbnail: item.primary_image,
        thumbnailWidth: item.primary_image_width / 10,
        thumbnailHeight: item.primary_image_height / 10,
        caption: item.title,
        id: item.id
    }
}
class Highlights extends Component {
    tileClick (index){
        this.props.history.push('/object/'+this.state.items[index].id);
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
        var qs = queryString.parse(this.props.location.search);
        var repository_id = qs.repository || 2;
        fetch("https://docentapp.com/api?repository="+repository_id)
            .then(res => res.json())
                .then(
                    (result) => {
                        var items = [];
                        result.items.forEach(function(item){
                            items.push(galItemfromItem(item));
                        });
                        this.setState({
                                isLoaded: true,
                                items: items,
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

        return (
        <div className="View-container">
          <NavBar parentState={this.state} />
          <Gallery images={this.state.items} className="Gallery" onClickThumbnail={this.tileClick} />
          <Fab/>

        </div>)

    }
}
export default Highlights;
