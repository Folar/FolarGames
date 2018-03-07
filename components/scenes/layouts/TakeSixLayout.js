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
class TakeSixLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    componentDidMount() {
        var W3CWebSocket = require('websocket').w3cwebsocket;
        var name = this.props.name;
        var client = new W3CWebSocket('ws://localhost:9081/', 'echo-protocol');

        client.onerror = function () {
            console.log('Connection Error');
        };
        client.onmessage = function (x) {
            console.log('message ' + x.toString());


        };

        client.onopen = function () {
            console.log('WebSocket Client Connected');

            function sendNumber() {
                if (client.readyState === client.OPEN) {
                    var number = Math.round(Math.random() * 0xFFFFFF);
                    client.send((JSON.stringify({name:name,type:"newMessage"})));;

                }
            }

            sendNumber();
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
                <CardsLayout text={this.props.text}/>
                <TextScoreLayout text={this.props.text}/>

            </View>
        )
    }
}

module.exports = TakeSixLayout;
