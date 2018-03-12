import React from 'react';
import {
    View,
    Animated,
    Text
} from 'react-vr';

import { Easing } from 'react-native';


import CardButton from './elements/CardButton.js';

const {Constants} = require('./../../../utils/constants.js');


//Layout
class CardsLayout extends React.Component {

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

    }
    getBulls(item){


        switch (item.value){
            case 1:
                return "*";
            case 2:
                return "**";
            case 3:
                return "***";
            case 5:
                return "*****";
            case 7:
                return "*******";
        }
        return "";

    }
    getColor(item,hilite) {
        let color1="blue";
        let color2="blue";
        switch (item.value){

            case 1:

                color1 =  "#fefefe";
                color2 = "#cc46d6";
                break;

            case 2:
                color1 =  "#64fcff";
                color2 = "#224d06";

                break;
            case 3:
                color1 =  "#59eb2c";
                color2 = "#2214c7";

                break;
            case 5:
                color1 =  "#ab2424";
                color2 = "#59eb2c";
                break;

            case 7:
                color1 =  "#ebde26";
                color2 = "#ab2424";
                break;
        }
        if(hilite) {
            return color1;

        }else{
            return color2;
        }


    }
    getBackground(item,hilite) {
        let color1="blue";
        let color2="blue";
        switch (item.value){

            case 1:

                color1 =  "#fefefe";
                color2 = "#cc46d6";
                break;

            case 2:
                color1 =  "#64fcff";
                color2 = "#224d06";

                break;
            case 3:
                color1 =  "#59eb2c";
                color2 = "#2214c7";

                break;
            case 5:
                color1 =  "#ab2424";
                color2 = "#59eb2c";
                break;

            case 7:
                color1 =  "#ebde26";
                color2 = "#ab2424";
                break;
        }
        if(hilite) {
            return color2;

        }else{
            return color1;
        }


    }
    render() {
        var  myCards = [];
        var  row1 =[];
        var  row2 =[];
        var  row3 =[];
        var  row4 =[];
        let c = new Constants();
        let cardDim = {height:.5,width:.4,valueFont:.1,rankFont:.2};
        let cards =this.props.data.cards;
        if(cards != null){
            myCards = cards;
            row1 =this.props.data.row1;
            row2 =this.props.data.row2;
            row3 =this.props.data.row3;
            row4 =this.props.data.row4;
        }

        var yourCards = myCards.map((item,index) => {

            return <CardButton dim = {cardDim} key={index} t={this} color={this.getColor(item,this.props.state==3)} background={this.getBackground(item,this.props.state==3)} state={this.props.state} bulls={this.getBulls(item)} card={item} updateStage={this.updateStage}/>
        });
        var row1Cards =
            row1.map((item,index) => {

            return <CardButton dim = {cardDim} key={index} t={this} color={this.getColor(item,false)} background={this.getBackground(item,false)} bulls={this.getBulls(item)}  card={item} updateStage={this.updateStage}/>
        });
        var row2Cards = row2.map((item,index) => {

            return <CardButton dim = {cardDim} color={this.getColor(item,false)} background={this.getBackground(item,false)} key={index} t={this} bulls={this.getBulls(item)} card={item} updateStage={this.updateStage}/>
        });
        var row3Cards = row3.map((item,index) => {

            return <CardButton dim = {cardDim}  key={index} color={this.getColor(item,false)} background={this.getBackground(item,false)} bulls={this.getBulls(item)} t={this} card={item} updateStage={this.updateStage}/>
        });
        var row4Cards = row4.map((item,index) => {

            return <CardButton dim = {cardDim} key={index} t={this} color={this.getColor(item,false)} background={this.getBackground(item,false)}  bulls={this.getBulls(item)} card={item} updateStage={this.updateStage}/>
        });


        return (
            <View>

                <Animated.View
                    style={{
                        width: 2.5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        layoutOrigin: [c.START_X, c.Y_YOUR_CARDS],
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
                        layoutOrigin: [c.START_X, c.FIRST_ROW],
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
                        layoutOrigin: [c.START_X, c.SECOND_ROW],
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
                        layoutOrigin: [c.START_X, c.THIRD_ROW],
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
                        layoutOrigin: [c.START_X, c.FORTH_ROW],
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









            </View>
        )
    }
}

module.exports = CardsLayout;
