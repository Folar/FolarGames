import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import LetterButton from './elements/LetterButton.js';

import Button from './elements/Button.js';

//Layout
class LoginLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buffer: "",
            name: "Click keys to spell your name and then press Play",
            showButton: false,
            color1: "#744444",
            color2: "#000000",
            text: this.props.text,
            borderWidths: [0, 0, 0, 0, 0, 0]
        };
    }

    componentDidMount() {


    }

    //previously updateShowButton
    updateStage(input) {

        if (this.letter == '<-') {
            str = this.t.state.buffer;
            if (str.length == 0) {
                return;
            }
            if (str.length == 1) {
                this.t.setState({name: "Click keys to spell your name and then press Play"});
                this.t.setState({showButton: false});
                this.t.setState({buffer: ""});
                this.t.setState({color1: "#444444"});
            } else {
                this.t.setState({buffer: str.substring(0, str.length - 1)});
                this.t.setState({name: str.substring(0, str.length - 1)});
                this.t.props.s.name = str.substring(0, str.length - 1);
            }
        } else {
            this.t.setState({showButton: true});
            this.t.setState({buffer: this.t.state.buffer + this.letter});
            str = this.t.state.buffer;
            this.t.setState({color1: "#000000"});
            if (str.length == 0) {
                this.t.setState({name: this.letter});
                this.t.props.s.name = this.letter;
            } else {
                this.t.props.s.name = this.t.state.buffer + this.letter;
                this.t.setState({name: this.t.state.buffer + this.letter});
            }

        }

    }


    render() {


        var items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'].map((item, index) => {

            return <LetterButton key={index} t={this} letter={item} updateStage={this.updateStage}/>
        });
        var items2 = ['o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '$', '#'].map((item, index) => {

            return <LetterButton t={this} key={index} letter={item} updateStage={this.updateStage}/>
        });

        var items3 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '<-'].map((item, index) => {

            return <LetterButton t={this} key={index} letter={item} updateStage={this.updateStage}/>
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

                        <Button updateScene={this.props.updateScene} showButton={this.state.showButton}
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
