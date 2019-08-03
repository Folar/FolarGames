import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
    VrHeadModel
} from 'react-vr';

import Games from './components/scenes/Games.js'
let _this = null;
export default class FolarGames extends React.Component {
    constructor() {
        super();
        _this = this;
        this.state = {
            mainMenu: true,
            name: "Click keys to spell your name and then press Play",
            txtclr:"#444444",
            image:"museum.jpg",
            ypos:0,
            xpos:0
        };
    }

    chgImg(){
        _this.setState({image:"ocean1.jpg",ypos:140,xpos:-60});
    }

    render() {
        const mainMenu = this.state.mainMenu;
        const rotationY=VrHeadModel.yawPitchRoll()[1]+this.state.ypos;
        const rotationX=VrHeadModel.yawPitchRoll()[0]+this.state.xpos;
        return (
            <View>

                <Pano
                    style={{
                        position: 'absolute',
                        transform:[
                            {rotateY: rotationY},
                            {rotateX: rotationX},
                        ]
                    }}
                    source={asset(this.state.image)}
                />
                {
                   <Games chgImg={this.chgImg}/>
                }
            </View>
        );
    }
};

AppRegistry.registerComponent('FolarGames', () => FolarGames);
