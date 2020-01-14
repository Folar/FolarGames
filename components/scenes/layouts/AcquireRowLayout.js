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
class AcquireRowLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showButton: true
        }
    }

    componentDidMount() {

    }

    getColor(row, col) {


        return "black";
    }


    getBackgroundColor(row, col) {


        return "#fdfcd8";
    }
    getValue(item){
        return item+"-"+this.props.value;
    }

    canClick(row, col) {

        return false;
    }

    getDim(item) {
        return {height: .2, width: .2, valueFont: .06, dieFont: .08, marginRight: .015};
    }

    render() {

        let scoreBoxes =
            [1, 2,3,4,5,6,7,8,9,10,11,12].map((item, index) => {

                return <DieClickable value={this.getValue(item)} dim={this.getDim(item)} rank={this.props.rank} color={this.getColor(this.props.rank, item)}
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
                    backgroundColor: "gray",
                    opacity:1,
                    height:.2,
                    transform: [
                        {translateX: 0},
                        {translateZ: 0}
                    ]
                }}>
                    {scoreBoxes}



                </View>


            </View>



        )
    }
}

module.exports = AcquireRowLayout;