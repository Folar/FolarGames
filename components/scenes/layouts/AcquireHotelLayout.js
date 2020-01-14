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
class AcquireHotelLayout extends React.Component {

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

        switch (col){
            case "Luxor":
                return "red"
            case "Tower":
                return "yellow"
            case "American":
                return "#8787ff"
            case "Worldwide":
                return "#c3af91"
            case "Festival":
                return "green"
            case "Continental":
                return "cyan"
        }
        return "pink";
    }
    getValue(item){
        return item;
    }

    canClick(row, col) {

        return false;
    }

    getDim(item) {
        return {height: .08, width: .357, valueFont: .07, dieFont: .07, marginRight: .01};
    }

    render() {

        let scoreBoxes =
            ["Luxor", "Tower","American","Worldwide","Festival","Continental","Imperial"].map((item, index) => {

                return <DieClickable value={this.getValue(item)} dim={this.getDim(item)} rank={this.props.rank} color={this.getColor( item)}
                                     backgroundColor={this.getBackgroundColor( item)} pos={item}  key={index}
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
                    {scoreBoxes}



                </View>


            </View>



        )
    }
}

module.exports = AcquireHotelLayout;
