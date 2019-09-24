import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

const {Choice} = require('./../../../utils/Choice.js');
import BocaTextScoreLayout from './BocaTextScoreLayout.js';
import ChoiceDiceLayout from './ChoiceDiceLayout.js'
import BocaFieldsLayout from './BocaFieldsLayout.js';


let _this = null;
choiceThis = null;
let choice = new Choice();




//Layout
class BocaLayout extends React.Component {

    constructor(props) {
        super(props);
        bocaThis = this;

        this.state = {
            choiceData: {},
            bocaData:  this.props.bocaData,

            zorder: this.props.zorder,
            di:0,
            qty:0

        }
        ;

    }

    componentDidMount() {

    }

    roll(dice,di) {
        if(this.state.bocaData.buttonText ==  "Confirm"){
            this.state.bocaData.buttonText = "";
            this.state.bocaData.message = "Continue to next player";
            this.setState({bocaData: this.state.bocaData});
            this.props.sendBocaMessage({
                name: this.props.player, action: "rollBocaDice",type:"BOCA",
                dice: dice, selectedDice: di,
                fld:this.state.bocaData.fieldPlayers[dice[di]-1],
                qty:this.state.qty
            });
        } else {
            this.state.bocaData.buttonText = "";
            this.state.bocaData.message = "Select a dice and then press Confirm";
            this.setState({bocaData: this.state.bocaData});
            this.props.sendBocaMessage({
                name: this.props.player, action: "rollBocaDice",type:"BOCA",
                dice: dice, selectedDice: -1
            });
        }
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
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    layoutOrigin: [.5, .8],
                    transform: [
                        {translateX: 0},
                        {translateZ: this.state.zorder}]
                }}>
                    <ChoiceDiceLayout  ref="cdl"  style={{marginBottom: .2}}
                                       sendMessage={this.props.sendBocaMessage}
                                      choiceShowButton={this.canShow()}
                                      choiceButtonText={this.state.bocaData.buttonText}
                                       num={this.props.bocaData.diceNum}
                                      init={['B', 'O', 'C', 'A', 'D', 'I', 'C', 'E']}
                                      clickable={this.canClick()} selectDice={this.selectDice.bind(this)}
                                       game={"boca"}
                                       roll={this.roll.bind(this)}
                                       player={this.props.player}
                                       playAgain={this.props.playAgain}/>

                    <View style={{
                        height: 1,
                        width: 5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        <BocaFieldsLayout bocaData={this.state.bocaData}/>
                        <BocaTextScoreLayout message={this.getMessage()} bocaData={this.state.bocaData}
                                             player={this.props.player} />


                    </View>


                </View>


            </View>
        )
    }
}

module
    .exports = BocaLayout;
