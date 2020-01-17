import React from 'react';
import {
    View,
    Text, VrButton
} from 'react-vr';


import AcquireBoardLayout from './AcquireBoardLayout.js';
import AcquireHotelStats from './AcquireHotelStats.js';
import AcquirePlayerStats from './AcquirePlayerStats.js';
import ValueClickable from './elements/ValueClickable.js';





//Layout
class AcquireStockLayout extends React.Component {

    constructor(state) {
        super(state);

        this.state = {
            stock: this.props.stock
        };

    }

    componentDidMount() {

    }


    canClick(){
        return false;
    }
    canShow(){
        return true;
    }

    compare(a, b) {
        return (a.value - b.value) * -1;
    }




    getDim(item) {
        return {height: .13, width: .13, valueFont: .06, dieFont: .11, marginRight: .016};
    }
    OK(){
       // this.props.invoke('swap',this.props.value)
    }
    sell(){
        this.props.invoke('Sell',0)
    }
    swap(){
        this.props.invoke('Swap',0)
    }
    invoke(cnt){
        this.props.invoke(this.props.stock.label+"V",cnt)
    }

    render() {
        let arr= [];
        var idx = 0;
        if(this.props.stock.label == "Swap"){
            idx = this.props.stock.swap;
            for(var i = 0;i<=this.props.stock.total; i= i+2)
                arr.push(i);
        } else{
            idx = this.props.stock.sell;
            for(var i = 0;i<=this.props.stock.total; i++)
                arr.push(i);
        }

        let scoreBoxes =
            arr.map((item, index) => {

                return <ValueClickable value={item} dim={this.getDim(item)}  color={"black"}
                                     backgroundColor={ idx == item ?"white" :  this.state.stock.defunctColor}
                                     clickable={true} invoke={this.invoke.bind(this)} />
            });

        return (
            <View>


                <View style={{
                    height: 2.2,
                    width: 5,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'start',
                    layoutOrigin: [-.077, .83],
                    backgroundColor:"lightblue",
                    transform: [
                        {translateX: 0},
                        {translateZ: 0}]
                }}>

                    <Text
                        style={{
                            width: 5,
                            height: .15,
                            fontSize: .1,
                            fontWeight:400,
                            textAlign: 'center',
                            backgroundColor: "lightgray",
                            color:"black"

                        }}>
                        {this.state.stock.title}
                    </Text>

                    <View style={{
                        height: .3,
                        width: 5,
                        layoutOrigin: [0, 0],
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text
                        style={{
                            width: 2,
                            height: .15,
                            fontSize: .1,
                            fontWeight:400,
                            textAlign: 'center',
                            backgroundColor: this.state.stock.survivorColor,
                            color:"black"

                        }}>
                        {this.state.stock.survivor}
                        </Text>
                            <Text
                                style={{
                                    width: 1,
                                    height: .15,
                                    fontSize: .1,
                                    fontWeight:400,
                                    textAlign: 'center',
                                    backgroundColor: this.state.stock.defunctColor,
                                    color:"black"

                                }}>
                                {this.state.stock.defunct}
                        </Text>
                        <View
                            style={{
                                marginLeft: 0.4,
                                paddingLeft: 0.2,
                                paddingRight: 0.2,
                                height: 0.15,
                                backgroundColor: '#A482DF',
                                borderRadius: 0.1,
                                margin: 0.01,
                                width: .7, flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <VrButton onClick={this.OK.bind(this)}>
                                <Text
                                    style={{
                                        fontSize: 0.15,
                                        textAlign: 'center',
                                        color: "#FFFFFF"
                                    }}>
                                    {"OK"}
                                </Text>
                            </VrButton>
                        </View>

                    </View>
                    <View style={{
                        height: .4,
                        width: 3,
                        marginTop:.1,
                        marginBottom:.1,
                        layoutOrigin: [-0.15, 0],
                        flexDirection: 'column',
                        alignItems: 'left',
                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                                width: 3,
                                height: .5,
                                fontSize: .13,
                                fontWeight:300,
                                textAlign: 'left',
                                marginLeft:1,
                                justifyContent: 'start',
                                color:"black"

                            }}>
                            {this.state.stock.info}
                        </Text>
                    </View>



                    <View style={{
                        height: .3,
                        width: 5,
                        layoutOrigin: [0, 0],
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View
                            style={{
                                marginLeft: 0.1,
                                paddingLeft: 0.2,
                                paddingRight: 0.2,
                                height: 0.15,
                                opacity:1,
                                backgroundColor: this.state.stock.defunctColor,
                                borderRadius: 0.00,
                                margin: 0.01,
                                width: 1, flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <VrButton >
                                <Text
                                    style={{
                                        fontSize: 0.15,
                                        fontWeight:500,
                                        textAlign: 'center',
                                        color: "black"
                                    }}>
                                    {"Keep "+this.state.stock.keep}
                                </Text>
                            </VrButton>
                        </View>
                        <View
                            style={{
                                marginLeft: 0.4,
                                paddingLeft: 0.2,
                                paddingRight: 0.2,
                                height: 0.15,
                                backgroundColor: this.state.stock.defunctColor,
                                borderRadius: 0.1,
                                margin: 0.01,
                                width: 1.2, flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <VrButton onClick={this.swap.bind(this)}>
                                <Text
                                    style={{
                                        fontSize: 0.15,
                                        fontWeight:500,
                                        textAlign: 'center',
                                        color: "black"
                                    }}>
                                    {"Swap " +  this.state.stock.swap}
                                </Text>
                            </VrButton>
                        </View>
                        <View
                            style={{
                                marginLeft: 0.4,
                                paddingLeft: 0.2,
                                paddingRight: 0.2,
                                height: 0.15,
                                backgroundColor: this.state.stock.defunctColor,
                                borderRadius: 0.1,
                                margin: 0.01,
                                width: 1.2, flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <VrButton onClick={this.sell.bind(this)}>
                                <Text
                                    style={{
                                        fontSize: 0.15,
                                        textAlign: 'center',
                                        fontWeight:500,
                                        color: "black"
                                    }}>
                                    {"Sell "+ this.state.stock.sell }
                                </Text>
                            </VrButton>
                        </View>
                    </View>
                    <View style={{
                        height: .3,
                        width: 5,
                        layoutOrigin: [-.05, 0],
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <Text
                            style={{
                                width: 0.66,
                                height: .13,
                                fontWeight:600,
                                textAlign: 'left',
                                marginRight:.05,
                                backgroundColor:  this.state.stock.defunctColor,
                                color:"black"

                            }}>
                            {this.state.stock.label + " Shares:"}
                        </Text>
                        {scoreBoxes}

                    </View>

                </View>


            </View>


        )
    }
}

module
    .exports = AcquireStockLayout;
