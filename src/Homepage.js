import React, { Component } from 'react';
import queryString from "query-string";
import DocentLogo from './img/logo_Wide.png';
import Gallery from 'react-grid-gallery';
import CalAcademy from './img/Header_CalAcademy.png';
import GlassHouse from './img/Header_GlassHouse.png';
import Met from './img/Header_Met.png';
import NEWSM from './img/Header_NEWSM.png';
import RISDMuseum from './img/Header_RISDMuseum.png';
import Rijksmuseum from './img/Header_Rijksmuseum.png';



function galItemfromItem(item){
    return {
        src: item.primary_image,
        thumbnail: item.primary_image,
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        caption: item.title,
        id: item.id
    }
}
function repo(item, name, id){
    return galItemfromItem({primary_image: item, title:name, id:id});
}
var repositories = [
    repo(Met, "Metropolitan Museum of Art", 1),
    repo(Rijksmuseum, "Rijksmuseum", 2),
    repo(CalAcademy, "California Academy of Sciences", 3),
    repo(RISDMuseum, "Rhode Island School of Design Museum", 4),
    repo(GlassHouse, "The Glass House", 5),
];
class Homepage extends Component {
    constructor(props) {
        super(props);
        var qs = queryString.parse(this.props.location.search);
        var page = "about";
        if (qs.p && qs.p == 1){
            page = "case_studies";
        }
        this.state = {page: page};
        this.tileClick = this.tileClick.bind(this);
        this.setAbout = this.setAbout.bind(this);
        this.setCasestudy = this.setCasestudy.bind(this);
    }
    tileClick (index){
        this.props.history.push('/highlights?repository='+(index+1));
    }
    setAbout(){
        this.setState({page: "about"});
        this.props.history.push('/?p=0');
    }
    setCasestudy(){
        this.setState({page: "case_studies"});
        this.props.history.push('/?p=1');
    }
    render() {
        var header = (
                <div className="homepage-header">
                    <img className="homepage-logo" src={DocentLogo}></img>
                    <div className="homepage-header-list">
                        <a onClick={this.setAbout} href="#" className="homepage-header-option"> About </a>
                        <a onClick={this.setCasestudy} href="#" className="homepage-header-option"> Case Studies </a>
                    </div>
                </div>);
        var about_panel = (
                <div className="homepage-about">
                    <div className="homepage-about-leftpanel">
                        <p> sbj: a modern museum experience. </p>
                        <p> Hello ^art World, </p>
                        <p> We wanted to create a new platform which increases the reflection, enrichment, and engagement when visiting an artspace.
                        We're just starting to bring collections online, but feel free to enjoy some of our case study museums.
                        Interested in docent for your collection? Just <a href="#"> contact us </a> </p>
                        <p> Thanks </p>
                        <p> Ben, Alicia, and Andy </p>
                        <p> (team docent) </p>
                    </div>
                    <div className="homepage-about-rightpanel">
                    </div>
                </div>);
        var case_studies_panel = (
                <div className="homepage-case-studies">
                    <div className="homepage-case-title">
                        <p> Explore some of our case study museums </p>
                    </div>
                    <Gallery images={repositories} className="Gallery" onClickThumbnail={this.tileClick} />
                    <div className="homepage-case-curious">
                        <p> Curious about how docent can modernize your collection? <a href="#"> Just contact us </a></p>
                    </div>
                </div>
                );
        var content = about_panel;
        if (this.state.page == "case_studies"){
            content = case_studies_panel;
        }
        return (
            <div>
            {header}
            {content}
            </div>);
    }
}

export default Homepage;
