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
            message: "hh",
            reset:false
        };
    }

    componentDidMount() {


    }
    invoke(){
        if (this.props.data.buttonText == "Again?"){
            this.props.playAgain();
        } else {
            this.props.clickButton(this.state.reset);
        }
    }

    render() {
        let msg = "";
        let m = this.props.data.message;
        let n = this.props.name;
        if (m != null) {
            msg = m;
        }
        let showButton = this.props.showButton;
        let buttonText = "Start";
        this.state.reset = false;
        let bt = this.props.data.buttonText;
        if (bt != null && bt == "Again?") {
            buttonText = bt;
            this.state.reset = false;
            showButton = true;
        } else if( !showButton && this.props.admin){
            buttonText = "Reset";
            this.state.reset = true;
            showButton = true;
        }
        //console.log("my text data " + JSON.stringify(this.props.data) + " " + this.props.data.message);


        return (
            <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' ,marginRight:.1}}>
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


                            <VrButton onClick={this.invoke.bind(this)}>
                                <Text
                                    style={{
                                        fontSize: 0.2,
                                        textAlign: 'center',
                                        color: "#FFFFFF"
                                    }}>
                                    {buttonText}
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
