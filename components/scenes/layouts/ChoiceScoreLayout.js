import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import Die from './elements/Die.js';
import ChoiceRowLayout from './ChoiceRowLayout.js';
import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';
//Layout
class ChoiceScoreLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            showButton: true
        }
    }

    componentDidMount() {

    }


    render() {

        let negDim = {height: .12, width: .52, valueFont: .06, dieFont: .09, marginRight: .06};
        let checkDim = {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .01};
        let checkDimGap = {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .06};
        let scoreDim = {height: .12, width: .36, valueFont: .06, dieFont: .09, marginRight: .01};


        return (
            <View>


                <View style={{
                    margin: 0.01,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    layoutOrigin: [-.2, .6],
                    transform: [
                        {translateX: -2.5},
                        {translateZ: -3}
                    ]

                }}>
                    <ChoiceRowLayout rank="2" value="100" score="0"/>
                    <ChoiceRowLayout rank="3" value="70" score="0"/>
                    <ChoiceRowLayout rank="4" value="60" score="0"/>
                    <ChoiceRowLayout rank="5" value="50" score="0"/>
                    <ChoiceRowLayout rank="6" value="40" score="0"/>
                    <ChoiceRowLayout rank="7" value="30" score="0"/>
                    <ChoiceRowLayout rank="8" value="40" score="0"/>
                    <ChoiceRowLayout rank="9" value="50" score="0"/>
                    <ChoiceRowLayout rank="10" value="60" score="0"/>
                    <ChoiceRowLayout rank="11" value="70" score="0"/>
                    <ChoiceRowLayout rank="12" value="100" score="0"/>
                </View>
                <View style={{
                    margin: 0.01,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    layoutOrigin: [0, 0],
                    transform: [
                        {translateX: -1.66},
                        {translateY: .85},
                        {translateZ: -3}
                    ]
                }}>

                    <Die value="-200" dim={negDim} color="black" backgroundColor="white"/>
                    <Die value="0" dim={checkDimGap} color="black" backgroundColor="white"/>
                    <Die value="+" dim={checkDim} color="black" backgroundColor="white"/>
                    <Die value="+" dim={checkDim} color="black" backgroundColor="white"/>
                    <Die value="+" dim={checkDim} color="black" backgroundColor="white"/>
                    <Die value="+" dim={checkDim} color="black" backgroundColor="white"/>
                    <Die value="+" dim={checkDimGap} color="black" backgroundColor="white"/>
                    <Die value="-80" dim={scoreDim} color="black" backgroundColor="white"/>


                </View>


            </View>
        )
    }
}

module.exports = ChoiceScoreLayout;
