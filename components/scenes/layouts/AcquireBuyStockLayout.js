import React from 'react';
import {
    View,
    Text, VrButton
} from 'react-vr';

;
import ValueClickable from './elements/ValueClickable.js';


//Layout
class AcquireBuyStockLayout extends React.Component {

    constructor(state) {
        super(state);

        this.state = {};

    }

    componentDidMount() {

    }


    canClick() {
        return false;
    }

    canShow() {
        return true;
    }

    compare(a, b) {
        return (a.value - b.value) * -1;
    }


    getDim(item) {
        return {height: .13, width: .13, valueFont: .06, dieFont: .11, marginRight: .016};
    }

    OK() {
            this.props.invokeServer("BuyHotels",{amt:this.props.buy.amt,hotels:this.props.buy.hotels})

    }

    reduce(idx) {
        this.props.invoke("reduceHotel", idx);
    }

    increase(idx) {
        this.props.invoke("increaseHotel", idx);
    }

    index(str) {
        return ["Luxor", "Tower", "American", "Worldwide", "Festival", "Continental", "Imperial"].indexOf(str);
    }

    reduceLabel(index) {
        return this.props.buy.amt[index] > 0 ? "-" : "-";
    }

    getForegroundR(index, item) {
        return this.props.buy.amt[index] > 0 ? "black": this.props.buy.hotelColors[index];
    }

    getForegroundI(index, item) {
        let b = this.props.buy.amt[index] < 3 &&
            ( this.props.buy.amt[index] -1) < this.props.hotels[this.index(item)].available &&
            (this.props.buy.amt[index] + 1) * this.props.hotels[this.index(item)].price <= this.props.buy.playerBaseMoney;
        return b ?"black":this.props.buy.hotelColors[index];
    }

    increaseLabel(index, item) {
        return "+";
       // console.log("incrl "+(this.props.buy.amt[index] + 1) * this.props.hotels[this.index(item)].price )
       //  let b = this.props.buy.amt[index] < 3 &&
       //      (this.props.buy.amt[index] -1)  < this.props.hotels[this.index(item)].available &&
       //      (this.props.buy.amt[index] + 1) * this.props.hotels[this.index(item)].price <= this.props.buy.playerBaseMoney;
       //  return b ? "+" : "+";
    }

    render() {

        let len = 5 / this.props.buy.hotels.length;
        len -= .04 * 2//( 0 * (  this.props.buy.hotels.length ) );


        let order =
            this.props.buy.hotels.map((item, index) => {
                w = len;


                return <View style={{
                    marginRight: 0.04, flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Text
                        style={{
                            width: w,
                            height: .15,
                            fontSize: .1,
                            fontWeight: 400,
                            textAlign: 'center',
                            backgroundColor: this.props.buy.hotelColors[index],
                            color: "black"

                        }}>
                        {item + " " + this.props.buy.amt[index]}
                    </Text>

                    <View style={{
                        marginTop: 0.02, flexDirection: 'row', alignContent: 'flex-center',
                        justifyContent: 'flex-end', width: w
                    }}>

                        <VrButton onClick={this.reduce.bind(this, index)}>
                            <Text
                                style={{
                                    width: .15,
                                    height: .15,
                                    fontSize: .13,
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    backgroundColor: this.props.buy.hotelColors[index],
                                    color:  this.getForegroundR(index,item),
                                    opacity: 1// this.getOpacityR(index, item)

                                }}>
                                {this.reduceLabel(index)}
                            </Text>
                        </VrButton>


                        <VrButton onClick={this.increase.bind(this, index)}>
                            <Text
                                style={{
                                    width: .15,
                                    height: .15,
                                    fontSize: .13,
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    backgroundColor: this.props.buy.hotelColors[index],
                                    marginLeft: .02,
                                    color: this.getForegroundI(index,item),
                                    opacity: 1 //this.getOpacityI(index, item)

                                }}>
                                {this.increaseLabel(index, item)}
                            </Text>
                        </VrButton>
                    </View>

                </View>


            });


        return (
            <View>


                <View style={{
                    height: 1.6,
                    width: 5,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'start',
                    layoutOrigin: [-.077, .9],
                    backgroundColor: "lightblue",
                    transform: [
                        {translateX: 0},
                        {translateZ: 0}]
                }}>

                    <Text
                        style={{
                            width: 5,
                            height: .15,
                            fontSize: .1,
                            fontWeight: 400,
                            textAlign: 'center',
                            backgroundColor: "lightgray",
                            color: "black"

                        }}>
                        {this.props.buy.title}
                    </Text>

                    <View style={{
                        height: .3,
                        width: 5,
                        layoutOrigin: [0, 0],
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {order}


                    </View>
                    <View style={{
                        height: .6,
                        width: 3,
                        marginTop: .18,
                        marginBottom: 0,
                        layoutOrigin: [-0.05, 0],
                        opacity: 1,
                        flexDirection: 'column',
                        alignItems: 'left',
                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                                width: 3,
                                height: .3,
                                fontSize: .13,
                                fontWeight: 300,
                                textAlign: 'left',
                                marginLeft: 1,
                                opacity: 1,
                                justifyContent: 'start',
                                color: "black"

                            }}>
                            {this.props.buy.error}
                        </Text>
                        <Text
                            style={{
                                width: 3,
                                height: .15,
                                fontSize: .13,
                                fontWeight: 300,
                                textAlign: 'left',
                                marginLeft: 1,
                                opacity: 1,
                                justifyContent: 'start',
                                color: "black"

                            }}>
                            {this.props.buy.info}
                        </Text>

                        <View
                            style={{
                                marginLeft: 0.1,
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
                                    {"Buy"}
                                </Text>
                            </VrButton>
                        </View>

                    </View>
                </View>


            </View>


        )
    }
}

module
    .exports = AcquireBuyStockLayout;
