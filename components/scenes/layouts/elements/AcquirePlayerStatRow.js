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
class AcquirePlayerStatRow extends React.Component {
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
            hotelWidth : .15,
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
                        width: 0.55,
                        height: this.state.rowHeight,
                        fontSize: this.props.fontSize,
                        fontWeight:300,
                        textAlign: 'left',
                        backgroundColor: this.props.rc,
                        color:"black"

                    }}>
                    {this.props.player.name}
                </Text>


                <Text
                    style={{
                        width: this.state.hotelWidth,
                        height: this.state.rowHeight,
                        fontSize: this.state.fontSize,
                        textAlign: 'center',
                        color: "black",
                        backgroundColor:this.props.rc,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.player.luxor}
                </Text>
                <Text
                    style={{
                        width: this.state.hotelWidth,
                        height: this.state.rowHeight,
                        fontSize: this.state.fontSize,
                        textAlign: 'center',
                        color: "black",
                        backgroundColor:this.props.rc,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.player.tower}
                </Text>
                <Text
                    style={{
                        width: this.state.hotelWidth,
                        height: this.state.rowHeight,
                        fontSize: this.state.fontSize,
                        textAlign: 'center',
                        color: "black",
                        backgroundColor:this.props.rc,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.player.american}
                </Text>
                <Text
                    style={{
                        width: this.state.hotelWidth,
                        height: this.state.rowHeight,
                        fontSize: this.state.fontSize,
                        textAlign: 'center',
                        color: "black",
                        backgroundColor:this.props.rc,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.player.worldwide}
                </Text>
                <Text
                    style={{
                        width: this.state.hotelWidth,
                        height: this.state.rowHeight,
                        fontSize: this.state.fontSize,
                        textAlign: 'center',
                        color: "black",
                        backgroundColor:this.props.rc,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.player.festival}
                </Text>
                <Text
                    style={{
                        width: this.state.hotelWidth,
                        height: this.state.rowHeight,
                        fontSize: this.state.fontSize,
                        textAlign: 'center',
                        color: "black",
                        backgroundColor:this.props.rc,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.player.continental}
                </Text>
                <Text
                    style={{
                        width: this.state.hotelWidth,
                        height: this.state.rowHeight,
                        fontSize: this.state.fontSize,
                        textAlign: 'center',
                        color: "black",
                        backgroundColor:this.props.rc,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.player.imperial}
                </Text>

                <Text
                    style={{
                        width: 0.50,
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
                    {this.props.player.money}
                </Text>


            </View>
        )
    }
}

module.exports = AcquirePlayerStatRow;
