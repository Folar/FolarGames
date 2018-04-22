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
class ChoiceGaitRowLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            showButton: true
        }
    }

    componentDidMount() {

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
                    <Die value={this.props.rank}   rank={this.props.rank}  dim={rankDim} color="black" backgroundColor="white"/>

                    <Die value="" dim={checkDim} pos="0" rank={this.props.rank} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim}  pos="1" rank={this.props.rank} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim}  pos="2" rank={this.props.rank} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim}  pos="3" rank={this.props.rank} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim}  pos="4" rank={this.props.rank} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim}  pos="5" rank={this.props.rank} color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim}  pos="6" rank={this.props.rank}  color="black" backgroundColor="white"/>
                    <Die value="" dim={checkDim}  pos="7" rank={this.props.rank} color="black" backgroundColor="white"/>


                </View>


            </View>



        )
    }
}

module.exports = ChoiceGaitRowLayout;
