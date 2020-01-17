import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';
import AcquireHotelStatRow from './elements/AcquireHotelStatRow.js';


//Element
class AcquireHotelStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "black",
            backgroundColor: "blue",
            value:1

        };
    }

    componentDidMount() {

    }
    getRowColor(i){
        return i%2 == 0 ?"white" :"lightblue"
    }

    render() {

        var color = "white"
        var p =this.props.hotels.map((item, index) => {

            return  (
                <View key={index} style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'
                    }}>
                    <AcquireHotelStatRow  rc={this.getRowColor(index)} key={index} hotel={item} />
                </View>
            );
        });
        return (
            <View style={{
                layoutOrigin: [-.1,0],opacity:1,
                flexDirection: 'column', height:3.4,width:2, paddingLeft:.1,
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
                            backgroundColor:"lightgray"

                        }}>
                        {"Hotel"}
                    </Text>


                    <Text
                        style={{
                            width: 0.35,
                            height: .20,
                            opacity:1,
                            fontSize: 0.11,
                            textAlign: 'center',
                            color: "black",
                            backgroundColor:"lightgray",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"Avail"}
                    </Text>
                    <Text
                        style={{
                            width: 0.35,
                            height: .20,
                            fontSize: 0.11,
                            textAlign: 'center',
                            color: "black",
                            backgroundColor:"lightgray",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"Size"}
                    </Text>

                    <Text
                        style={{
                            width: 0.35,
                            height: .20,
                            fontSize: 0.11,
                            textAlign: 'center',
                            color: "black",
                            backgroundColor:"lightgray",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"Price"}
                    </Text>




                </View>
                {p}


            </View>
        )
    }
}

module.exports = AcquireHotelStats;