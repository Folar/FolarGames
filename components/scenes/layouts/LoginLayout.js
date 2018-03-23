import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import LetterButton from './elements/LetterButton.js';

import Button from './elements/Button.js';
import {
    asset,
    VrSoundEffects
} from 'react-vr';
//Layout
class LoginLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buffer: "",
            name: this.props.msg,
            showButton: false,
            color1: this.props.txtclr,
            color2: "#000000",
            text: this.props.text,
            borderWidths: [0, 0, 0, 0, 0, 0]
        };
    }

    componentDidMount() {

        VrSoundEffects.load(this.MY_SOUND);

    }





    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    invoke(){
        let n = this.state.name;
        if (n.length > 5)
            n = n.substring(0,5);
        this.props.updateScene(this.capitalizeFirstLetter(n));
    }
    updateStage(input) {

        if (input == '<-') {
            str = this.state.buffer;
            if (str.length == 0) {
                return;
            }
            if (str.length == 1) {
                this.setState({name: "Click keys to spell your name and then press Play"});
                this.setState({showButton: false});
                this.setState({buffer: ""});
                this.setState({color1: "#444444"});
            } else {
                this.setState({buffer: str.substring(0, str.length - 1)});
                this.setState({name: str.substring(0, str.length - 1)});
            }
        } else {
            this.setState({showButton: true});
            this.setState({buffer: this.state.buffer + input});
            str = this.state.buffer;
            this.setState({color1: "#000000"});
            if (str.length == 0) {
                this.setState({name: input});
            } else {
                this.setState({name: this.state.buffer +input});
            }

        }

    }


    render() {


        var items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'].map((item, index) => {

            return <LetterButton key={index} t={this} letter={item} updateStage={this.updateStage.bind(this)}/>
        });
        var items2 = ['o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '$', '#'].map((item, index) => {

            return <LetterButton t={this} key={index} letter={item} updateStage={this.updateStage.bind(this)}/>
        });

        var items3 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '<-'].map((item, index) => {

            return <LetterButton t={this} key={index} letter={item} updateStage={this.updateStage.bind(this)}/>
        });
        return (
            <View>

                <View
                    style={{
                        width: 3,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [-.2, 0.3],
                        transform: [
                            {translateX: -3},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >
                    <View
                        style={{
                            margin: 0.01,
                            width: 5, flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'flex-start',
                            layoutOrigin: [-.05, 1.6],
                            justifyContent: 'center'
                        }}
                    >

                        <Text
                            style={{
                                fontSize: 0.3,
                                fontFamily: 'Arial',
                                color: this.state.color2,
                                height: .3,
                                textAlign: 'center',
                                transform: [
                                    {translateX: -.3}
                                ]
                            }}>
                            Museum of Games
                        </Text>

                    </View>
                    <View style={{
                        height: 1,
                        width: 5,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <View style={{
                            margin: 0.01,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {items}
                        </View>
                        <View style={{
                            margin: 0.01,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {items2}
                        </View>
                        <View style={{
                            margin: 0.01,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {items3}
                        </View>


                    </View>
                    <View
                        style={{
                            margin: 0.01,
                            width: 5, flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'flex-start',
                            layoutOrigin: [0, 0.8],
                            justifyContent: 'center'
                        }}
                    >

                        <Text
                            style={{
                                fontSize: 0.2,
                                height: .3,
                                textAlign: 'center',
                                color: this.state.color1,
                                transform: [
                                    {translateX: -.3}
                                ]
                            }}>
                            {this.state.name}
                        </Text>

                    </View>
                    <View
                        style={{
                            margin: 0.01,
                            width: 5, flexDirection: 'row',
                            alignItems: 'center',
                            layoutOrigin: [0, 0],
                            justifyContent: 'center'
                        }}
                    >

                        <Button updateScene={this.invoke.bind(this)} showButton={this.state.showButton}
                                text={this.state.text}
                                style={{
                                    fontSize: 0.2,
                                    textAlign: 'center',
                                    color: "#000000",
                                    transform: [
                                        {translateX: 0}
                                    ]
                                }}/>

                    </View>

                </View>


            </View>
        )
    }
}

module.exports = LoginLayout;
