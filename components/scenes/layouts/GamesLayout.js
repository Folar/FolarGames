import React from 'react';
import {
    View,
    Animated,
    Text,
    asset,
    VrSoundEffects
} from 'react-vr';

import {Easing} from 'react-native';


import TakeSixLayout from './TakeSixLayout.js';
import LoginLayout from './LoginLayout.js';

//Layout
_this = null;
class GamesLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            name: "Click keys to spell your name and then press Play",
            loginScene: true,
            txtclr: "#444444"
        };

        _this = this;
        this.client = null;

    }


    signon(n) {

        this.state.name = n;


        this.state.loginScene = this.connectToServer();
        console.log("in  signon 3333" + n + "state =  " + JSON.stringify(this.state));
    }

    retryLogin() {
        let x = this.state.name;
        this.state.txtclr = "red";
        this.state.name = x + " has already signed on, choose another name";


    }

    clickButton() {
        // console.log("in click Button "+JSON.stringify({name:this.state.name,type:"startingGame"}));
        this.client.send(JSON.stringify({name: this.state.name, type: "startingGame"}));
    }

    componentDidMount() {


        VrSoundEffects.load(asset('mooing.mp3'));
    }

    connectToServer() {
        let W3CWebSocket = require('websocket').w3cwebsocket;


        let name = this.state.name;
        console.log("in  conecttoserveer " + name);
        this.setState({name: name});
        let client = null;
        if (process.env.PORT) {
            console.log("DAMP_SHORE");
            client = new W3CWebSocket('wss://damp-shore-50226.herokuapp.com/', 'echo-protocol');
        } else {
            console.log("LOCAL-HOST");
            client = new W3CWebSocket('ws://localhost:9081/', 'echo-protocol');
        }
        this.client = client
        client.onerror = function () {
            console.log('Connection Error');
        };


        client.onmessage = function (x) {
            let packet = JSON.parse(x.data);
            if (packet.messageType === "dupUser") {
                let x = _this.state.name;
                _this.setState({name:x + " has already signed on, choose another name"});
                _this.setState({txtclr : "red"});
                console.log("KKKKKK "+_this.state.txtclr)
                client.close();
                return true;
            }
            if (packet.messageType === "mooSound") {
                VrSoundEffects.play(asset('mooing.mp3'));
            }
            _this.setState({data: packet});

            _this.setState({showButton: packet.state < 2})
        };

        client.onopen = function () {
            console.log('WebSocket Client Connected');

            function sendMessage() {
                if (client.readyState === client.OPEN) {

                    client.send(JSON.stringify({name: name, type: "newUser"}));

                }
            }

            sendMessage();
        };


    }


    render() {

        const login = this.state.loginScene;
        return (
            <View style={{
                marginLeft: .1,
                width: 5,
                height: 1.4,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
            }}>{
                login ? (
                    <LoginLayout showButton={false} t={this} txtclr={this.state.txtclr} signon={this.signon.bind(this)}
                                 msg={this.state.name}
                                 text={"Play"}/>
                ) : (
                    <TakeSixLayout showButton={false} name={this.state.name} client={this.client}
                                   text={"Play"}/>
                ) }

            </View>
        )
    }
}

module.exports = GamesLayout;
