import React from 'react';
import {
  Text,
  View,
  VrButton
} from 'react-vr';

//Element
class ScoreCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "white",
            backgroundColor: "blue",
            value:1

        };
    }

    componentDidMount() {

    }

  foo(v){


      switch (v){
          case 1:
              return "*";
          case 2:
              return "**";
          case 3:
              return "***";
          case 5:
              return "*****";
          case 7:
              return "*******";
      }
      return "***";

  }
  render() {
      var scoreCard = [
          {
              name: "susan",
              score: 44,
              card: {
                  value: 3,
                  rank: 34
              }
          },
          {
              name: "stu",
              score: 4,
              card: {
                  value: 3,
                  rank: 104
              }
          },
          {
              name: "bob",
              score: 7,
              card: {
                  value: 1,
                  rank: 34
              }
          },
          {
              name: "larry",
              score: 7,
              card: {
                  value: 1,
                  rank: 34
              }
          },
          {
              name: "wai",
              score: 0,
              card: {
                  value: 3,
                  rank: 64
              }
          }].map((item, index) => {

          return <Text key={index}
                       style={{
                           width: 0.4,
                           height: .5,
                           fontSize: 0.11,
                           textAlign: 'center',
                           color: 'black',
                       }}>
              {item.name}
          </Text>
      });
    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'flex-start', justifyContent: 'flex-start'
        }}>
            {scoreCard}
        </View>
    )
  }
}

module.exports = ScoreCard;
