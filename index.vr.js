import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

import Login from './components/scenes/Login.js';

export default class FolarGames extends React.Component {
  render() {
    return (
      <View>

        <Pano source={asset('museum.jpg')}/>

        <Login showButton={false} text={"Play"}/>
      </View>
    );
  }
};

AppRegistry.registerComponent('FolarGames', () => FolarGames);
