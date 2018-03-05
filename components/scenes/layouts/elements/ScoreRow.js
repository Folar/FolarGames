import React from 'react';
import {
  Text,
  View,
  VrButton,
  Animated
} from 'react-vr';
import CardButton from './CardButton.js';

import { Easing } from 'react-native';

//Element
class ScoreRow extends React.Component {
  constructor() {
    super();
      this.state = {
          name: "",
          showButton: true,
          playing: true,
          color1: "#A482DF",
          color2: "#DBDAF1",
          text: "Start",
          borderWidths: [0, 0, 0, 0, 0, 0]
      };
  }

  componentDidMount() {

  }
    updateStage() {
    }

  render() {
      let cardDim = {height:.35,width:.28,valueFont:.07,rankFont:.14};
    const showButton = this.props.showButton;
    return (
        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            <Text
                  style={{
                      width: 0.4,
                      height: .35,
                      fontSize: 0.11,
                      textAlign: 'center',
                      color: 'black',
                  }}>
                {this.props.player.name}
            </Text>{
            (this.state.playing) ? (
                <CardButton dim={cardDim} t={this} card={this.props.player.card} updateStage={this.updateStage}/>
            ) : (
                <Text
                    style={{
                        width: 0.4,
                        height: .35,
                        fontSize: 0.2,
                        textAlign: 'center',
                        color: 'black',
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
