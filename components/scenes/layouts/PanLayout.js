import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';

import CardLabel from './elements/CardLabel.js';
//Layout
class PanLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom:3.8

        };

    }

    zoom(){

    }
    componentDidMount() {

    }



    render() {


        let parms = {suit:"h", sz: .03, rotation: 180};
        let color = parms.suit == 'c' ||  parms.suit == 's' ? 'black' :'red';
        let suit = "";
        switch (parms.suit) {
            case 's':
                suit = 'spade.png'
                break;
            case 'h':
                suit = 'heart.png'
                break;
            case 'd':
                suit = 'diamond.jpeg'
                break;
            case 'c':
                suit = 'club.png'
                break;
        }


        return (
            <View
                style={{
                    opacity: 1

                }}>

                <View style={{

                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    layoutOrigin: [.9, 0],
                    backgroundColor:"white",
                    transform: [
                        {translateX: 0},
                        {translateZ: -1}]
                }}>
                    <CardLabel sz={.05} suit={'c'} rotation={180}/>
                </View>


            </View>



        )
    }
}

module
    .exports = PanLayout;
