import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import Cookies from 'universal-cookie';

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
class UserGallery extends Component {
    tileClick (index){
        this.props.history.push('/object/'+this.state.items[index].id)
    }
    constructor(props) {
            const cookies = new Cookies();
            super(props);
            this.state = {
                    cookies: cookies,
                    error: null,
                    isLoaded: false,
                    items: []
            }
            this.tileClick = this.tileClick.bind(this);
    }
    componentDidMount() {
        /*var options = {};
        if (this.state.cookies.get("tokenId")){
            options = {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({"tokenId": this.state.cookies.get("tokenId")})
            };
        }*/
        //fetch("https://virtual-docent.herokuapp.com/gallery", options)
        fetch("https://docentapp.com/api")
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
        return <Gallery images={this.state.items} className="Gallery" onClickThumbnail={this.tileClick} />
    }
}
export default UserGallery;
