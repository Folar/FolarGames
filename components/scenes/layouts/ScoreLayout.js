import React from 'react';
import {
  View,
    VrButton,
  Text
} from 'react-vr';

import { Easing } from 'react-native';

;
import LetterButton from './elements/LetterButton.js';

import Button from './elements/Button.js';

//Layout
class ScoreLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name:"",
      showButton: true,
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

      var names = [

          "susan",
          "stu",
          "bob",
          "larry",
          "nancy"].map((item,index) => {

          return <Text key={index}
                       style={{
                           width:0.4,
                           fontSize: 0.11,
                           textAlign: 'center',
                           color: 'black',
                       }}>
              {item}
          </Text>
      });
    return (
      <View>
        <View
          style={{
            width: 0.3,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            layoutOrigin: [0, 2],

            transform: [
              {translateX: -2.9},
                {translateY: -1.9},
              {translateZ: -3}
            ],
            marginTop: -0.3
          }}
        >
            <View style={{marginRight: .01, width: .3, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>

                <View style={{   flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <Text
                        style={{
                            fontSize: 0.13,
                            width:1.52,
                            height:1,
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
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    {names}
                </View>

            </View>
        </View>


      </View>
    )
  }
}

module.exports = ScoreLayout;
