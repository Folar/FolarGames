import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
} from 'react-vr';

import Games from './components/scenes/Games.js'

export default class FolarGames extends React.Component {
    constructor() {
        super();
        this.state = {
            mainMenu: true,
            name: "Click keys to spell your name and then press Play",
            txtclr:"#444444"
        };
    }


    render() {
        const mainMenu = this.state.mainMenu;
        return (
            <View>

                <Pano source={asset('museum.jpg')}/>
                {
                   <Games/>
                }
            </View>
        );
    }
};

AppRegistry.registerComponent('FolarGames', () => FolarGames);
