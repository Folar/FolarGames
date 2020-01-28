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



    getDim(fw) {
        return {height: .18, width: .28, valueFont: .07, dieFont: .09, marginRight: .01,fontWeight:fw};
    }

    getPlayer(){
        if( this.props.player) return this.props.player;
        return {money:0,name:""}

    }

    render() {

        let scoreBoxes =
            ["", "","","","",""].map((item, index) => {

                return <TileClickable value={this.getValue(item)} dim={this.getDim(700)}  color={this.getColor( item)}
                                     backgroundColor={this.getBackgroundColor( item)}   key={index}
                                     clickable={this.canClick(this.props.rank, item)}
                                     chooseDicePair={this.props.chooseDicePair} />
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
                    <TileClickable value={this.getPlayer().name} dim={this.getDim(400)}  color={"black"}
                                   backgroundColor={"white"}   key={422}
                                   clickable={false}
                                   chooseDicePair={this.props.chooseDicePair} />
                    {scoreBoxes}
                    <TileClickable value={this.getPlayer().money} dim={this.getDim(400)}  color={"black"}
                                   backgroundColor={"lightgray"}   key={423}
                                   clickable={false}
                                   chooseDicePair={this.props.chooseDicePair} />
                    <TileClickable value={""} dim={this.getDim(400)}  color={"black"}
                                   backgroundColor={"lightgray"}   key={4223}
                                   clickable={false}
                                   chooseDicePair={this.props.chooseDicePair} />



                </View>


            </View>



        )
    }
}

module.exports = AcquireTileLayout;
