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
    constructor() {
        super();
        this.state = {
            mainMenu: true,
            name: ""
        };
    }

    updateScene(n) {
        console.log(n);
        this.setState({mainMenu: false});
        this.setState({name: n});

    }

    render() {
        const mainMenu = this.state.mainMenu;
        return (
            <View>

                <Pano source={asset('museum.jpg')}/>
                {
                    mainMenu ? (
                        <Login showButton={false} s={this.state} updateScene={this.updateScene.bind(this)}
                               text={"Play"}/>
                    ) : (
                        <TakeSix showButton={false} name={this.state.name} updateScene={this.updateScene.bind(this)}
                                 text={"Play"}/>
                    )
                }
            </View>
        );
    }
};

AppRegistry.registerComponent('FolarGames', () => FolarGames);
