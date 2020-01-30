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
import DiverLayout from './DiverLayout.js';
import ChoiceScore from './ChoiceScore.js'
import AcquireLayout from './AcquireLayout.js'
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
            zoom:-3,
            dtX:-2,
            dtY:0,
            diverData: {},
            acquireData:{
                state:0,
                currentIndex:0,
                currentPlayer:0,
                currentSwapPlayer:0,
                dlgType:0,
                messages:"",
                instructions:"",

                hotels :[
                    {
                        name: "Luxor",
                        color: "red",
                        available: 15,
                        size: 0,
                        price: 200
                    },
                    {
                        name: "Tower",
                        color: "yellow",
                        available: 22,
                        size: 4,
                        price: 400
                    },
                    {
                        name: "American",
                        color: "#8787ff",
                        available: 5,
                        size: 0,
                        price: 600
                    },
                    {
                        name: "Worldwide",
                        color: "#c3af91",
                        available: 12,
                        size: 33,
                        price: 1200
                    },
                    {
                        name: "Festival",
                        color: "green",
                        available: 25,
                        size: 2,
                        price: 300
                    },
                    {
                        name: "Continental",
                        color: "cyan",
                        available: 25,
                        size: 2,
                        price: 400
                    },
                    {
                        name: "Imperial",
                        color: "pink",
                        available: 25,
                        size: 0,
                        price: 0
                    }
                ],
                players :[{name:"",hotels:[],money:6000,playing:false}],
                stk : {
                    title: "Tower takeover or Luxor",
                    survivor: "Tower",
                    defunct: "Luxor",
                    keep: 10,
                    swap: 0,
                    sell: 0,
                    total: 10,
                    survivorColor: "yellow",
                    defunctColor: "red",
                    defunctPrice:200,
                    playerMoneyBase:3400,
                    playerSurvivorBase:3,
                    playerDefunctBase:10,
                    hotelAvailDefunctBase:15,
                    hotelAvailSurvivorBase:22,
                    info:"larry wins first and second bonu s for 3000 \n ydtdytkk lfyulkfuk xxxxx 7dytdjtdj tsrsy  trtrse zRgree \nify,j d ydtdjh \ndsgfhSRd hfszh hrzrdey rzey "
                },
                merger :{

                    title: "Choose Survivor and order of defunct hotels",
                    clickCount:0,
                    sourceIndex:0,
                    tempColor:"",
                    info:"Choose the hotel that you want to switch",
                    //info:"Select either hotel to switch the order",
                    //hotels:["Festival","Continental"],
                    //hotelColors:["green","cyan"],
                    hotels:["Festival","Continental","Luxor","Imperial"],
                    hotelColors:["green","cyan","red","pink"]
                },
                buy : {
                    hotels:["Luxor","Tower","American","Worldwide","Festival","Continental","Imperial"],
                    amt:[0,0,0,0,0,0,0],
                    title:"Buy up to three stocks",
                    hotelColors:["red","yellow","#8787ff","#c3af91","green","cyan","pink"],
                    playerBaseMoney:1100,
                    total:0,
                    info:"Cost $0"
                }
            },
            choiceData: {},
            gameData: {},
            bocaData: {},
            choiceShowButton: true,
            choiceButtonText: "Start",
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
        if (true) {
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
    playAgain6() {
        this.client.close();
        this.connectToServer(6);
    }
    playAgain5() {
        this.client.close();
        this.connectToServer(5);
    }
    playAgain3() {
        this.client.close();
        this.connectToServer(3);
    }
    playAgain4() {
        this.client.close();
        this.connectToServer(4);
    }
    playAgain2() {
        this.client.close();
        this.connectToServer(2);
    }

    clickButton(reset) {
        // console.log("in click Button "+JSON.stringify({name:this.state.name,type:"startingGame"}));
        if (reset)
            this.client.send(JSON.stringify({name: this.state.name, type: "restartTake6", action: "restartTake6"}));
        else
            this.client.send(JSON.stringify({name: this.state.name, type: "TAKE6", action: "startingGame"}));
    }

    pickCard(x, r) {
        if (r == 0)
            this.client.send(JSON.stringify({name: this.state.name,type: "TAKE6", action: "selectCard", card: x, row: r}));
        else
            this.client.send(JSON.stringify({name: this.state.name, type: "TAKE6", action: "placeCard", card: x, row: r}));

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

    zoom(z){
        this.setState({zoom:-5,
                        dtX:-2.5,dtY:-.4});
        //this.forceUpdate();
    }


    connectToServer(gt) {
        let W3CWebSocket = require('websocket').w3cwebsocket;

        console.log("start of connect to server ");
        let name = this.state.name;
        this.setState({name: name});
        if (this.client)
            this.client.close();

       // client = new W3CWebSocket('wss://damp-shore-50226.herokuapp.com/', 'echo-protocol');
       client = new W3CWebSocket('ws://localhost:9081/', 'echo-protocol');

        this.client = client
        client.onerror = function () {
            console.log('Connection Error');
        };


        client.onmessage = function (x) {

            let packet = JSON.parse(x.data);

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
            }else   if (gt ==  3 ) {
               if (packet.type == "Roll") {
                VrSoundEffects.play(asset('dice.wav'));
                   _this.refs.cl.rollDice(  packet.dice);
               }
               _this.setState({gameData: packet});
               _this.refs.cl.setData( packet);

           } else   if (gt == 4 ) {
                if (packet.type === "rollDice") {
                    _this.refs.bl.setDice( packet.dice,packet.selectedDice,packet.diceX,packet.selectedDiceX);
                }else if (packet.type === "passDice" || packet.type === "Restart") {
                    _this.refs.bl.resetDice( packet.dice,packet.selectedDice);
                }
                _this.setState({bocaData: packet});
                _this.refs.bl.setData( packet);

            } else   if (gt ==5 ) {
              if (packet.type === "rollDice") {
                  _this.refs.dl.setDice( packet.di1,packet.di2,packet.bonus);
              }else if (packet.type === "passDice" || packet.type === "Restart") {
                  _this.refs.dl.resetDice( packet.dice,-1);
              }

              _this.setState({diverData: packet});
              _this.refs.dl.setData( packet);

          } if (gt == 6) {
               _this.setState({acquireData: packet});
               _this.refs.acq.setData( packet);
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
        let adj = 2;
        if (login == 5 && this.state.zoom == -5)
            adj = 5;
        return (
            <View>{
                login == 1 ? (
                    <LoginLayout zorder={this.state.zoom-2} showButton={false} t={this} txtclr={this.state.txtclr}
                                 signon={this.signon.bind(this)}
                                 zoom={this.zoom.bind(this)}
                                 msg={this.state.name} key={key}
                                 text={"Play"}/>
                ) : login == 2 ? (
                    <View>

                        <TakeSixLayout zorder={this.state.zoom} showButton={this.state.showButton} name={this.state.name}
                                       client={this.client}
                                       pickCard={this.pickCard.bind(this)} data={this.state.data}
                                       admin={this.state.admin}
                                       fakeadmin={this.state.fakeadmin} playMoo={this.playMoo.bind(this)}
                                       translate={this.state.takeSixTranslate} rotate={this.state.takeSixRotate}
                                       clickButton={this.clickButton.bind(this)} playAgain={this.playAgain2.bind(this)}
                                       text={"Play"}/>

                    </View>
                ) : login == 3 ? (
                    <View>
                        <ChoiceLayout zorder={this.state.zoom -1} showButton={true} text={"Play"} roll={this.roll.bind(this)}
                                      zoom={this.zoom.bind(this)}
                                      ref="cl"
                                      sendMessage={this.sendBocaMessage.bind(this)}
                                      choiceData={this.state.choiceData}
                                      gameData={this.state.gameData}
                                      player={this.state.name}
                                      choiceShowButton={this.state.choiceShowButton}
                                      choiceButtonText={this.state.choiceButtonText}
                                      chooseDicePair={this.chooseDicePair.bind(this)}
                                      playAgain={this.playAgain3.bind(this)}/>
                    </View>
                ) :login == 4 ? (
                    <View>
                        <BocaLayout zorder={this.state.zoom} showButton={true} text={"Play"}
                                    roll={this.roll.bind(this)}
                                    bocaData={this.state.bocaData}
                                    ref="bl"
                                    sendBocaMessage={this.sendBocaMessage.bind(this)}
                                    player={this.state.name}
                                    playAgain={this.playAgain4.bind(this)}/>
                    </View>
                ) :login == 5 ? (
                   <View>
                       <DiverLayout zorder={this.state.zoom -adj} showButton={true} text={"Play"}
                                   roll={this.roll.bind(this)}
                                   diverData={this.state.diverData}
                                   dtX={this.state.dtX}
                                   dtY={this.state.dtY}
                                   ref="dl"
                                   chgImg={this.props.chgImg}
                                   sendDiverMessage={this.sendBocaMessage.bind(this)}
                                   player={this.state.name}
                                   playAgain={this.playAgain5.bind(this)}/>
                   </View>
               ): (
                   <View>
                        <AcquireLayout zorder={this.state.zoom} showButton={true} text={"Play"}
                               data={this.state.acquireData}
                               ref="acq"
                               sendmessage={this.sendBocaMessage.bind(this)}
                               name={this.state.name}
                               playAgain={this.playAgain6.bind(this)}/>
                   </View>
               )
            }

            </View>
        )
    }
}

module.exports = GamesLayout;
