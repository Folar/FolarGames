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
class ChoiceDiceLayout extends React.Component {

    constructor(props) {
        super(props);
        this.choice = null;
        _this = this;
        this.state = {

            showButton: true,
            d1: this.props.init[0],
            d2: this.props.init[1],
            d3: this.props.init[2],
            d4: this.props.init[3],
            d5: this.props.init[4],
            die1: this.props.init[0],
            die2: this.props.init[1],
            die3: this.props.init[2],
            die4: this.props.init[3],
            die5: this.props.init[4],
            die6: this.props.init[5],
            die7: this.props.init[6],
            die8: this.props.init[7],
            numberOfRolls: 0,
            di: -1

        }
    }

    componentDidMount() {

    }

    rollDice(d1, d2, d3, d4, d5, choice) {
        _this.setState({d1: d1, d2: d2, d3: d3, d4: d4, d5: d5, numberOfRolls: 0});
        _this.choice = choice;
        _this.roll();

    }


    roll() {

        if (!rolltest) {
            _this.setState({die1: Math.floor(Math.random() * 6) + 1});
            _this.setState({die2: Math.floor(Math.random() * 6) + 1});
            _this.setState({die3: Math.floor(Math.random() * 6) + 1});
            _this.setState({die4: Math.floor(Math.random() * 6) + 1});
            _this.setState({die5: Math.floor(Math.random() * 6) + 1});
            _this.setState({die6: Math.floor(Math.random() * 6) + 1});
            _this.setState({die7: Math.floor(Math.random() * 6) + 1});
            _this.setState({die8: Math.floor(Math.random() * 6) + 1});

        } else {
            _this.setState({die1: 1});
            _this.setState({die2: 2});
            _this.setState({die3: 1});
            _this.setState({die4: 2});
            _this.setState({die5: 2});
            _this.setState({die6: 2});
            _this.setState({die7: 2});
            _this.setState({die8: 2});
        }
        if (_this.state.numberOfRolls < 4) {
            _this.setState({numberOfRolls: 1 + _this.state.numberOfRolls});
            setTimeout(_this.roll, 50);
        } else {

            if (_this.props.game == "boca") {
                let arr = _this.conv(8);
                if (_this.props.num < 8) {
                    arr = arr.splice(0, _this.props.num).sort((a, b) => a - b);
                    for (let i = _this.props.num; i < 8; i++)
                        arr.push(7);
                } else
                    arr = arr.sort((a, b) => a - b);

                _this.setState({die1: arr[0]});
                _this.setState({die2: arr[1]});
                _this.setState({die3: arr[2]});
                _this.setState({die4: arr[3]});
                _this.setState({die5: arr[4]});
                _this.setState({die6: arr[5]});
                _this.setState({die7: arr[6]});
                _this.setState({die8: arr[7]});
                _this.props.roll(arr, _this.state.di);
            } else {
                _this.setState({die1: _this.state.d1});
                _this.setState({die2: _this.state.d2});
                _this.setState({die3: _this.state.d3});
                _this.setState({die4: _this.state.d4});
                _this.setState({die5: _this.state.d5});
                let arr = _this.conv(5);
                _this.props.markRoll(arr);


            }
        }

    }

    invoke() {
        if (this.props.game == "choice") {
            if (this.props.choiceButtonText == "Confirm") {
                _this.props.confirm();
                _this.state.die1 = this.props.init[0];
                _this.state.die2 = this.props.init[1];
                _this.state.die3 = this.props.init[2];
                _this.state.die4 = this.props.init[3];
                _this.state.die5 = this.props.init[4];
                _this.state.die6 = this.props.init[5];
                _this.state.die7 = this.props.init[6];
                _this.state.die8 = this.props.init[7];
                return;

            } else if (this.props.choiceButtonText == "Restart") {
                this.props.reset();
                this.props.playAgain();


            } else if (this.props.choiceButtonText == "Start") {
                this.props.sendMessage({name: this.props.player, action: "startChoice", type: "CHOICE"});

            } else if (this.props.choiceButtonText == "Roll!!!") {

                this.props.sendMessage({name: this.props.player, action: "roll", type: "CHOICE"});
                ;
            }
        } else if (this.props.game == "boca") {

            if (this.props.choiceButtonText == "Roll!!") {
                VrSoundEffects.play(asset('dice.wav'));
                _this = this;
                _this.setState({numberOfRolls: 1});
                setTimeout(_this.roll, 10);
            } else if (this.props.choiceButtonText == "Start") {
                this.props.sendMessage({name: this.props.player, action: "startBocaDice", type: "BOCA"});

            } else if (this.props.choiceButtonText == "Confirm") {
                _this.props.roll([_this.state.die1, _this.state.die2, _this.state.die3, _this.state.die4,
                        _this.state.die5, _this.state.die6, _this.state.die7, _this.state.die8],
                    _this.state.di);
            } else if (this.props.choiceButtonText == "Pass Dice") {
                this.props.sendMessage({name: this.props.player, action: "passBocaDice", type: "BOCA"})

            } else if (this.props.choiceButtonText.startsWith("Start Rnd")) {
                this.props.sendMessage({name: this.props.player, action: "nextRoundBocaDice", type: "BOCA"});

            } else if (this.props.choiceButtonText.startsWith("Restart")) {
                this.props.playAgain();
            }
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
        _this.state.die3 = die[2];
        _this.state.die4 = die[3];
        _this.state.die5 = die[4];
        _this.state.die6 = die[5];
        _this.state.die7 = die[6];
        _this.state.die8 = die[7];
        _this.state.di = di;
    }

    resetDice() {
        _this.state.die1 = this.props.init[0];
        _this.state.die2 = this.props.init[1];
        _this.state.die3 = this.props.init[2];
        _this.state.die4 = this.props.init[3];
        _this.state.die5 = this.props.init[4];
        _this.state.die6 = this.props.init[5];
        _this.state.die7 = this.props.init[6];
        _this.state.die8 = this.props.init[7];
        _this.state.di = -1;
    }

    conv(n = this.props.num) {
        let dies = [];
        switch (n) {
            case 1:
                dies.push(this.state.die1);
                break;
            case 2:
                dies.push(this.state.die1);
                dies.push(this.state.die2);
                break;
            case 3:
                dies.push(this.state.die1);
                dies.push(this.state.die2);
                dies.push(this.state.die3);
                break;
            case 4:
                dies.push(this.state.die1);
                dies.push(this.state.die2);
                dies.push(this.state.die3);
                dies.push(this.state.die4);
                break;
            case 5:
                dies.push(this.state.die1);
                dies.push(this.state.die2);
                dies.push(this.state.die3);
                dies.push(this.state.die4);
                dies.push(this.state.die5);
                break;
            case 6:
                dies.push(this.state.die1);
                dies.push(this.state.die2);
                dies.push(this.state.die3);
                dies.push(this.state.die4);
                dies.push(this.state.die5);
                dies.push(this.state.die6);
                break;
            case 7:
                dies.push(this.state.die1);
                dies.push(this.state.die2);
                dies.push(this.state.die3);
                dies.push(this.state.die4);
                dies.push(this.state.die5);
                dies.push(this.state.die6);
                dies.push(this.state.die7);
                break;
            case 8:
                dies.push(this.state.die1);
                dies.push(this.state.die2);
                dies.push(this.state.die3);
                dies.push(this.state.die4);
                dies.push(this.state.die5);
                dies.push(this.state.die6);
                dies.push(this.state.die7);
                dies.push(this.state.die8);
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
            <View>
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


            </View>


        )
    }
}

module.exports = ChoiceDiceLayout;
