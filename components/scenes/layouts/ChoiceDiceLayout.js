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
class ChoiceDiceLayout extends React.Component {

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
        let dieDim = {height: .2, width: .2, valueFont: .1, dieFont: .15,marginRight:.02};


        return (
            <View>
                <View style={{
                    margin: 0.01,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    layoutOrigin: [-.2, 5],
                    transform: [
                        {translateX: -2.5},
                        {translateZ: -3}
                    ]
                }}>

                    <Die value={this.state.die1} dim={dieDim} color="black" backgroundColor="white"/>
                    <Die value={this.state.die2} dim={dieDim} color="black" backgroundColor="white"/>
                    <Die value={this.state.die3} dim={dieDim} color="black" backgroundColor="white"/>
                    <Die value={this.state.die4} dim={dieDim} color="black" backgroundColor="white"/>
                    <Die value={this.state.die5} dim={dieDim} color="black" backgroundColor="white"/>

                    <View
                        style={{
                            marginLeft: 0.4,
                            paddingLeft: 0.2,
                            paddingRight: 0.2,
                            height: 0.2,
                            backgroundColor: '#A482DF',
                            borderRadius: 0.1,
                            margin: 0.01,
                            width: .7, flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >

                        <VrButton onClick={this.invoke.bind(this)}>
                            <Text
                                style={{
                                    fontSize: 0.2,
                                    textAlign: 'center',
                                    color: "#FFFFFF"
                                }}>
                                Roll
                            </Text>
                        </VrButton>
                    </View>
                </View>


            </View>


        )
    }
}

module.exports = ChoiceDiceLayout;
