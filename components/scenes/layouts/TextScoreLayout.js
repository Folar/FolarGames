import React from 'react';
import {
    View,
    VrButton,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import ScoreCard from './elements/ScoreCard.js';
import GameText from './elements/GameText.js';


//Layout
class TextScoreLayout extends React.Component {

    constructor(props) {
        super(props);
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

    updateScene() {
    }


    render() {


        return (

            <View
                style={{
                    width: 1.3,
                    height:1.4,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    layoutOrigin: [0, 0],

                    transform: [
                        {translateX: -2.9},
                        {translateY: .67},
                        {translateZ: -3}
                    ],
                    marginTop: -0.3
                }}
            >


                    <GameText data={this.props.data} showButton={this.props.showButton} playAgain={this.props.playAgain}
                              admin={this.props.admin} clickButton={this.props.clickButton} name={this.props.name}
                              fakeadmin={this.props.fakeadmin} playMoo={this.props.playMoo}/>
                    <ScoreCard data={this.props.data}/>


                </View>





        )
    }
}

module.exports = TextScoreLayout;
