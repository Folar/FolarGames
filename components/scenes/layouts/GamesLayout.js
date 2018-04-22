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
import ChoiceLayout from './ChoiceLayout.js';

//Layout
let key = 0;
takeSixThis = null;
choiceThis = null;
let _this = null;
class GamesLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            name: "Click keys to spell your name and then press Play",
            loginScene: true,
            txtclr: "#444444",
            data:{},
            choiceData:{},
            //takeSixTranslate:[0,0,0],
            //takeSixRoate:0,
            takeSixTranslate:[-3 ,.95,-2.7],   // z,y,x(less moves to left)
            takeSixRotate:90,
            showButton:false
        };

        _this = takeSixThis = choiceThis = this;
        this.client = null;

    }


    signon(n) {

        this.state.name = n;


        this.connectToServer();
    }

    retryLogin() {
        let x = this.state.name;
        this.state.txtclr = "red";
        this.state.name = x + " has already signed on, choose another name";


    }
    playAgain(){
        this.client.close();
        this.connectToServer();
    }

    clickButton() {
        // console.log("in click Button "+JSON.stringify({name:this.state.name,type:"startingGame"}));
        this.client.send(JSON.stringify({name: this.state.name, type: "startingGame"}));
    }
    pickCard(x,r){
        if (r == 0)
            this.client.send(JSON.stringify({name:this.state.name,type:"selectCard",card:x,row:r}));
        else
            this.client.send(JSON.stringify({name:this.state.name,type:"placeCard",card:x,row:r}));

    }
    roll(dice){
            this.client.send(JSON.stringify({name:this.state.name,type:"choiceRoll",dice:dice}));

    }
    chooseDicePair(rank,pos){
        this.client.send(JSON.stringify({name:this.state.name,type:"choosePairs",rank:rank,pos:pos}));
    }
    componentDidMount() {
        VrSoundEffects.load(asset('mooing.mp3'));
        VrSoundEffects.load(asset('dice.wav'));
    }

    connectToServer() {
        let W3CWebSocket = require('websocket').w3cwebsocket;

        console.log("start of connect to server ");
        let name = this.state.name;
        this.setState({name: name});
        if (this.client)
            this.client.close();

            //client = new W3CWebSocket('wss://damp-shore-50226.herokuapp.com/', 'echo-protocol');
            client = new W3CWebSocket('ws://localhost:9081/', 'echo-protocol');

        this.client = client
        client.onerror = function () {
            console.log('Connection Error');
        };


        client.onmessage = function (x) {
            let packet = JSON.parse(x.data);
            if (packet.messageType === "choosePair") {
                choiceThis.setState({choiceData: packet.data});
                _this.forceUpdate();
                return;
            }
            if (packet.messageType === "dupUser") {
                let x = _this.state.name;
                _this.setState({name:x + " has already signed on, choose another name",txtclr : "red"});
                client.close();
                key++;
                _this.forceUpdate();
                return;
            }

            _this.setState({loginScene : false})
            if (packet.messageType === "mooSound") {
                VrSoundEffects.play(asset('mooing.mp3'));
            }
            takeSixThis.setState({data: packet});

            takeSixThis.setState({showButton: packet.state < 2})


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
        const login =  this.state.loginScene;

        return (
            <View >{
                login ? (
                    <LoginLayout showButton={false} t={this} txtclr={this.state.txtclr} signon={this.signon.bind(this)}
                                 msg={this.state.name} key ={key}
                                 text={"Play"}/>
                ) : (
                    <View>
                        <ChoiceLayout showButton={true} text={"Play"} roll={this.roll.bind(this)}
                                      choiceData={choiceThis.state.choiceData}
                                      chooseDicePair={this.chooseDicePair.bind(this)}/>
                        <TakeSixLayout showButton={this.state.showButton} name={this.state.name} client={this.client}
                                   pickCard={this.pickCard.bind(this)} data={this.state.data}
                                   translate={this.state.takeSixTranslate} rotate ={this.state.takeSixRotate}
                                   clickButton={this.clickButton.bind(this)} playAgain={this.playAgain.bind(this)} text={"Play"}/>

                    </View>
                ) }

            </View>
        )
    }
}

module.exports = GamesLayout;
