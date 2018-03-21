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
            name: "Click keys to spell your name and then press Play",
            txtclr:"#444444"
        };
    }

    updateScene(n) {
        console.log(n);
        this.setState({mainMenu: false});
        this.setState({name: n});

    }

    retryLogin() {
        let x = this.state.name;
        this.setState({txtclr:"red"});
        this.setState({name: x+ " has already signed on, choose another name"});
        this.setState({mainMenu: true});


    }
    render() {
        const mainMenu = this.state.mainMenu;
        return (
            <View>

                <Pano source={asset('museum.jpg')}/>
                {
                    mainMenu ? (
                        <Login showButton={false} txtclr={this.state.txtclr} updateScene={this.updateScene.bind(this)}
                               msg = {this.state.name}
                               text={"Play"}/>
                    ) : (
                        <TakeSix showButton={false} name={this.state.name} retryLogin={this.retryLogin.bind(this)}
                                 text={"Play"}/>
                    )
                }
            </View>
        );
    }
};

AppRegistry.registerComponent('FolarGames', () => FolarGames);
