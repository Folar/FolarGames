import React from 'react';
import {
    Text,
    View,
    VrButton,
    Animated
} from 'react-vr';
import CardButton from './CardButton.js';

const {Cards} = require('./../../../../utils/cards.js');

import {Easing} from 'react-native';

//Element
class AcquireHotelStatRow extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            showButton: true,
            playing: false,
            color1: "#A482DF",
            color2: "#DBDAF1",
            color:"black",
            text: "Start",
            rowHeight:.18,
            fontSize:.1,
            borderWidths: [0, 0, 0, 0, 0, 0]
        };
    }

    componentDidMount() {

    }

    render() {



        return (

            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Text
                    style={{
                        width: 0.66,
                        height: this.state.rowHeight,
                        fontSize: this.props.fontSize,
                        fontWeight:300,
                        textAlign: 'left',
                        backgroundColor: this.props.hotel.color,
                        color:"black"

                    }}>
                    {this.props.hotel.name}
                </Text>


                <Text
                    style={{
                        width: 0.35,
                        height: this.state.rowHeight,
                        fontSize: this.state.fontSize,
                        textAlign: 'center',
                        color: "black",
                        backgroundColor:this.props.rc,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.hotel.available}
                </Text>
                <Text
                    style={{
                        width: 0.35,
                        height: this.state.rowHeight,
                        fontSize: this.state.fontSize,
                        textAlign: 'center',
                        color: "black",
                        backgroundColor:this.props.rc,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.hotel.size}
                </Text>

                <Text
                    style={{
                        width: 0.35,
                        height: this.state.rowHeight,
                        fontSize: this.state.fontSize,
                        textAlign: 'center',
                        color: "black",
                        opacity: 1,
                        backgroundColor:this.props.rc,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.hotel.price}
                </Text>


            </View>
        )
    }
}

module.exports = AcquireHotelStatRow;
