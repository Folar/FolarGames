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
import BocaLayout from './BocaLayout.js';

//Layout
let key = 0;
takeSixThis = null;
choiceThis = null;
let _this = null;
let fp = {
    players: [


        [],
        [],
        [],
        [],
        [],
        []
    ]
}
let mon = {
    money: [
        [
        ],
        [

        ],
        [


        ],
        [

        ],
        [
        ],
        [
        ]
    ]
}
class GamesLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            name: "Click keys to spell your name and then press Play",
            loginScene: 1,
            txtclr: "#444444",
            data: {},
            choiceData: {},
            bocaData: {
                players: [
                    {
                        name: 'Larry',
                        money: 0,
                        diceLeft: 8
                    }],
                ofieldColors: ["yellow", "cyan", "pink", "green", "orange", "#b19cd9"],
                fieldColors: ["yellow", "cyan", "pink", "green", "orange", "#b19cd9"],
                money: mon.money,
                ofieldPlayers: fp.players,
                fieldPlayers: fp.players,
                currentPlayer: "L",
                currentIndex: 0,
                round: 1,
                buttonText:"Start",
                buttonShow:true,
                dice:[],
                diceNum:8,
                totalDice:0,
                selectedDice :0,
                startIndex:0
            },
            choiceShowButton: true,
            choiceButtonText: "Roll!!!",
            takeSixTranslate: [0, 0, 0],
            //takeSixRoate:0,
            //takeSixTranslate:[-3 ,.95,-2.7],   // z,y,x(less moves to left)
            takeSixRotate: 90,
            showButton: false,
            admin: false,
            fakeadmin: false
        };

        _this = takeSixThis = choiceThis = bocaThis = this;
        this.client = null;

    }


    signon(n, gameType) {

        _this.setState({loginScene: gameType});
        if (gameType != 3) {
            if (this.state.name.startsWith("Click ") || this.state.name.endsWith(" name")) {
                if (n == "Aml2") {
                    this.state.admin = true;
                    n = "Law";
                } else if (n == "Aml") {
                    this.state.admin = true;
                    n = "Larry";
                }

                this.state.name = n;
                this.connectToServer(gameType);
            }
        }
    }

    retryLogin() {
        let x = this.state.name;
        this.state.txtclr = "red";
        this.state.name = x + " has already signed on, choose another name";


    }
    playAgain2() {
        this.client.close();
        this.connectToServer(4);
    }
    playAgain() {
        this.client.close();
        this.connectToServer(2);
    }

    clickButton(reset) {
        // console.log("in click Button "+JSON.stringify({name:this.state.name,type:"startingGame"}));
        if (reset)
            this.client.send(JSON.stringify({name: this.state.name, type: "restartTake6"}));
        else
            this.client.send(JSON.stringify({name: this.state.name, type: "startingGame"}));
    }

    pickCard(x, r) {
        if (r == 0)
            this.client.send(JSON.stringify({name: this.state.name, type: "selectCard", card: x, row: r}));
        else
            this.client.send(JSON.stringify({name: this.state.name, type: "placeCard", card: x, row: r}));

    }

    sendBocaMessage(d){
        this.client.send(JSON.stringify(d));

    }

    roll(dice) {
        this.client.send(JSON.stringify({
            name: this.state.name, type: "choiceRoll", dice: dice,
            buttonText: this.state.choiceButtonText
        }));

    }

    chooseDicePair(rank, pos, gaitor) {
        this.client.send(JSON.stringify({
            name: this.state.name,
            type: "choosePairs",
            rank: rank,
            pos: pos,
            gaitor: gaitor
        }));
    }

    componentDidMount() {
        VrSoundEffects.load(asset('mooing.mp3'));
        VrSoundEffects.load(asset('dice.wav'));
    }

    playMoo() {
        VrSoundEffects.play(asset('mooing.mp3'));
    }

    connectToServer(gt) {
        let W3CWebSocket = require('websocket').w3cwebsocket;

        console.log("start of connect to server ");
        let name = this.state.name;
        this.setState({name: name});
        if (this.client)
            this.client.close();

        client = new W3CWebSocket('wss://damp-shore-50226.herokuapp.com/', 'echo-protocol');
       // client = new W3CWebSocket('ws://localhost:9081/', 'echo-protocol');

        this.client = client
        client.onerror = function () {
            console.log('Connection Error');
        };


        client.onmessage = function (x) {
           // debugger;
            let packet = JSON.parse(x.data);
            if (packet.messageType === "choosePair") {
                choiceThis.setState({choiceData: packet.data});

                _this.setState({choiceShowButton: packet.data.gameState != 1});
                if (packet.data.gameState == 0) {
                    _this.setState({choiceButtonText: "Roll!!!"});
                } else {
                    _this.setState({choiceButtonText: "Confirm"});
                }
                return;
            }
            if (packet.messageType === "dupUser") {
                let x = _this.state.name;
                _this.setState({name: x + " has already signed on, choose another name", txtclr: "red"});
                _this.setState({loginScene:1})
                client.close();
                key++;
                _this.forceUpdate();
                return;
            }

            if (packet.messageType === "mooSound") {
                VrSoundEffects.play(asset('mooing.mp3'));
            }

            if (gt == 2) {
                takeSixThis.setState({data: packet});
                takeSixThis.setState({showButton: packet.state < 2})
            } else {
                if (packet.type === "rollDice") {
                    _this.refs.bl.setDice( packet.dice,packet.selectedDice);
                }else if (packet.type === "passDice" || packet.type === "Restart") {
                    _this.refs.bl.resetDice( packet.dice,packet.selectedDice);
                }
                _this.setState({bocaData: packet});
                _this.refs.bl.setData( packet);

            }


        };

        client.onopen = function () {
            console.log('WebSocket Client Connected');

            function sendMessage() {
                if (client.readyState === client.OPEN) {

                    client.send(JSON.stringify({name: name, type: "newUser", gameType: gt}));

                }
            }

            sendMessage();
        };

    }




    render() {
        const login = this.state.loginScene;

        return (
            <View>{
                login == 1 ? (
                    <LoginLayout zorder={-3} showButton={false} t={this} txtclr={this.state.txtclr}
                                 signon={this.signon.bind(this)}
                                 msg={this.state.name} key={key}
                                 text={"Play"}/>
                ) : login == 2 ? (
                    <View>

                        <TakeSixLayout zorder={-4} showButton={this.state.showButton} name={this.state.name}
                                       client={this.client}
                                       pickCard={this.pickCard.bind(this)} data={this.state.data}
                                       admin={this.state.admin}
                                       fakeadmin={this.state.fakeadmin} playMoo={this.playMoo.bind(this)}
                                       translate={this.state.takeSixTranslate} rotate={this.state.takeSixRotate}
                                       clickButton={this.clickButton.bind(this)} playAgain={this.playAgain.bind(this)}
                                       text={"Play"}/>

                    </View>
                ) : login == 3 ? (
                    <View>
                        <ChoiceLayout zorder={-3} showButton={true} text={"Play"} roll={this.roll.bind(this)}
                                      choiceData={choiceThis.state.choiceData}
                                      choiceShowButton={this.state.choiceShowButton}
                                      choiceButtonText={this.state.choiceButtonText}
                                      chooseDicePair={this.chooseDicePair.bind(this)}/>
                    </View>
                ) : (
                    <View>
                        <BocaLayout zorder={-3} showButton={true} text={"Play"}
                                    roll={this.roll.bind(this)}
                                    bocaData={this.state.bocaData}
                                    ref="bl"
                                    sendBocaMessage={this.sendBocaMessage.bind(this)}
                                    player={this.state.name}
                                    playAgain={this.playAgain2.bind(this)}/>
                    </View>
                )
            }

            </View>
        )
    }
}

module.exports = GamesLayout;
