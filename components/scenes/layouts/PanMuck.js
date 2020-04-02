import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';

import CardSuitRank from './elements/CardSuitRank.js';
import PlayingCard from './elements/PlayingCard.js';
import CardTableLayout from "./CardTableLayout";

//Layout
class PanMuck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           actionState:1
        };

    }


    componentDidMount() {

    }


    reveal() {

    }

    pick() {

    }

    pass() {

    }

    render() {


        return (


                <View style={{
                    width: this.props.w,
                    height: this.props.h,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "blue",

                }}>


                </View>





        )
    }
}

module
    .exports = PanMuck;
