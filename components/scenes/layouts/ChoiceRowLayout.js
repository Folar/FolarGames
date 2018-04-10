import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import Die from './elements/Die.js';

import Button from './elements/Button.js';
import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';
let _this = null;
//Layout
class ChoiceRowLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            showButton: true,
            die1: 2,
            die2: 5,
            die3: 2,
            die4: 1,
            die5: 6,
            numberOfRolls: 0

        }
    }

    componentDidMount() {

    }


    roll() {
        _this.setState({die1: Math.floor(Math.random() * 6) + 1});
        _this.setState({die2: Math.floor(Math.random() * 6) + 1});
        _this.setState({die3: Math.floor(Math.random() * 6) + 1});
        _this.setState({die4: Math.floor(Math.random() * 6) + 1});
        _this.setState({die5: Math.floor(Math.random() * 6) + 1});
        if (_this.state.numberOfRolls < 6) {
            _this.setState({numberOfRolls: 1 + _this.state.numberOfRolls});
            setTimeout(_this.roll, 100);
        }
    }

    invoke() {
        VrSoundEffects.play(asset('dice.wav'));
        _this = this;
        _this.setState({numberOfRolls: 1});
        setTimeout(_this.roll, 10);

    }


    render() {
        let checkDim = {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .01};
        let checkDimGap = {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .06};
        let rankDim = {height: .12, width: .24, valueFont: .06, dieFont: .09, marginRight: .02};
        let valueDim = {height: .12, width: .36, valueFont: .06, dieFont: .09, marginRight: .08};


        return (
            <View>


                <View style={{
                    margin: 0.01,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    layoutOrigin: [0, 0],
                    transform: [
                        {translateX: 0},
                        {translateZ: 0}
                    ]
                }}>
                    <Die value={this.props.rank} dim={rankDim} color="black" backgroundColor="white"/>
                    <Die value={this.props.value} dim={valueDim} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDimGap} color="black" backgroundColor="white"/>

                    <Die value="" dim={checkDimGap} color="black" backgroundColor="white"/>

                    <Die value="" dim={checkDim} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDimGap} color="black" backgroundColor="white"/>

                    <Die value={this.props.score} dim={valueDim} color="black" backgroundColor="white"/>

                </View>


            </View>



        )
    }
}

module.exports = ChoiceRowLayout;
