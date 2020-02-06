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

    canClick(index) {

        return true;//this.props.hotels[index].name !="Luxor"  ? true:false;
    }

    getDim(op) {
        return {height: .1, width: .357, valueFont: .07, dieFont: .075, marginRight: .01,fontWeight:500,opacity:op};
    }
    getOpacity(index){
        return this.props.gameState != 103|| this.props.hotels[index].size ==0 ?1:.25;
    }
    invoke(i,j){
        this.props.invokeServer("StartHotel",{row:i})
    }
    render() {

        let scoreBoxes =
            ["Luxor", "Tower","American","Worldwide","Festival","Continental","Imperial"].map((item, index) => {

                return <TileClickable value={this.getValue(item)} dim={this.getDim(this.getOpacity( index))}
                                     row={index}  column={0} color={this.getColor( item)}
                                     backgroundColor={this.getBackgroundColor( item)}  key={index}
                                     clickable={this.canClick(this.props.rank, item)}
                                     chooseDicePair={this.invoke.bind(this)} />
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
