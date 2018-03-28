import React from 'react';
import {
    View,
    Animated,
    Text,
    asset,
    VrSoundEffects
} from 'react-vr';

import {Easing} from 'react-native';


import TextScoreLayout from './TextScoreLayout.js';
import CardsLayout from './CardsLayout.js';

//Layout
_this = null;
class TakeSixLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            card:{},
            data: {},
            client:this.props.client,
            showButton:true
        };

        _this = this;
        this.client = null;

    }
    pickCard(x,r){
        if (r == 0)
            this.state.client.send(JSON.stringify({name:this.state.name,type:"selectCard",card:x,row:r}));
        else
            this.state.client.send(JSON.stringify({name:this.state.name,type:"placeCard",card:x,row:r}));

    }

    clickButton(){
       // console.log("in click Button "+JSON.stringify({name:this.state.name,type:"startingGame"}));
        this.state.client.send(JSON.stringify({name:this.state.name,type:"startingGame"}));
    }
    componentDidMount(){


    }
    connectToServer(){

    }


    render() {


        return (
            <View style={{
                marginLeft: .1,
                width: 5,
                height: 1.4,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
            }}>
                <CardsLayout text={this.props.text} data={this.state.data} t={this} state={this.state.data.state}
                             pickCard={this.pickCard.bind(this)}/>
                <TextScoreLayout text={this.props.text}  showButton={this.state.showButton} data={this.state.data}
                                 playAgain={this.props.connectToServer}
                                 clickButton={this.clickButton.bind(this)}/>

            </View>
        )
    }
}

module.exports = TakeSixLayout;
