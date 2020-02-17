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
import AcquireTileLayout from "./AcquireTileLayout";
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

    getColor( col) {
        if(!this.props.tiles) return "black";

        let row = this.props.row;
        let t = this.props.tiles[row][col];
        if(t.state == 9) {
            return "white";
        }
        return "black";
    }


    getBackgroundColor( col) {
        if(!this.props.tiles) return "#fdfcd8";

        let row = this.props.row;
        let t = this.props.tiles[row][col];;
        let c =["red","yellow","#8787ff","#c3af91","green","cyan","pink"];

        if(t.inRack) {
            if (t.rackState ==  "n")
                return "darkgray"
            if (t.rackState ==  "d")
                return "black"
            return "lightgray";
        }
        if(t.state < 8) return c[t.state];
        if(t.state == 9) {

            return "black";
        }

        return "#fdfcd8";
    }
    getValue(item){
        return item+"-"+this.props.value;
    }

    canClick(row, col) {

        return false;
    }

    getDim(fw) {
        return {height: .2, width: .2, valueFont: .06, dieFont: .08, marginRight: .015,fontWeight:fw,opacity:1};
    }
    invoke(i,j){
        this.props.invokeServer("PlaceTile",{row:i,column:j})
    }
    render() {

        let scoreBoxes =
            [1, 2,3,4,5,6,7,8,9,10,11,12].map((item, index) => {

                return <TileClickable value={this.getValue(item)} dim={this.getDim(700)}
                                      row={this.props.row} column={item -1}
                                     color={this.getColor( item-1)}
                                     backgroundColor={this.getBackgroundColor(item -1)}   key={index}
                                     clickable={true}
                                     chooseDicePair={this.invoke.bind(this)} gaitor={false}/>
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
