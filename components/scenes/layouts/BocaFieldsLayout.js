import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import BocaField from './elements/BocaField.js';
import ChoiceRowLayout from './ChoiceRowLayout.js';
import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';

//Layout
class BocaFieldsLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showButton: true,
            choiceData: this.props.choiceData,
            bocaData: this.props.bocaData
        }
    }

    componentDidMount() {

    }

    getValue(v) {
        if (v == 2 || v == 12)
            return 100;
        return 30 + 10 * Math.abs(7 - v)


    }

    getScore(row) {
        if (this.props.choiceData && this.props.choiceData.diceData) {
            return this.props.choiceData.diceData[row].score;
        }
        return "0"
    }

    getTotalScore() {
        if (this.props.choiceData && this.props.choiceData.totalScore) {
            return this.props.choiceData.totalScore;
        }
        return "0"
    }


    render() {
        let vals = ["One","Two","Three","Four","Five","Six"]
        let fieldData =
            vals.map((item, index) => {
                return
                <BocaField value={vals[index]} backgroundColor={this.state.bocaData.fieldColors[index]}
                           money={this.state.bocaData.money[index]}
                                 players={this.state.bocaData.fieldPlayers[index]}/>

            });
        return (

            <View>



                <View style={{
                    margin: 0.01,
                    marginTop: .05,
                    paddingLeft: .1,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}>
                    <BocaField value={vals[0]}
                               backgroundColor={this.state.bocaData.fieldColors[0]}
                               money={this.state.bocaData.money[0]}
                               players={this.state.bocaData.fieldPlayers[0]}/>

                    <BocaField value={vals[1]}
                               backgroundColor={this.state.bocaData.fieldColors[1]}
                               money={this.state.bocaData.money[1]}
                               players={this.state.bocaData.fieldPlayers[1]}/>
                    <BocaField value={vals[2]}
                                backgroundColor={this.state.bocaData.fieldColors[2]}
                                money={this.state.bocaData.money[2]}
                               players={this.state.bocaData.fieldPlayers[2]}/>

                    <BocaField value={vals[3]}
                                backgroundColor={this.state.bocaData.fieldColors[3]}
                                money={this.state.bocaData.money[3]}
                                players={this.state.bocaData.fieldPlayers[3]}/>
                    <BocaField value={vals[4]}
                               backgroundColor={this.state.bocaData.fieldColors[4]}
                               money={this.state.bocaData.money[4]}
                               players={this.state.bocaData.fieldPlayers[4]}/>
                    <BocaField value={vals[5]}
                               backgroundColor={this.state.bocaData.fieldColors[5]}
                               money={this.state.bocaData.money[5]}
                               players={this.state.bocaData.fieldPlayers[5]}/>







                </View>


            </View>
        )
    }
}

module.exports = BocaFieldsLayout;
