import React from 'react';
import {
  Text,
  View,
  VrButton
} from 'react-vr';
import ScoreRow from './ScoreRow.js';

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


  render() {
      var player = [
          {
              name: "susan",
              score: 44,
              card: {
                  value: 3,
                  rank: 34
              }
          },
         
          {
              name: "larry",
              score: 0,
              card: {
                  value: 3,
                  rank: 64
              }
          }].map((item, index) => {

          return <ScoreRow key={index} player={item}/>

      });
    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'flex-start', justifyContent: 'flex-start'
        }}>
            {player}
        </View>
    )
  }
}

module.exports = ScoreCard;
