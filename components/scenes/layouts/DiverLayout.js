import React from 'react';
import {
    View,
    Text,
    Cylinder
} from 'react-vr';

import {Easing} from 'react-native';

const {Choice} = require('./../../../utils/Choice.js');

import ChipColumn from './ChipColumn.js';
import DiversScore from './DiversScore.js';
;
import DiverDiceLayout from './DiverDiceLayout.js'




let _this = null;
choiceThis = null;
let choice = new Choice();




//Layout
class BocaLayout extends React.Component {

    constructor(props) {
        super(props);
        bocaThis = this;

        this.state = {
            diveData: {
                round:1,
                buttonText:"Start",
                buttonText2:"",
                oxygen:24,
                msg:" the start msg",
                players:[
                    {name:"Larry",
                        score:0,
                        treasure:[{name:"",
                            type:'C',
                            color:"#2dcded",
                            value:3,
                            size:.5},
                            {name:"",
                            type:'C',
                            color:"#2dcded",
                            value:3,
                            size:.5}],
                        position: -1,
                        direction:"Down"},
                    {name:"Barry",
                        score:0,
                        treasure:[],
                        position: -1,
                        direction:"Down"},
                    {name:"Edmun",
                        score:0,
                        treasure:[],
                        position: -1,
                        direction:"Down"},
                    {name:"Eric",
                        score:0,
                        treasure:1,
                        position: -1,
                        direction:"Down"},
                    {name:"Rich",
                        score:0,
                        treasure:[],
                        position: -1,
                        direction:"Down"},
                    {name:"Sarah",
                        score:20,
                        treasure:[],
                        position: -1,
                        direction:"Down"},
                ],
                chips:[
                    {name:"",
                        type:'C',
                        color:"#2dcded",
                        value:3,
                        size:.5},
                    {name:"",
                        type:'F',
                        color:"#2dcded",
                        value:3,
                        size:.5},
                    {name:"",
                        type:'C',
                        color:"#2dcded",
                        value:3,
                        size:.5},
                    {name:"",
                        type:'C',
                        color:"#2dcded",
                        value:3,
                        size:.5},
                    {name:"",
                        type:'C',
                        color:"#2dcded",
                        value:3,
                        size:.5},
                    {name:"",
                        type:'C',
                        color:"#2dcded",
                        value:3,
                        size:.5},
                    {name:"",
                        type:'C',
                        color:"#2dcded",
                        value:3,
                        size:.5},
                    {name:"",
                        type:'C',
                        color:"#2dcded",
                        value:3,
                        size:.5},

                    {name:"",
                        type:'C',
                        color:"#40aed6",
                        value:3,
                        size:.6},
                    {name:"",
                        type:'C',
                        color:"#40aed6",
                        value:3,
                        size:.6},
                    {name:"",
                        type:'C',
                        color:"#40a3d6",
                        value:3,
                        size:.6},
                    {name:"",
                        type:'C',
                        color:"#40aed6",
                        value:3,
                        size:.6},
                    {name:"",
                        type:'C',
                        color:"#40aed6",
                        value:3,
                        size:.6},
                    {name:"",
                        type:'C',
                        color:"#40aed6",
                        value:3,
                        size:.6},
                    {name:"",
                        type:'C',
                        color:"#40aed6",
                        value:3,
                        size:.6},
                    {name:"",
                        type:'C',
                        color:"#40aed6",
                        value:3,
                        size:.6},

                    {name:"",
                        type:'C',
                        color:"#3c7da3",
                        value:3,
                        size:.7},
                    {name:"",
                        type:'C',
                        color:"#3c7da3",
                        value:3,
                        size:.7},
                    {name:"",
                        type:'C',
                        color:"#3c7da3",
                        value:3,
                        size:.7},
                    {name:"",
                        type:'C',
                        color:"#3c7da3",
                        value:3,
                        size:.7},
                    {name:"",
                        type:'C',
                        color:"#3c7da3",
                        value:3,
                        size:.7},
                    {name:"",
                        type:'C',
                        color:"#3c7da3",
                        value:3,
                        size:.7},
                    {name:"",
                        type:'C',
                        color:"#3c7da3",
                        value:3,
                        size:.7},
                    {name:"",
                        type:'F',
                        color:"#3c7da3",
                        value:3,
                        size:.7},

                    {name:"",
                        type:'C',
                        color:"#406280",
                        value:3,
                        size:.8},
                    {name:"",
                        type:'C',
                        color:"#406280",
                        value:3,
                        size:.8},
                    {name:"",
                        type:'C',
                        color:"#406280",
                        value:3,
                        size:.8},
                    {name:"",
                        type:'C',
                        color:"#406280",
                        value:3,
                        size:.8},
                    {name:"",
                        type:'C',
                        color:"#406280",
                        value:3,
                        size:.8},
                    {name:"",
                        type:'C',
                        color:"#406280",
                        value:3,
                        size:.8},
                    {name:"",
                        type:'C',
                        color:"#406280",
                        value:3,
                        size:.8},
                    {name:"",
                        type:'C',
                        color:"#406280",
                        value:3,
                        size:.8}
                ]
            },
            bocaData:  this.props.bocaData,

            zorder: this.props.zorder,
            di:0,
            qty:0

        }
        ;

    }

    componentDidMount() {
        this.props.chgImg();
    }

    roll(dice,di) {
        if(this.state.bocaData.buttonText ==  "Confirm"){
            this.state.bocaData.buttonText = "";
            this.state.bocaData.message = "Continue to next player";
            this.setState({bocaData: this.state.bocaData});
            this.props.sendBocaMessage({
                name: this.props.player, type: "rollBocaDice",
                dice: dice, selectedDice: di,
                fld:this.state.bocaData.fieldPlayers[dice[di]-1],
                qty:this.state.qty
            });
        } else {
            this.state.bocaData.buttonText = "";
            this.state.bocaData.message = "Select a dice and then press Confirm";
            this.setState({bocaData: this.state.bocaData});
            this.props.sendBocaMessage({
                name: this.props.player, type: "rollBocaDice",
                dice: dice, selectedDice: -1
            });
        }
    }

    foo(){

    }



    getMessage() {
        if (this.props.bocaData == undefined)
            return "Press Roll";
        let m = this.props.bocaData.message;
        if (m != null) {
            return m;
        }
        return "Press Roll";
    }
    setDice(dice,sel){
        this.refs.cdl.setDice(dice,sel);

    }
    resetDice(){
        this.refs.cdl.resetDice();

    }

    setData(d){
        this.setState({bocaData:d});

    }
    canClick(){
        return (this.state.bocaData.buttonText.length == 0 || this.state.bocaData.buttonText =="Confirm")&&
            this.props.player == this.state.bocaData.currentPlayer;
    }
    canShow(){
        return this.state.bocaData.buttonText.length>0 &&
            this.state.bocaData.buttonText !="Pass Dice" &&  this.state.bocaData.buttonText !="Finish" &&
            (this.state.bocaData.buttonText =="Start"||
            this.state.bocaData.buttonText =="Restart"||
            this.props.player == this.state.bocaData.currentPlayer)
    }
    selectDice(di, qty) {

        let cs = JSON.parse(JSON.stringify({colors: this.state.bocaData.ofieldColors}));
        let ps = JSON.parse(JSON.stringify({players: this.state.bocaData.ofieldPlayers}));

        this.state.bocaData.fieldColors = cs.colors;
        this.state.bocaData.fieldColors[di - 1] = "gray";

        this.state.bocaData.fieldPlayers = ps.players;
        let fplayers = this.state.bocaData.fieldPlayers[di - 1];
        let addPlayer = true;
        let tot = 0;

        for (let i = 0; i < fplayers.length; i++) {
            if (fplayers[i].name == this.state.bocaData.currentPlayer) {
                tot = fplayers[i].value = fplayers[i].value + qty;
                addPlayer = false;
            }
        }
        if (addPlayer) {
            tot = qty;
            fplayers.push({
                color: "black",
                name: this.state.bocaData.currentPlayer,
                value: qty
            });
        }
        fplayers = fplayers.sort(this.compare);
        this.state.bocaData.buttonText="Confirm";
        this.props.bocaData.message = "You clicked on the "+di+" die, you now have " + tot +
            " die on the " +di+".";
        this.setState({bocaData:this.state.bocaData,di:di,qty:qty});
        this.setState({bocaData:this.state.bocaData,di:di,qty:qty});


    }
    compare(a, b) {
        return (a.value - b.value) * -1;
    }

    render() {

        return (
            <View>


                <View style={{
                    height: 2,
                    width: 5,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    layoutOrigin: [1, 0],
                    transform: [
                        {translateX: 0},
                        {rotateY: .7},
                        {translateZ: this.state.zorder}]
                }}>
                    <DiversScore
                                data={this.state.diveData}/>
                    <DiverDiceLayout  ref="cdl"
                                      msg={this.state.diveData.msg}
                                       sendMessage={this.foo}
                                       showButton={this.state.diveData.buttonText.length>0}
                                      showButton2={this.state.diveData.buttonText2.length>0}
                                       buttonText={this.state.diveData.buttonText}
                                      buttonText2={this.state.diveData.buttonText}
                                       num={2}
                                       init={['B', 'O']}
                                       roll={this.foo.bind(this)}
                                       player={"larry"}
                                       playAgain={this.props.foo}/>

                    <ChipColumn topX={true} bottomX={false}
                                data={this.state.diveData.chips.slice(0,8).reverse()}/>
                    <ChipColumn topX={false} bottomX={true}  data={this.state.diveData.chips.slice(8,16)}/>
                    <ChipColumn topX={true} bottomX={false}
                                data={this.state.diveData.chips.slice(16,24).reverse()}/>
                    <ChipColumn topX={false} bottomX={false}  data={this.state.diveData.chips.slice(24)}/>



                </View>


            </View>
        )
    }
}

module
    .exports = BocaLayout;
