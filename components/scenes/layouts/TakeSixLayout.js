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
            name: "",
            card:{},
            data: {},
            showButton:true
        };

        _this = this;
        this.client = null;

    }
    pickCard(x,r){
        if (r == 0)
            this.client.send(JSON.stringify({name:this.state.name,type:"selectCard",card:x,row:r}));
        else
            this.client.send(JSON.stringify({name:this.state.name,type:"placeCard",card:x,row:r}));

    }

    clickButton(){
       // console.log("in click Button "+JSON.stringify({name:this.state.name,type:"startingGame"}));
        this.client.send(JSON.stringify({name:this.state.name,type:"startingGame"}));
    }
    componentDidMount(){
        this.connectToServer();

        VrSoundEffects.load(asset('mooing.mp3'));
    }

    connectToServer() {
        let W3CWebSocket = require('websocket').w3cwebsocket;


        let name = this.props.name;
        this.setState({name:name});
      //  let client = new W3CWebSocket('ws://localhost:9081/', 'echo-protocol');
        let client = null;
       // if (process.env.PORT ) {
       //     console.log("DAMP_SHORE");
            client = new W3CWebSocket('wss://damp-shore-50226.herokuapp.com/', 'echo-protocol');
        // }else {
        //     console.log("LOOCAL_HOST");
        //     client = new W3CWebSocket('ws://localhost:9081/', 'echo-protocol');
        // }
        this.client = client
        client.onerror = function () {
            console.log('Connection Error');
        };


        client.onmessage = function (x) {
            let packet = JSON.parse(x.data);
            if(packet.messageType === "dupUser"){
                client.close();
                _this.props.retryLogin();
                return;
            }
            console.log("mt="+ packet.messageType);
            if(packet.messageType === "mooSound"){
                console.log("mt2="+ packet.messageType);
                VrSoundEffects.play(asset('mooing.mp3'));
            }
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
                                 playAgain={this.connectToServer.bind(this)}
                                 clickButton={this.clickButton.bind(this)}/>

            </View>
        )
    }
}

module.exports = TakeSixLayout;
