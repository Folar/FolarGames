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
       
        <LoginLayout updateScene={this.props.updateScene} msg={this.props.msg} txtclr={this.props.txtclr} text={this.props.text} />
      </View>
    )
  }
}

module.exports = Login;
