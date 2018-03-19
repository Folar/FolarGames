import React from 'react';
import {
    Text,
    View,
    VrButton,
    Animated
} from 'react-vr';

import {Easing} from 'react-native';

//Element
class GameText extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            playing: false,
            color1: "#A482DF",
            color2: "#DBDAF1",
            text: "Start",
            message: "hh"
        };
    }

    componentDidMount() {

    }


    render() {
        let msg = "";
        let m = this.props.data.message;
        if (m != null) {
            msg = m;
        }
        console.log("my text data " + JSON.stringify(this.props.data) + " " + this.props.data.message);
        const showButton = this.props.showButton;

        return (
            <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                <Text
                    style={{
                        fontSize: 0.13,
                        width: 1.52,
                        height: 1,
                        textAlign: 'center',
                        color: "#000000"
                    }}>
                    {msg}
                </Text>
                {
                    showButton ? (
                        <View
                            style={{
                                marginLeft: 0.4,
                                paddingLeft: 0.2,
                                paddingRight: 0.2,
                                height: 0.3,
                                backgroundColor: '#A482DF',
                                borderRadius: 0.1,

                                transform: [
                                    {translateX: 0}
                                ]
                            }}>


                            <VrButton onClick={this.props.clickButton}>
                                <Text
                                    style={{
                                        fontSize: 0.2,
                                        textAlign: 'center',
                                        color: "#FFFFFF"
                                    }}>
                                    Start
                                </Text>
                            </VrButton>
                        </View>) :
                        (<View></View>)


                }

            </View>
        )
    }
}

module.exports = GameText;
