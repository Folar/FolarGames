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
import CardButton from "./elements/CardButton";

let _this = null;
let rolltest = false;

//Layout
class DiverDiceLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            showButton: true,
            die1: this.props.init[0],
            die2: this.props.init[1],

            numberOfRolls: 0,
            di: -1

        }
    }

    componentDidMount() {

    }


    roll() {

        if (!rolltest) {
            _this.setState({die1: Math.floor(Math.random() * 3) + 1});
            _this.setState({die2: Math.floor(Math.random() * 3) + 1});


        } else {
            _this.setState({die1: 1});
            _this.setState({die2: 2});

        }
        if (_this.state.numberOfRolls < 4) {
            _this.setState({numberOfRolls: 1 + _this.state.numberOfRolls});
            setTimeout(_this.roll, 50);
        } else {
            let arr = _this.conv(2);

            _this.setState({die1: arr[0]});
            _this.setState({die2: arr[1]});

            _this.props.roll(arr, _this.state.di);
        }
    }

    invoke() {

        if (this.props.choiceButtonText == "Roll!!") {
            VrSoundEffects.play(asset('dice.wav'));
            _this = this;
            _this.setState({numberOfRolls: 1});
            setTimeout(_this.roll, 10);
        } else if (this.props.choiceButtonText == "Start") {
            this.props.sendMessage({name: this.props.player, type: "startBocaDice"});

        } else if (this.props.choiceButtonText == "Confirm") {
            _this.props.roll([_this.state.die1, _this.state.die2, _this.state.die3, _this.state.die4,
                    _this.state.die5, _this.state.die6, _this.state.die7, _this.state.die8],
                _this.state.di);
        } else if (this.props.choiceButtonText == "Pass Dice") {
            this.props.sendMessage({name: this.props.player, type: "passBocaDice"})

        } else if (this.props.choiceButtonText.startsWith("Start Rnd")) {
            this.props.sendMessage({name: this.props.player, type: "nextRoundBocaDice"});

        } else if (this.props.choiceButtonText.startsWith("Restart")) {
            this.props.playAgain();
        }


    }

    choose(d) {
        if (!this.props.clickable) return;
        this.setState({di: d});
        let cnt = 0;
        let dies = this.conv();
        for (let i = 0; i < this.props.num; i++) {
            if (dies[i] == dies[d])
                cnt++;
        }

        this.props.selectDice(dies[d], cnt);
    }

    setDice(die, di) {

        _this.state.die1 = die[0];
        _this.state.die2 = die[1];
        _this.state.di = di;
    }

    resetDice() {
        _this.state.die1 = this.props.init[0];
        _this.state.die2 = this.props.init[1];

        _this.state.di = -1;
    }

    conv(n = 2) {
        let dies = [];
        switch (n) {
            case 1:
                dies.push(this.state.die1);
                break;
            case 2:
                dies.push(this.state.die1);
                dies.push(this.state.die2);
                break;

        }
        return dies;
    }

    getBackground(index) {
        let dies = this.conv();
        for (let i = 0; i < this.props.num; i++) {
            if (dies[index] == dies[this.state.di])
                return "gray";
        }
        return "white"
    }

    render() {
        _this = this;
        let dieDim = {height: .2, width: .2, valueFont: .1, dieFont: .15, marginRight: .02};

        let showButton = this.props.choiceShowButton;
        let buttonText = this.props.choiceButtonText;
        let dies = this.conv();


        let row1Cards =
            dies.map((item, index) => {
                return <VrButton onClick={this.choose.bind(this, index)} key={index}>
                    <Die value={item} key={index} dim={dieDim} color="black"
                         backgroundColor={_this.getBackground(index)}/>
                </VrButton>
            });
        if (this.props.choiceButtonText.startsWith("Start Rnd") ||
            this.props.choiceButtonText == "Restart" ||
            this.props.choiceButtonText == "Pass Dice" ||
            this.props.choiceButtonText == "Finish")
            row1Cards = <Text> &nbsp;</Text>;
        return (
            <View style={{
                layoutOrigin: [0.31, 2.2],
                flexDirection: 'column', height: 1, width: 4, paddingLeft: .1,
                alignItems: 'flex-start', justifyContent: 'flex-start'
            }}>

                <View style={{
                    margin: 0.1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {row1Cards}


                    {
                        showButton ? (<View
                                style={{
                                    marginLeft: 0.4,
                                    paddingLeft: 0.2,
                                    paddingRight: 0.2,
                                    height: 0.2,
                                    backgroundColor: '#A482DF',
                                    borderRadius: 0.1,
                                    margin: 0.01,
                                    width: 1.4, flexDirection: 'row',
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
                <Text
                    style={{
                        width: 2,
                        height: 1,
                        fontSize: 0.15,
                        textAlign: 'left',
                        color: 'white',

                    }}>
                    {this.props.msg}
                </Text>


            </View>


        )
    }
}

module.exports = DiverDiceLayout;
