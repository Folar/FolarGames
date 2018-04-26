import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import Die from './elements/Die.js';
import DieClickable from './elements/DieClickable.js';
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
    getColor(row, col) {

        if (this.props.choiceData && this.props.choiceData.gaitorsState) {


            switch (this.props.choiceData.gaitorsState[row][col]) {
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

        if (this.props.choiceData && this.props.choiceData.gaitorsState) {


            switch (this.props.choiceData.gaitorsState[row][col]) {
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

    getValue(row){
        if (this.props.choiceData && this.props.choiceData.gaitorsDisplay) {
            return this.props.choiceData.gaitorsDisplay[row];
        }
        return "-"
    }
    canClick(row, col) {
        if (this.props.choiceData && this.props.choiceData.gaitorsState) {

            if ( this.props.choiceData.gaitorsState[row][col] == 3)
                return true;
        }
        return false;
    }


    render() {
        let checkDim = {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .01};
        let checkDimGap = {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .06};
        let rankDim = {height: .12, width: .24, valueFont: .06, dieFont: .09, marginRight: .02};
        let valueDim = {height: .12, width: .36, valueFont: .06, dieFont: .09, marginRight: .08};

        let scoreBoxes =
            [0, 1, 2,3,4,5,6,7].map((item, index) => {

                return  <DieClickable value="X"   key={index} dim={checkDim} pos={item}
                                      rank = {this.props.rank}
                                      color={this.getColor(this.props.rank, item)}
                                      backgroundColor={this.getBackgroundColor(this.props.rank, item)}
                                      clickable={this.canClick(this.props.rank, item)}
                                      chooseDicePair={this.props.chooseDicePair} gaitor={true}/>
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
                    <Die value={this.getValue(this.props.rank)}  rank={this.props.rank}  dim={rankDim} color="black" backgroundColor="white"/>

                    {scoreBoxes}
                </View>


            </View>



        )
    }
}

module.exports = ChoiceGaitRowLayout;
