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
class ScoreRow extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            showButton: true,
            playing: false,
            color1: "#A482DF",
            color2: "#DBDAF1",
            text: "Start",
            borderWidths: [0, 0, 0, 0, 0, 0]
        };
    }

    componentDidMount() {

    }

    render() {
        let cardDim = {height: .35, width: .28, valueFont: .07, rankFont: .14};
        let cu = new Cards();
        let n =this.props.player.name;
        if(n.length >1 && n.endsWith("$"))
            n = n.substring(0,n.length -1);
        return (
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                <Text
                    style={{
                        width: 0.52,
                        height: .35,
                        fontSize: 0.15,
                        textAlign: 'left',
                        color: 'black',

                    }}>
                    {n}
                </Text>{
                (this.props.player.playing) ? (
                    <CardButton dim={cardDim} color={cu.getColor(this.props.player.card, false)}
                                background={cu.getBackground(this.props.player.card, false)}
                                bulls={cu.getBulls(this.props.player.card)}
                                card={this.props.player.card} pickCard={this.props.pickCard}/>
                ) : (
                    <Text
                        style={{
                            width: 0.28,
                            height: .35,
                            fontSize: 0.15,
                            textAlign: 'center',
                            color: 'black',
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {this.props.player.score}
                    </Text>
                )
            }

            </View>
        )
    }
}

module.exports = ScoreRow;
