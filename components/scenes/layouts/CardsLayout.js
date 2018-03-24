import React from 'react';
import {
    View,
    Animated,
    Text
} from 'react-vr';

import {Easing} from 'react-native';


import CardButton from './elements/CardButton.js';

const {Constants} = require('./../../../utils/constants.js');

const {Cards} = require('./../../../utils/cards.js');
//Layout
class CardsLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            slideLeft: new Animated.Value(-1),
            fadeIn: new Animated.Value(0),
            name: "",
            showButton: false,
            color1: "#A482DF",
            color2: "#DBDAF1",
            text: this.props.text,
            borderWidths: [0, 0, 0, 0, 0, 0]
        };
        this._ismounted = false;
        this._animate = false;
    }
    componentDidMount() {
        this._ismounted = true;
        this.animate_cards();
    }

    animate_cards() {

        Animated.sequence([
            Animated.parallel([
                Animated.timing(
                    this.state.slideLeft,
                    {
                        toValue: 0,
                        duration: 2000,
                        easing: Easing.ease
                    }
                ),
                Animated.timing(
                    this.state.fadeIn,
                    {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.ease
                    }
                )
            ])
        ]).start();

    }
    componentDidUpdate() {

        this._animate = true;
    }

    render() {
        let myCards = [];
        let row1 = [];
        let row2 = [];
        let row3 = [];
        let row4 = [];
        let c = new Constants();
        let cu = new Cards();
        let cardDim = {height: .5, width: .4, valueFont: .1, rankFont: .2};
        let cards = this.props.data.cards;
        if (this.props.data.reanimate && this._animate){
            console.log("AAAAAANIMATE");
            this._animate = false;
        } else if (!this.props.data.reanimate){
            this._animate = true;
        }
        if (cards != null) {
            myCards = cards;
            row1 = this.props.data.row1;
            row2 = this.props.data.row2;
            row3 = this.props.data.row3;
            row4 = this.props.data.row4;
        }

        let yourCards = myCards.map((item, index) => {

            return <CardButton dim={cardDim} key={index} color={cu.getColor(item, this.props.state === 3)} row={0}
                               background={cu.getBackground(item, this.props.state === 3)} state={this.props.state}
                               clickable={this.props.state === 3}
                               bulls={cu.getBulls(item)} card={item} pickCard={this.props.pickCard}/>
        });
        let row1Cards =
            row1.map((item, index) => {

                return <CardButton dim={cardDim} key={index} color={cu.getColor(item, item.state === 1)} row={1}
                                   background={cu.getBackground(item, item.state === 1)} bulls={cu.getBulls(item)}
                                   card={item} pickCard={this.props.pickCard} clickable={item.state === 1}/>
            });
        let row2Cards = row2.map((item, index) => {

            return <CardButton dim={cardDim} color={cu.getColor(item, item.state === 1)} key={index} row={2}
                               background={cu.getBackground(item, item.state === 1)} bulls={cu.getBulls(item)}
                               card={item} pickCard={this.props.pickCard} clickable={item.state === 1}/>
        });
        let row3Cards = row3.map((item, index) => {

            return <CardButton dim={cardDim} key={index} color={cu.getColor(item, item.state === 1)} card={item} row={3}
                               background={cu.getBackground(item, item.state === 1)} bulls={cu.getBulls(item)}
                               pickCard={this.props.pickCard} clickable={item.state === 1}/>
        });
        let row4Cards = row4.map((item, index) => {

            return <CardButton dim={cardDim} key={index} color={cu.getColor(item, item.state === 1)} row={4}
                               background={cu.getBackground(item, item.state === 1)} bulls={cu.getBulls(item)}
                               card={item} pickCard={this.props.pickCard} clickable={item.state === 1}/>
        });


        return (

            <View style={{width: 2.5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>

                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [c.START_X, c.Y_YOUR_CARDS],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: 1
                    }}
                >
                    {yourCards}

                </Animated.View>
                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [c.START_X, c.FIRST_ROW],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >
                    {row1Cards}

                </Animated.View>

                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [c.START_X, c.SECOND_ROW],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >
                    {row2Cards}

                </Animated.View>
                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [c.START_X, c.THIRD_ROW],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >
                    {row3Cards}

                </Animated.View>
                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [c.START_X, c.FORTH_ROW],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >

                    {row4Cards}

                </Animated.View>


            </View>
        )
    }
}

module.exports = CardsLayout;
