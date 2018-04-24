import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import Die from './elements/Die.js';
import DieClickable from './elements/DieClickable.js';
;
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
            choiceData: this.props.choiceData
        }
    }

    componentDidMount() {

    }

    getColor(row, col) {

        if (this.props.choiceData.diceState) {


            switch (this.props.choiceData.diceState[row][col]) {
                case 0:
                    return "white";
                case 2:
                    return "#bbbbbb";
                case 3:
                    return "black";
                case 4:
                    return "black";

            }
        }
        return "white";
    }


    getBackgroundColor(row, col) {

        if (this.props.choiceData.diceState) {


            switch (this.props.choiceData.diceState[row][col]) {
                case 0:
                    return "white";
                case 2:
                    return "#bbbbbb";
                case 3:
                    return "#bbbbbb";
                case 4:
                    return "white";

            }
        }
        return "white";
    }

    canClick(row, col) {
        if (this.props.choiceData.diceState) {

            if (this.props.choiceData.diceState[row][col] == 2 || this.props.choiceData.diceState[row][col] == 3)
                return true;
        }
        return false;
    }

    getDim(item) {
        switch (item) {
            case 0:
            case 1:
            case 2:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                return {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .01};
        }
        return {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .06};
    }

    render() {
        let checkDim = {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .01};
        let checkDimGap = {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .06};
        let rankDim = {height: .12, width: .24, valueFont: .06, dieFont: .09, marginRight: .02};
        let valueDim = {height: .12, width: .36, valueFont: .06, dieFont: .09, marginRight: .08};

        let scoreBoxes =
            [0, 1, 2,3,4,5,6,7,8,9,10,11].map((item, index) => {

                return <DieClickable value="X" dim={this.getDim(item)} rank={this.props.rank} color={this.getColor(this.props.rank, item)}
                                     backgroundColor={this.getBackgroundColor(this.props.rank, item)} pos={item}  key={index}
                                     clickable={this.canClick(this.props.rank, item)}
                                     chooseDicePair={this.props.chooseDicePair} gaitor={false}/>
            });

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
                    <Die value={this.props.rank} rank={this.props.rank} dim={rankDim} color="black"
                         backgroundColor="white"/>
                    <Die value={this.props.value} rank={this.props.rank} dim={valueDim} color="black"
                         backgroundColor="white"/>
                    {scoreBoxes}

                    <Die value={this.props.score} dim={valueDim} color="black" backgroundColor="white"/>

                </View>


            </View>



        )
    }
}

module.exports = ChoiceRowLayout;
