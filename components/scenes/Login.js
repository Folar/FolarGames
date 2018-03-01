import React from 'react';
import {
  Text,
  View,
  asset,
  Pano
} from 'react-vr';

import LoginLayout from './layouts/LoginLayout.js';

//Scene
class Login extends React.Component {
  render() {
    return (
      <View>
       
        <LoginLayout text={this.props.text} />
      </View>
    )
  }
}

module.exports = Login;
