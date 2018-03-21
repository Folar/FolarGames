import React from 'react';
import {
  Text,
  View,
  asset,
  Pano
} from 'react-vr';

import TakeSixLayout from './layouts/TakeSixLayout.js';

//Scene
class TakeSix extends React.Component {
  render() {
    return (
      <View>
       
        <TakeSixLayout name={this.props.name}  text={this.props.text} retryLogin={this.props.retryLogin}/>
      </View>
    )
  }
}

module.exports = TakeSix;
