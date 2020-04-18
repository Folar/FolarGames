import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import LetterButton from './elements/LetterButton.js';
import Zoom from './elements/Zoom';
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
            zorder: this.props.zorder,
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
    invokeBocaDice(){
        let n = this.state.name;
        if (n.length > 5)
            n = n.substring(0,5);
        this.props.signon(this.capitalizeFirstLetter(n),4);
    }
    invoke2(){
        let n = this.state.name;
        if (n.length > 5)
            n = n.substring(0,5);
        this.props.signon(this.capitalizeFirstLetter(n),3);
    }
    invoke(){
        let n = this.state.name;
        if (n.length > 5)
            n = n.substring(0,5);
        this.props.signon(this.capitalizeFirstLetter(n),2);
    }
    invokeDiver(){
        let n = this.state.name;
        if (n.length > 5)
            n = n.substring(0,5);
        this.props.signon(this.capitalizeFirstLetter(n),5);
    }
    invokeAcquire(){
        let n = this.state.name;
        if (n.length > 5)
            n = n.substring(0,5);
        this.props.signon(this.capitalizeFirstLetter(n),6);
    }
    invokePan(){
        let n = this.state.name;
        if (n.length > 5)
            n = n.substring(0,5);
        this.props.signon(this.capitalizeFirstLetter(n),7);
    }
    updateStage(input) {

        if (input == '<-') {
           let  str = this.state.buffer;
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
            let str = this.state.buffer;
            this.setState({color1: "#000000"});
            if (str.length == 0) {
                this.setState({name: input});
            } else {
                this.setState({name: this.state.buffer +input});
            }

        }

    }

    zoom(z){
        this.props.zoom(z);
    }
    render() {
        let zorder= this.state.zorder;

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
                        height:1.5,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [-.2, 0.3],
                        transform: [
                            {translateX: -3},
                            {translateZ: this.state.zorder}
                        ],
                        marginTop: -0.3
                    }}
                >
                    <Zoom zoom={this.zoom.bind(this)}/>
                    <View
                        style={{
                            margin: 0.01,
                            width: 5, flexDirection: 'row',
                            alignItems: 'center',
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
                            alignItems: 'center',
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
                                text="6 nimmt!"
                                style={{
                                    fontSize: .16,
                                    textAlign: 'center',
                                    color: "#000000",
                                    transform: [
                                        {translateX: 0}
                                    ]
                                }}/>
                        <Button updateScene={this.invoke2.bind(this)} showButton={this.state.showButton}
                                text="Choice"
                                style={{
                                    fontSize: .16,
                                    textAlign: 'center',
                                    color: "#000000",
                                    transform: [
                                        {translateX: 0}
                                    ]
                                }}/>
                        <Button updateScene={this.invokeBocaDice.bind(this)} showButton={this.state.showButton}
                                text="Boca Dice"
                                style={{
                                    fontSize: .16,
                                    textAlign: 'center',
                                    color: "#000000",
                                    transform: [
                                        {translateX: 0}
                                    ]
                                }}/>
                        <Button updateScene={this.invokeDiver.bind(this)} showButton={this.state.showButton}
                                text="Greedy Diver"
                                style={{
                                    fontSize: .16,
                                    textAlign: 'center',
                                    color: "#000000",
                                    transform: [
                                        {translateX: 0}
                                    ]
                                }}/>
                        <Button updateScene={this.invokeAcquire.bind(this)} showButton={this.state.showButton}
                                text="Acquire"
                                style={{
                                    fontSize: .16,
                                    textAlign: 'center',
                                    color: "#000000",
                                    transform: [
                                        {translateX: 0}
                                    ]
                                }}/>


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

                        <Button updateScene={this.invokePan.bind(this)} showButton={this.state.showButton}
                                text="Panguingue"
                                style={{
                                    fontSize: .16,
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
