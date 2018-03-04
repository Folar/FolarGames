import React from 'react';
import {
  Text,
  View,
  VrButton,
  Animated
} from 'react-vr';

import { Easing } from 'react-native';

//Element
class GameText extends React.Component {
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
    const showButton = this.props.showButton;
    return (
        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <Text
              style={{
                  fontSize: 0.13,
                  width: 1.52,
                  height: 1,
                  textAlign: 'center',
                  color: "#000000"
              }}>
            Welcome! Press the start button when all the players have joined
          </Text>
          <View
              style={{
                  marginLeft: 0.4,
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  height: 0.3,
                  backgroundColor: '#A482DF',
                  borderRadius: 0.1,

                  transform: [
                      {translateX: 0}
                  ]
              }}>
            <VrButton onClick={this.updateScene}>
              <Text
                  style={{
                      fontSize: 0.2,
                      textAlign: 'center',
                      color: "#FFFFFF"
                  }}>
                Start
              </Text>
            </VrButton>
          </View>

        </View>
    )
  }
}

module.exports = GameText;
