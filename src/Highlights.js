import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import Met from './img/Met-logo.png';
import {Link} from "react-router-dom";
import NavBar from './NavBar.js';
import Fab from './fab.js';


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
        fetch("https://docentapp.com/")
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

        return (
        <div className="View-container">
          <NavBar/>
          <Gallery images={this.state.items} className="Gallery" onClickThumbnail={this.tileClick} />
          <Fab/>

        </div>)

    }
}
export default Highlights;
