import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

import Login from './components/scenes/Login.js';
import TakeSix from './components/scenes/TakeSix.js';

export default class FolarGames extends React.Component {
    constructor(){
        super();
        this.state={mainMenu: true};
    }
    updateScene() {

                this.setState({ mainMenu: false});

    }
  render() {
      const mainMenu = this.state.mainMenu;
    return (
      <View>

        <Pano source={asset('museum.jpg')}/>
          {
              mainMenu? (
                  <Login showButton={false} updateScene={this.updateScene.bind(this)} text={"Play"}/>
              ) : (
                  <TakeSix showButton={false} updateScene={this.updateScene.bind(this)} text={"Play"}/>
              )
          }
      </View>
    );
  }
};

AppRegistry.registerComponent('FolarGames', () => FolarGames);
