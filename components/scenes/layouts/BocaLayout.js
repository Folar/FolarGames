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
            choiceShowButton:
                true,
            choiceButtonText:
                "Roll!!!",

        }
        ;

    }

    componentDidMount() {

    }

    roll(dice) {
        this.state.bocaData.buttonText="";
        this.setState({bocaData:this.state.bocaData});
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


    setData(d){
        debugger;
        this.setState({bocaData:d});

    }
    canShow(){
        return this.state.bocaData.buttonText.length>0 && (this.state.bocaData.buttonText =="Start"||
            this.props.player == this.state.bocaData.currentPlayer)
    }
    selectDice(di, qty) {


        //this.refs.cdl.setDice([1,2,33,4,5,6,6,7]);
        let cs = JSON.parse(JSON.stringify({colors: this.state.bocaData.ofieldColors}))
        let ps = JSON.parse(JSON.stringify({players: this.state.bocaData.ofieldPlayers}));

        this.state.bocaData.fieldColors = cs.colors;
        this.state.bocaData.fieldColors[di - 1] = "gray";

        this.state.bocaData.fieldPlayers = ps.players;
        let fplayers = this.state.bocaData.fieldPlayers[di - 1];
        let addPlayer = true;

        for (let i = 0; i < fplayers.length; i++) {
            if (fplayers[i].name == this.state.bocaData.currentPlayer) {
                fplayers[i].value = fplayers[i].value + qty;
                addPlayer = false;
            }
        }
        if (addPlayer)

            fplayers.push({
                color: "black",
                name: this.state.bocaData.currentPlayer,
                value: qty
            })
        fplayers.sort(this.compare)
        this.state.bocaData.buttonText="Confirm";
        this.setState({bocaData:this.state.bocaData});
        this.setState({
            bocaData: this.state.bocaData
        });

    }

    render() {
        debugger;
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
                                       num={this.props.bocaData.players[this.props.bocaData.currentIndex].diceLeft}
                                      init={['B', 'O', 'C', 'A', 'D', 'I', 'C', 'E']}
                                      clickable={true} selectDice={this.selectDice.bind(this)}
                                       game={"boca"}
                                       roll={this.roll.bind(this)}
                                       player={this.props.player}/>

                    <View style={{
                        height: 1,
                        width: 5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        <BocaFieldsLayout bocaData={this.state.bocaData}/>
                        <BocaTextScoreLayout message={this.getMessage()} bocaData={this.state.bocaData}
                                             player={this.props.player}/>


                    </View>


                </View>


            </View>
        )
    }
}

module
    .exports = BocaLayout;
