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
      let players = [];
      let m =this.props.data.users;
      if(m != null){
          players = m;
      }
      var p =players.map((item, index) => {

          return <ScoreRow  key={index} player={item}/>

      });
    return (
        <View style={{
            flexDirection: 'column', height:1.4,
            alignItems: 'flex-start', justifyContent: 'flex-start'
        }}>
            {p}
        </View>
    )
  }
}

module.exports = ScoreCard;
