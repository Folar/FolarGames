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
            die1: "F",
            die2: "O",
            die3: "L",
            die4: "A",
            die5: "R",
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
        if (_this.state.numberOfRolls < 4) {
            _this.setState({numberOfRolls: 1 + _this.state.numberOfRolls});
            setTimeout(_this.roll, 50);
        }else{
            _this.props.roll([_this.state.die1, _this.state.die2,_this.state.die3,_this.state.die4,_this.state.die5]);;
        }
    }

    invoke() {
        if(this.props.choiceButtonText == "Confirm" || this.props.choiceButtonText == "Again?") {
            _this.props.roll([_this.state.die1, _this.state.die2,_this.state.die3,_this.state.die4,_this.state.die5]);
            _this.state.die1 = 'F';
            _this.state.die2 = 'O';
            _this.state.die3 = 'L';
            _this.state.die4 = 'A';
            _this.state.die5 = 'R';
            return;
        }
        VrSoundEffects.play(asset('dice.wav'));
        _this = this;
        _this.setState({numberOfRolls: 1});
        setTimeout(_this.roll, 10);

    }


    render() {
        let dieDim = {height: .2, width: .2, valueFont: .1, dieFont: .15,marginRight:.02};

        let showButton = this.props.choiceShowButton;
        let buttonText = this.props.choiceButtonText;
        return (
            <View>
                <View style={{
                    margin: 0.1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Die value={this.state.die1} dim={dieDim} color="black" backgroundColor="white"/>
                    <Die value={this.state.die2} dim={dieDim} color="black" backgroundColor="white"/>
                    <Die value={this.state.die3} dim={dieDim} color="black" backgroundColor="white"/>
                    <Die value={this.state.die4} dim={dieDim} color="black" backgroundColor="white"/>
                    <Die value={this.state.die5} dim={dieDim} color="black" backgroundColor="white"/>
                    {
                    showButton ?(<View
                        style={{
                            marginLeft: 0.4,
                            paddingLeft: 0.2,
                            paddingRight: 0.2,
                            height: 0.2,
                            backgroundColor: '#A482DF',
                            borderRadius: 0.1,
                            margin: 0.01,
                            width: 1.2, flexDirection: 'row',
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
                                {buttonText}
                            </Text>
                        </VrButton>
                    </View>) :
                    (<View/>)
                    }
                </View>


            </View>


        )
    }
}

module.exports = ChoiceDiceLayout;
