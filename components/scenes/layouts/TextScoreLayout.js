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
                    width: 0.9,
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


                    <GameText data={this.props.data}/>
                    <ScoreCard data={this.props.data}/>


                </View>





        )
    }
}

module.exports = TextScoreLayout;
