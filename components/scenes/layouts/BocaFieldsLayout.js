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
            choiceData: this.props.choiceData
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
                    <BocaField value="One" backgroundColor="yellow"/>
                    <BocaField value="Two" backgroundColor="cyan"/>
                    <BocaField value="Three" backgroundColor="pink"/>
                    <BocaField value="Four" backgroundColor="green"/>
                    <BocaField value="Five" backgroundColor="orange"/>
                    <BocaField value="Six" backgroundColor="#b19cd9"/>






                </View>


            </View>
        )
    }
}

module.exports = BocaFieldsLayout;
