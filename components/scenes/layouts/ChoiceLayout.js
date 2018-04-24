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
let _this = null;
choiceThis = null;
let choice= new Choice();
//Layout
class ChoiceLayout extends React.Component {

    constructor(props) {
        super(props);
        choiceThis =this;
        this.state = {
            choiceData: {},
            choiceShowButton : true,
            choiceButtonText:"Roll!!!",

        };

    }

    componentDidMount() {

    }

    roll(dice){
        //this.client.send(JSON.stringify({name:this.state.name,type:"choiceRoll",dice:dice,
        //    buttonText:this.state.choiceButtonText}));
        if(this.state.choiceButtonText == "Confirm") {
            this.setState({choiceData: choice.confirm()});
            this.setState({choiceButtonText: "Roll!!!"});
        } else {
            this.setState({choiceData: choice.roll(dice)});
            this.setState({choiceShowButton: false});
        }
    }
    chooseDicePair(rank,pos,gaitor){
        //this.client.send(JSON.stringify({name:this.state.name,type:"choosePairs",rank:rank,pos:pos,gaitor:gaitor}));
        let s = choice.setSecondDieChoices(rank,pos,gaitor);
        this.setState({choiceShowButton: s.gameState != 1});
        if(s.gameState == 0){
            this.setState({choiceButtonText: "Roll!!!"});
        }else {
            this.setState({choiceButtonText: "Confirm"});
        }
        this.setState({choiceData:s});
    }


    render() {


        let nameList = ['Larry','Stu','Bob'].map((item, index) => {
            return <Text style={{color:"black"}} key={index} >{item}</Text>
        });
        return (
            <View>


                <View style={{
                    height:2,
                    width: 5,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    layoutOrigin: [.5, .8],
                    transform: [
                        {translateX: 0},
                        {translateZ: -3}]
                }}>
                    <ChoiceDiceLayout style={{marginBottom:.2}} roll={this.roll.bind(this)} choiceShowButton ={ this.state.choiceShowButton}
                                      choiceButtonText = {this.state.choiceButtonText}  />
                    <View style={{
                        height: 1,
                        width: 5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                         <ChoiceScoreLayout choiceData={this.state.choiceData}  chooseDicePair={this.chooseDicePair.bind(this)}/>
                         <ChoiceGaitLayout choiceData={this.state.choiceData}  chooseDicePair={this.chooseDicePair.bind(this)}/>
                        <View style={{
                            height: 3,
                            width: 1,
                            marginLeft:.04,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start'
                        }}>
                            {nameList}
                        </View>

                    </View>


                </View>


            </View>
        )
    }
}

module
    .exports = ChoiceLayout;
