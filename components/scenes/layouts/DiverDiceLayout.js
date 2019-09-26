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
            bonusDie:"",
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

            _this.setState({bonusDie: Math.floor(Math.random() * 6) });


        } else {
            _this.setState({die1: 1});
            _this.setState({die2: 2});

        }
        if (_this.state.numberOfRolls < 7) {
            _this.setState({numberOfRolls: 1 + _this.state.numberOfRolls});
            setTimeout(_this.roll, 70);
        } else {
            let arr = _this.conv(2);

            _this.setState({die1: arr[0]});
            _this.setState({die2: arr[1]});
            _this.props.sendMessage({type:"DIVER",name: _this.props.player, action: "roll",bonus:_this.state.bonusDie,
                di1:Number(arr[0]),di2:Number(arr[1])});
            _this.props.roll(arr, _this.state.di);
        }
    }

    invoke() {

        switch(this.props.buttonText) {
            case "Start":
                _this.props.sendMessage({type:"DIVER",name: this.props.player, action: "startDiver"});
                break;
            case "Roll!!":
                VrSoundEffects.play(asset('dice.wav'));
                _this = this;
                _this.setState({numberOfRolls: 1});
                setTimeout(_this.roll, 10);
                break;

            case "Pass":
                _this.props.sendMessage({type:"DIVER",name: this.props.player, action: "pass"});
                break
            case "Restart":
                this.props.playAgain();
                break;
            case "Next Round":
                _this.props.sendMessage({type:"DIVER",name: this.props.player, action: "nextRound"});
                break;
        }

    }

    invoke2() {

        switch(this.props.buttonText2) {
            case "Change Direction":
                _this.props.sendMessage({type:"DIVER",name: this.props.player, action: "changeDirection"});
                break;
            case "Pass":
                _this.props.sendMessage({type:"DIVER",name: this.props.player, action: "pass"});
                break
            case "Drop a tresaure":
                _this.props.sendMessage({type:"DIVER",name: this.props.player, action: "drop"});
                break;
            case "Pick up a treasure":
                _this.props.sendMessage({type:"DIVER",name: this.props.player, action: "pickup"});
                break;
        }


    }



    setDice(di1, di2) {
        _this.state.die1 = di1;
        _this.state.die2 = di2;
    }

    resetDice() {
        _this.state.die1 = this.props.init[0];
        _this.state.die2 = this.props.init[1];
        _this.state.bonusDie = 0;
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
        return "white"
    }

    render() {
        _this = this;
        let dieDim = {height: .2, width: .2, valueFont: .1, dieFont: .15, marginRight: .02};
        let dieDim2 = {height: .2, width: 1, valueFont: .08, dieFont: .12, marginRight: .02};

        let showButton = this.props.showButton;
        let showButton2 = this.props.showButton2;
        let buttonText = this.props.buttonText;
        let buttonText2 = this.props.buttonText2;
        let dies = this.conv();

        let bonus=["","gain 2 oxygen","lose 1 oxygen","move 1 extra ","move 2 extra ","shark attack"];
        let row1Cards =
            dies.map((item, index) => {
                return <VrButton  key={index}>
                    <Die value={item} key={index} dim={dieDim} color="black"
                         backgroundColor={_this.getBackground(index)}/>
                </VrButton>
            });
        if (this.props.buttonText.startsWith("Start Rnd") ||
            this.props.buttonText == "Restart" ||
            this.props.buttonText == "Pass Dice" ||
            this.props.buttonText == "Finish")
            row1Cards = <Text> &nbsp;</Text>;
        return (
            <View style={{
                layoutOrigin: [-.27, 2.2],
                flexDirection: 'column', height: 1, width: 4.3, paddingLeft: .1,
                alignItems: 'flex-start', justifyContent: 'flex-start'
            }}>

                <View style={{
                    margin: 0.1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {row1Cards}
                    <VrButton  key={3}>
                        <Die value={bonus[_this.state.bonusDie]} key={7} dim={dieDim2} color="black"
                             backgroundColor={_this.getBackground(2)}/>
                    </VrButton>

                    {
                        showButton ? (<View
                                style={{
                                    marginLeft: 0.2,
                                    paddingLeft: 0.1,
                                    paddingRight: 0.1,
                                    height: 0.2,
                                    backgroundColor: '#A482DF',
                                    borderRadius: 0.1,
                                    margin: 0.01,
                                    width: 1, flexDirection: 'row',
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
                    {
                        showButton2 ? (<View
                                style={{
                                    marginLeft: 0.1,
                                    paddingLeft: 0.2,
                                    paddingRight: 0.2,
                                    height: 0.2,
                                    backgroundColor: '#A482DF',
                                    borderRadius: 0.1,
                                    margin: 0.01,
                                    width: 2, flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >

                                <VrButton onClick={this.invoke2.bind(this)}>
                                    <Text
                                        style={{
                                            fontSize: 0.2,
                                            textAlign: 'center',
                                            color: "#FFFFFF"
                                        }}>
                                        {buttonText2}
                                    </Text>
                                </VrButton>
                            </View>) :
                            (<View/>)
                    }
                </View>
                <Text
                    style={{
                        width: 2,
                        height: 1.5,
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
