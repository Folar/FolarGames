import React from 'react';
import {
    View,
    Text, VrButton
} from 'react-vr';
;
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
    invokeSell(cnt){
        this.props.invoke("SellV",cnt)
    }
    invokeSwap(cnt){
        this.props.invoke("SwapV",cnt)
    }

    render() {
        let arrSwap= [];
        let arrSell= [];
        var idxSell = 0;
        var idxSwap = 0;

        idxSwap = this.props.stock.swap;
        for(var i = 0;i<=this.props.stock.total; i= i+2)
            arrSwap.push(i);

        idxSell = this.props.stock.sell;
        for(var i = 0;i<=this.props.stock.total; i++)
            arrSell.push(i);


        let swap =
            arrSwap.map((item, index) => {

                return <ValueClickable value={item} dim={this.getDim(item)}  color={"black"}
                                     backgroundColor={ idxSwap == item ?"white" :  this.props.stock.survivorColor}
                                     clickable={true} invoke={this.invokeSwap.bind(this)} />
            });

        let sell =
            arrSell.map((item, index) => {

                return <ValueClickable value={item} dim={this.getDim(item)}  color={"black"}
                                       backgroundColor={ idxSell == item ?"white" :  this.props.stock.defunctColor}
                                       clickable={true} invoke={this.invokeSell.bind(this)} />
            });

        return (
            <View>


                <View style={{
                    height: 1.8,
                    width: 5,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'start',
                    layoutOrigin: [-.077, .7],
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
                        {this.props.stock.title}
                    </Text>

                    <View style={{
                        height: .15,
                        width: 5,
                        marginTop:.04,
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
                            backgroundColor: this.props.stock.survivorColor,
                            color:"black"

                        }}>
                        {this.props.stock.survivor}
                        </Text>
                            <Text
                                style={{
                                    width: 1,
                                    height: .15,
                                    fontSize: .1,
                                    fontWeight:400,
                                    textAlign: 'center',
                                    backgroundColor: this.props.stock.defunctColor,
                                    color:"black"

                                }}>
                                {this.props.stock.defunct}
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
                        height: .35,
                        width: 3,
                        marginTop:.1,
                        marginBottom:.1,
                        layoutOrigin: [-0.65, 0],
                        flexDirection: 'column',
                        alignItems: 'left',
                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                                width: 4.5,
                                height: .5,
                                fontSize: .13,
                                fontWeight:300,
                                textAlign: 'left',
                                marginLeft:1,
                                justifyContent: 'start',
                                color:"black"

                            }}>
                            {this.props.stock.info}
                        </Text>
                    </View>



                    <View style={{
                        height: .25,
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
                                backgroundColor: this.props.stock.defunctColor,
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
                                    {"Keep "+this.props.stock.keep}
                                </Text>
                            </VrButton>
                        </View>
                        <View
                            style={{
                                marginLeft: 0.4,
                                paddingLeft: 0.2,
                                paddingRight: 0.2,
                                height: 0.15,
                                backgroundColor: this.props.stock.survivorColor,
                                borderRadius: 0.0,
                                margin: 0.01,
                                width: 1.2, flexDirection: 'row',
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
                                    {"Swap " +  this.props.stock.swap}
                                </Text>
                            </VrButton>
                        </View>
                        <View
                            style={{
                                marginLeft: 0.4,
                                paddingLeft: 0.2,
                                paddingRight: 0.2,
                                height: 0.15,
                                backgroundColor: this.props.stock.defunctColor,
                                borderRadius: 0.0,
                                margin: 0.01,
                                width: 1.2, flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <VrButton >
                                <Text
                                    style={{
                                        fontSize: 0.15,
                                        textAlign: 'center',
                                        fontWeight:500,
                                        color: "black"
                                    }}>
                                    {"Sell "+ this.props.stock.sell }
                                </Text>
                            </VrButton>
                        </View>
                    </View>
                    <View style={{
                        height: .3,
                        width: 5,
                        layoutOrigin: [-.088, 0],
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
                                backgroundColor:  this.props.stock.survivorColor,
                                color:"black"

                            }}>
                            { "Swap Shares:"}
                        </Text>
                        {swap}

                    </View>
                    <View style={{
                        height: .3,
                        width: 5,
                        layoutOrigin: [-.088, .3],
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
                                backgroundColor:  this.props.stock.defunctColor,
                                color:"black"

                            }}>
                            { "Sell Shares:"}
                        </Text>
                        {sell}

                    </View>

                </View>


            </View>


        )
    }
}

module
    .exports = AcquireStockLayout;
