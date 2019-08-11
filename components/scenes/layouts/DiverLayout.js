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
import DiversTreasure from './DiversTreasure.js';
import DiverDiceLayout from './DiverDiceLayout.js'





//Layout
class DiverLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            diverData:  this.props.diverData,
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
            this.props.sendDiverMessage({
                name: this.props.player, type: "rollBocaDice",
                dice: dice, selectedDice: di,
                fld:this.state.bocaData.fieldPlayers[dice[di]-1],
                qty:this.state.qty
            });
        } else {
            this.state.bocaData.buttonText = "";
            this.state.bocaData.message = "Select a dice and then press Confirm";
            this.setState({bocaData: this.state.bocaData});
            this.props.sendDiverMessage({
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
        this.setState({diverData:d});

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

        let show = true;
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
                    <DiversScore data={this.state.diverData}/>

                    <DiverDiceLayout  ref="cdl"
                                      msg={this.state.diverData.message}
                                       sendMessage={this.props.sendDiverMessage}
                                       showButton={this.state.diverData.buttonText.length>0}
                                      showButton2={this.state.diverData.buttonText2.length>0}
                                       buttonText={this.state.diverData.buttonText}
                                      buttonText2={this.state.diverData.buttonText2}
                                       num={2}
                                       init={['D', 'D']}
                                       roll={this.foo.bind(this)}
                                       player={this.props.player}
                                       playAgain={this.props.playAgain}/>
                    { show ? (<DiversTreasure data={this.state.diverData}/>): (<Text></Text>)}

                    <ChipColumn topX={true} bottomX={false} data={this.state.diverData.chips.slice(0,8).reverse()}/>

                    <ChipColumn topX={false} bottomX={true}  data={this.state.diverData.chips.slice(8,16)}/>
                    <ChipColumn topX={true} bottomX={false} data={this.state.diverData.chips.slice(16,24).reverse()}/>

                    <ChipColumn topX={false} bottomX={false}  data={this.state.diverData.chips.slice(24)}/>

                </View>


            </View>
        )
    }
}

module
    .exports = DiverLayout;
