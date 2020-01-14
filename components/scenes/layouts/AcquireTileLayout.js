import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import Die from './elements/Die.js';
import TileClickable from './elements/TileClickable.js';
;
import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';
let _this = null;

//Layout
class AcquireTileLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showButton: true
        }
    }

    componentDidMount() {

    }

    getColor( col) {


        return "white";
    }


    getBackgroundColor( col) {

        // switch (col){
        //     case "Luxor":
        //         return "red"
        //     case "Tower":
        //         return "yellow"
        //     case "American":
        //         return "#8787ff"
        //     case "Worldwide":
        //         return "#c3af91"
        //     case "Festival":
        //         return "green"
        //     case "Continental":
        //         return "cyan"
        // }
        return "black";
    }
    getValue(item){
        return item;
    }

    canClick(row, col) {

        return false;
    }

    getDim(item) {
        return {height: .12, width: .42, valueFont: .07, dieFont: .07, marginRight: .01,fontWeight:700};
    }

    render() {

        let scoreBoxes =
            ["1-H", "4-C","6-C","12-E","10-B","4-A"].map((item, index) => {

                return <TileClickable value={this.getValue(item)} dim={this.getDim(item)} rank={this.props.rank} color={this.getColor( item)}
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

module.exports = AcquireTileLayout;
