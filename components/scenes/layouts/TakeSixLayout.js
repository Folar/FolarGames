import React from 'react';
import {
    View,
    Animated,
    Text
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
            name: "",
            card:{},
            data: {},
            showButton:true
        };
        _this = this;
        this.client = null;

    }
    pickCard(x){
        console.log("in click Button "+JSON.stringify({name:this.state.name,type:"selectCard",card:x}));
        this.client.send(JSON.stringify({name:this.state.name,type:"selectCard",card:x}));
    }

    clickButton(){
       // console.log("in click Button "+JSON.stringify({name:this.state.name,type:"startingGame"}));
        this.client.send(JSON.stringify({name:this.state.name,type:"startingGame"}));
    }
    componentDidMount() {
        let W3CWebSocket = require('websocket').w3cwebsocket;
        let name = this.props.name;
        this.setState({name:name});
        let client = new W3CWebSocket('ws://localhost:9081/', 'echo-protocol');

        this.client = client
        client.onerror = function () {
            console.log('Connection Error');
        };


        client.onmessage = function (x) {
            let packet = JSON.parse(x.data);

            _this.setState({data:packet});

            _this.setState({showButton:packet.state<2})
        };

        client.onopen = function () {
            console.log('WebSocket Client Connected');

            function sendMessage() {
                if (client.readyState === client.OPEN) {

                    client.send(JSON.stringify({name:name,type:"newUser"}));

                }
            }

            sendMessage();
        };


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
                                 clickButton={this.clickButton.bind(this)}/>

            </View>
        )
    }
}

module.exports = TakeSixLayout;
