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
class AcquireSubHotelLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showButton: true
        }
    }

    componentDidMount() {

    }

    getColor( col) {


        return "black";
    }


    getBackgroundColor( col) {
        return "lightgray";
    }
    getValue(item){
        return item;
    }

    canClick(row, col) {

        return false;
    }

    getDim(item) {
        return {height: .08, width: .367, valueFont: .07, dieFont: .07, marginRight: 0};
    }

    render() {

        let scoreBoxes =
            ["0/25/$0", "0/25/$0","0/25/$0","0/25/$0","0/25/$0", "0/25/$0","0/25/$0"].map((item, index) => {

                return <DieClickable value={this.getValue(item)} dim={this.getDim(item)} rank={this.props.rank} color={this.getColor( item)}
                                     backgroundColor={this.getBackgroundColor( item)} pos={item}  key={index}
                                     clickable={false}
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
                    {scoreBoxes}



                </View>


            </View>



        )
    }
}

module.exports = AcquireSubHotelLayout;