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
            showButton: true,
            choiceData:this.props.choiceData
        }
    }

    componentDidMount() {

    }

    getValue(v){
        if (v == 2 || v == 12)
            return 100;
        return 30 + 10 * Math.abs(7- v)


    }


    render() {

        let negDim = {height: .12, width: .52, valueFont: .06, dieFont: .09, marginRight: .06};
        let checkDim = {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .01};
        let checkDimGap = {height: .12, width: .12, valueFont: .06, dieFont: .09, marginRight: .06};
        let scoreDim = {height: .12, width: .36, valueFont: .06, dieFont: .09, marginRight: .01};

        let scoreRows =
            [ 2,3,4,5,6,7,8,9,10,11,12].map((item, index) => {
              return  <ChoiceRowLayout rank={item} value={this.getValue(item)} score="0" choiceData={this.props.choiceData}
                                 chooseDicePair={this.props.chooseDicePair}/>

            });
        return (

            <View>


                <View style={{
                    marginTop: 0.0,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'

                }}>
                    {scoreRows}
                    </View>
                <View style={{
                    margin: 0.01,
                    marginTop:.05,
                    paddingLeft:.62,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
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
