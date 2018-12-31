import React, { Component } from 'react';

// probably do this differently in the future. this seems like a poor design path :shrug:
class Random extends Component {
    constructor(props) {
        super(props);
        this.getRandomItem = this.getRandomItem.bind(this);
    }
    getRandomItem(){
        fetch("https://docentapp.com/api/random")
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.history.push('/object/'+result.id); // update url bar
                },
                (error) => {
                }
            );
    }
    render() {
        this.getRandomItem();
        return <div />;
    }
}

export default Random;
