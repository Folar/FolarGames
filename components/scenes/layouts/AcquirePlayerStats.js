import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';
import AcquirePlayerStatRow from './elements/AcquirePlayerStatRow.js';

var players =[
    {
        name: "Larry",
        luxor:0,
        tower:1,
        american:5,
        festival:0,
        worldwide: 25,
        continental: 0,
        imperial: 0,
        money:6000
    },
    {
        name: "dino",
        luxor:0,
        tower:1,
        american:5,
        festival:0,
        worldwide: 25,
        continental: 0,
        imperial: 0,
        money:4500
    },
    {
        name: "jacob",
        luxor:0,
        tower:1,
        american:5,
        festival:0,
        worldwide: 25,
        continental: 0,
        imperial: 0,
        money:700
    },
    {
        name: "Peter",
        luxor:0,
        tower:1,
        american:5,
        festival:0,
        worldwide: 25,
        continental: 0,
        imperial: 0,
        money:6000
    },
    {
        name: "joey",
        luxor:0,
        tower:1,
        american:5,
        festival:0,
        worldwide: 2,
        continental: 0,
        imperial: 0,
        money:4500
    },
    {
        name: "trump",
        luxor:0,
        tower:1,
        american:5,
        festival:0,
        worldwide: 25,
        continental: 0,
        imperial: 0,
        money:700
    }






];
//Element
class AcquirePlayerStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "black",
            backgroundColor: "white",
            hotelWidth : .15,
            value:1

        };
    }

    componentDidMount() {

    }
    getRowColor(i){
        return "white";
    }

    render() {

        var color = "white"
        var p =players.map((item, index) => {

            return  (
                <View key={index} style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'
                    }}>
                    <AcquirePlayerStatRow  rc={this.getRowColor(index)} key={index} player={item} />
                </View>
            );
        });
        return (
            <View style={{
                layoutOrigin: [0,0],opacity:1,
                flexDirection: 'column', height:3.4,width:1, paddingLeft:.1,
                alignItems: 'flex-start', justifyContent: 'flex-start'
            }}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <Text
                        style={{
                            width: 0.66,
                            height: .20,
                            fontSize: 0.11,
                            textAlign: 'left',
                            color: this.state.color,
                            backgroundColor:"white"

                        }}>
                        {""}
                    </Text>


                    <Text
                        style={{
                            width: this.state.hotelWidth,
                            height: .20,
                            opacity:1,
                            fontSize: 0.11,
                            textAlign: 'center',
                            color: "black",
                            backgroundColor:"red",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"L"}
                    </Text>
                    <Text
                        style={{
                            width: this.state.hotelWidth,
                            height: .20,
                            opacity:1,
                            fontSize: 0.11,
                            textAlign: 'center',
                            color: "black",
                            backgroundColor:"yellow",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"T"}
                    </Text>
                    <Text
                        style={{
                            width: this.state.hotelWidth,
                            height: .20,
                            opacity:1,
                            fontSize: 0.11,
                            textAlign: 'center',
                            color: "black",
                            backgroundColor:"#8787ff",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"A"}
                    </Text>
                    <Text
                        style={{
                            width: this.state.hotelWidth,
                            height: .20,
                            opacity:1,
                            fontSize: 0.11,
                            textAlign: 'center',
                            color: "black",
                            backgroundColor:"#c3af91",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"W"}
                    </Text>
                    <Text
                        style={{
                            width: this.state.hotelWidth,
                            height: .20,
                            opacity:1,
                            fontSize: 0.11,
                            textAlign: 'center',
                            color: "black",
                            backgroundColor:"green",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"F"}
                    </Text>
                    <Text
                        style={{
                            width: this.state.hotelWidth,
                            height: .20,
                            opacity:1,
                            fontSize: 0.11,
                            textAlign: 'center',
                            color: "black",
                            backgroundColor:"cyan",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"C"}
                    </Text>
                    <Text
                        style={{
                            width: this.state.hotelWidth,
                            height: .20,
                            opacity:1,
                            fontSize: 0.11,
                            textAlign: 'center',
                            color: "black",
                            backgroundColor:"pink",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"I"}
                    </Text>



                    <Text
                        style={{
                            width: 0.50,
                            height: .20,
                            fontSize: 0.11,
                            textAlign: 'center',
                            color: "black",
                            backgroundColor:"lightgray",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"$$$$"}
                    </Text>




                </View>
                {p}


            </View>
        )
    }
}

module.exports = AcquirePlayerStats;