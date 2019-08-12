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
class TreasureRow extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            showButton: true,
            playing: false,
            color1: "#A482DF",
            color2: "#DBDAF1",
            color:"white",
            text: "Start",
            borderWidths: [0, 0, 0, 0, 0, 0]
        };
    }

    componentDidMount() {

    }

    render() {

        let n = this.props.player.name;
        let bg= this.props.cp;
        bg="red";
        return (

            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Text
                    style={{
                        width: 0.62,
                        height: .23,
                        fontSize: 0.15,
                        textAlign: 'left',
                        color: this.state.color,

                    }}>
                    {n}
                </Text>


                <Text
                    style={{
                        width: 0.35,
                        height: .23,
                        fontSize: 0.15,
                        textAlign: 'left',
                        color: this.state.color,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.player.s}
                </Text>
                <Text
                    style={{
                        width: 0.28,
                        height: .23,
                        fontSize: 0.15,
                        textAlign: 'left',
                        color: this.state.color,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.player.m}
                </Text>

                <Text
                    style={{
                        width: 0.35,
                        height: .23,
                        fontSize: 0.15,
                        textAlign: 'left',
                        color: this.state.color,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.player.l}
                </Text>

                <Text
                    style={{
                        width: 0.35,
                        height: .23,
                        fontSize: 0.15,
                        textAlign: 'left',
                        color: this.state.color,
                        transform: [
                            {translateY: 0}
                        ]
                    }}>
                    {this.props.player.xl}
                </Text>


            </View>
        )
    }
}

module.exports = TreasureRow;
