import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';

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
    }
    componentDidMount() {
        fetch("https://docentapp.com/api/gallery")
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
        return <Gallery images={this.state.items} className="Gallery" onClickThumbnail={this.tileClick} />
    }
}
export default UserGallery;
