import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

const {Choice} = require('./../../../utils/Choice.js');
import ChoiceGaitLayout from './ChoiceGaitLayout.js'
import ChoiceScoreLayout from './ChoiceScoreLayout.js';
import ChoiceDiceLayout from './ChoiceDiceLayout.js'


import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';
import ChoiceScore from "./ChoiceScore";

let _this = null;

let choice = new Choice();

//Layout
class ChoiceLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            choiceData: {},
            gameData:{},
            zorder: this.props.zorder,
            choiceShowButton: true,
            choiceButtonText: "Start",

        };

    }

    componentDidMount() {

    }

    reset(){
        choice.resetState();
        this.setState({choiceData:{} });
    }
    setData(d){
        this.setState({gameData:d, choiceShowButton:d.buttonText !="",choiceButtonText:d.buttonText});

    }

    confirm() {

            let gs = choice.confirm();
            if (gs.gameState == 3){
                this.state.gameData.message = gs.message;
            }
            this.setState({choiceData: gs,choiceShowButton:false});
            this.props.sendMessage({name: this.props.player, action: "confirm",type:"CHOICE",score:gs.totalScore,done:gs.gameState == 3});


    }
    markRoll(dice) {
        let state = choice.roll(dice);
        this.state.gameData.message = state.message;
        this.setState({choiceData: state});
        this.setState({choiceShowButton: false});
    }

    chooseDicePair(rank, pos, gaitor) {
        //this.client.send(JSON.stringify({name:this.state.name,type:"choosePairs",rank:rank,pos:pos,gaitor:gaitor}));
        let s = choice.setSecondDieChoices(rank, pos, gaitor);
        this.state.gameData.message = s.message;
        this.setState({choiceShowButton: s.gameState != 1});
        if (s.gameState == 0) {
            this.setState({choiceButtonText: "Roll!!!"});
        } else {
            this.setState({choiceButtonText: "Confirm"});
        }
        this.setState({choiceData: s});
    }

    getMessage() {
        if (this.state.gameData == null)
            return "Press Start";
        let m = this.state.gameData.message;
        if (m != null) {
            return m;
        }
        return "Press Roll";
    }
    rollDice(  dice){
        this.refs.cdl.rollDice(  dice.die1,dice.die2,dice.die3,dice.die4,dice.die5,choice);
    }

    render() {


        let nameList = [].map((item, index) => {
            return <Text style={{color: "black"}} key={index}>{item}</Text>
        });
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
                    <ChoiceDiceLayout style={{marginBottom: .2}} confirm={this.confirm.bind(this)}
                                      markRoll={this.markRoll.bind(this)}
                                      choiceShowButton={this.state.choiceShowButton}
                                      sendMessage={this.props.sendMessage}
                                      choiceButtonText={this.state.choiceButtonText} num={5} numX = {0}
                                      init={['F', 'O', 'L', 'A', 'R', 'A', 'C', 'K','!','!']}
                                      ref="cdl"
                                      playAgain={this.props.playAgain}
                                      player={this.props.player}
                                      reset ={this.reset.bind(this)}
                                      game={"choice"}
                                      clickable={false}/>
                    <View style={{
                        height: 1,
                        width: 5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        <ChoiceScoreLayout choiceData={this.state.choiceData}
                                           chooseDicePair={this.chooseDicePair.bind(this)}/>

                        <ChoiceGaitLayout message={this.getMessage()} choiceData={this.state.choiceData}
                                          gameData={this.state.gameData}
                                          chooseDicePair={this.chooseDicePair.bind(this)}/>
                        <View>
                            <ChoiceScore  data={this.props.gameData}/></View>

                        </View>


                </View>


            </View>
        )
    }
}

module
    .exports = ChoiceLayout;
