import React from 'react';
import {
    View,
    Animated,
    Text
} from 'react-vr';

import { Easing } from 'react-native';


import CardButton from './elements/CardButton.js';

const Y_YOUR_CARDS = 2.95;
const CARD_HEIGHT = .5;

const GAP_4ROWS = .4;
const INNER_GAP_4ROWS = .3;
const FIRST_ROW= Y_YOUR_CARDS - CARD_HEIGHT - GAP_4ROWS;
const SECOND_ROW= FIRST_ROW - CARD_HEIGHT - INNER_GAP_4ROWS;
const THIRD_ROW= SECOND_ROW - CARD_HEIGHT - INNER_GAP_4ROWS;
const FORTH_ROW= THIRD_ROW - CARD_HEIGHT - INNER_GAP_4ROWS;
const ROUND_ROW= FORTH_ROW - CARD_HEIGHT - GAP_4ROWS;
const NAMES_ROW= ROUND_ROW - CARD_HEIGHT - INNER_GAP_4ROWS ;
const START_X = .965;
//Layout
class TakeSixLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slideLeft: new Animated.Value(-1),
            fadeIn: new Animated.Value(0),
            name:"",
            showButton: false,
            color1: "#A482DF",
            color2: "#DBDAF1",
            text: this.props.text,
            borderWidths: [0, 0, 0, 0, 0, 0]
        };
    }

    componentDidMount() {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(
                    this.state.slideLeft,
                    {
                        toValue: 0,
                        duration: 2000,
                        easing: Easing.ease
                    }
                ),
                Animated.timing(
                    this.state.fadeIn,
                    {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.ease
                    }
                )
            ])
        ]).start();
    }

    //previously updateShowButton
    updateStage(input) {
        console.log(this)
        if (this.letter == '<-'){
            str= this.t.state.name;
            if(str.length == 1)
                this.t.setState({showButton:false});

            this.t.setState({name:str.substring(0, str.length -1)});
        } else {
            this.t.setState({name:this.t.state.name + this.letter});
            this.t.setState({showButton:true});
        }



    }

    updateScene() {
        this.setState({color1: "#DBDAF1", color2: "#A482DF", text: "Watch Video"});
    }

    render() {

        var yourCards = [
            {rank:5,value:2},
            {rank:55,value:1},
            {rank:5,value:1},
            {rank:9,value:7},
            {rank:85,value:1},
            {rank:15,value:2},
            {rank:11,value:5},
            {rank:42,value:1},
            {rank:99,value:7},
            {rank:35,value:3}].map((item,index) => {

            return <CardButton key={index} t={this} card={item} updateStage={this.updateStage}/>
        });
        var row1Cards = [
            {rank:42,value:2},
            {rank:75,value:1},
            {rank:46,value:1},
            {rank:49,value:7},
            {rank:95,value:3}].map((item,index) => {

            return <CardButton key={index} t={this} card={item} updateStage={this.updateStage}/>
        });
        var row2Cards = [
            {rank:52,value:2},
            {rank:75,value:1},

            {rank:35,value:3}].map((item,index) => {

            return <CardButton key={index} t={this} card={item} updateStage={this.updateStage}/>
        });
        var row3Cards = [
            {rank:52,value:2},
            {rank:75,value:1},
            {rank:56,value:1},
            {rank:99,value:7},
            {rank:35,value:3}].map((item,index) => {

            return <CardButton key={index} t={this} card={item} updateStage={this.updateStage}/>
        });
        var row4Cards = [
            {rank:52,value:2},
            {rank:75,value:1}].map((item,index) => {

            return <CardButton key={index} t={this} card={item} updateStage={this.updateStage}/>
        });
        var roundCards = [

            {rank:15,value:2},
            {rank:11,value:1},
            {rank:42,value:1},
            {rank:99,value:7},
            {rank:35,value:3}].map((item,index) => {

            return <CardButton key={index} t={this} card={item} updateStage={this.updateStage}/>
        });
        var names = [

            "susan",
            "stu",
            "bob",
            "larry",
            "wai"].map((item,index) => {

            return <Text key={index}
                style={{
                    width:0.4,
                    fontSize: 0.11,
                    textAlign: 'center',
                    color: 'black',
                }}>
                {item}
            </Text>
        });
        return (
            <View>
                <Animated.View
                    style={{
                        width: 5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [0, Y_YOUR_CARDS],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >
                    <View style={{marginTop: -0.09, width: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{ margin: 0.01,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            {yourCards}
                        </View>
                    </View>
                </Animated.View>


                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [START_X, FIRST_ROW],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >
                    <View style={{marginTop: -0.09, width: 2.5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <View style={{ margin: 0.01,  flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            {row1Cards}
                        </View>

                    </View>
                </Animated.View>
                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [START_X, SECOND_ROW],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >
                    <View style={{marginTop: -0.09, width: 2.5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <View style={{ margin: 0.01,  flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            {row2Cards}
                        </View>

                    </View>
                </Animated.View>
                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [START_X, THIRD_ROW],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >
                    <View style={{marginTop: -0.09, width: 2.5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <View style={{ margin: 0.01,  flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            {row3Cards}
                        </View>

                    </View>
                </Animated.View>
                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [START_X, FORTH_ROW],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >
                    <View style={{marginTop: -0.09, width: 2.5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <View style={{ margin: 0.01,  flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            {row4Cards}
                        </View>

                    </View>
                </Animated.View>

                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [START_X, ROUND_ROW],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >
                    <View style={{marginTop: -0.09, width: 2.5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <View style={{ margin: 0.01,  flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            {roundCards}
                        </View>

                    </View>
                </Animated.View>

                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [START_X, NAMES_ROW],
                        opacity: this.state.fadeIn,
                        transform: [
                            {translateX: this.state.slideLeft},
                            {translateZ: -3}
                        ],
                        marginTop: -0.3
                    }}
                >
                    <View style={{marginTop: .18, width: 2.5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <View style={{ margin: 0.01,  flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            {names}
                        </View>

                    </View>
                </Animated.View>





            </View>
        )
    }
}

module.exports = TakeSixLayout;
