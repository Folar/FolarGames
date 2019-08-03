import React from 'react';
import {
  Text,
  View,
  asset,
  Pano
} from 'react-vr';

import Games from './layouts/GamesLayout.js';

//Scene
class TakeSix extends React.Component {
  render() {
    return (
      <View>
        <GamesLayout chgImg={this.props.chgImg} />
      </View>
    )
  }
}

module.exports = Games;
