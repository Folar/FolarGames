import React from 'react';
import {
  Text,
  View,
  VrButton
} from 'react-vr';

//Element
class LetterButton extends React.Component {

  render() {
    return (
         <View
            style={{
              margin: .01,
              height: 0.2,
                width: 0.2,
                paddingBottom:.1,
              backgroundColor: "#eeeeee",
              borderWidth: 0,
              borderColor: "#A482DF",
              borderStyle: "solid"
            }}
          >
            <VrButton onClick={ () => this.props.updateStage(this.props.letter) }>
              <Text
                style={{
                  fontSize: 0.2,
                  textAlign: 'center',
                  color: "#000000",
                }}>
                  {this.props.letter}
              </Text>
            </VrButton>
          </View>
    )
  }
}

module.exports = LetterButton;
