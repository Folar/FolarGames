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
            data: {}
        };
        _this = this;

    }
    componentDidMount() {
        var W3CWebSocket = require('websocket').w3cwebsocket;
        var name = this.props.name;
        var client = new W3CWebSocket('ws://localhost:9081/', 'echo-protocol');


        client.onerror = function () {
            console.log('Connection Error');
        };


        client.onmessage = function (x) {
            let packet = JSON.parse(x.data);

            _this.setState({data:packet});

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
                height: 5,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
            }}>
                <CardsLayout text={this.props.text} data={this.state.data}/>
                <TextScoreLayout text={this.props.text} data={this.state.data}/>

            </View>
        )
    }
}

module.exports = TakeSixLayout;
