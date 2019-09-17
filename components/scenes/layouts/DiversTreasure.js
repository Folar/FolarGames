import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';
import TreasureRow from './elements/TreasureRow.js';


//Element
class DiversTreasure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "black",
            backgroundColor: "blue",
            value: 1

        };
    }

    componentDidMount() {

    }

    render() {
        let players = [];
        let O = 25;
        let rnd = 1
        let m =this.props.data.players;

        if(m != null){
            players = m;
            O = this.props.data.oxygen;
            rnd = this.props.data.round;
        }
        var p =players.map((item, index) => {
                return(
                    <View key={index} style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <TreasureRow   key={index} player={item} />
                    </View>
                );

        });
        return (
            <View style={{
                layoutOrigin: [this.props.x, this.props.y],opacity:1,
                flexDirection: 'column', height:3.4,width:1.5, paddingLeft:.1,
                // backgroundColor:"#AAAAAA",
                alignItems: 'flex-start', justifyContent: 'flex-start'
            }}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <Text
                        style={{
                            width: 0.52,
                            height: .25,
                            fontSize: 0.15,
                            textAlign: 'left',
                            color: "white",

                        }}>
                        {""}
                    </Text>


                    <Text
                        style={{
                            width: 0.35,
                            height: .25,
                            opacity:1,
                            fontSize: 0.15,
                            textAlign: 'center',
                            color: "white",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"S"}
                    </Text>
                    <Text
                        style={{
                            width: 0.28,
                            height: .25,
                            fontSize: 0.15,
                            textAlign: 'center',
                            color: "white",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"M "}
                    </Text>

                    <Text
                        style={{
                            width: 0.35,
                            height: .25,
                            fontSize: 0.15,
                            textAlign: 'center',
                            color: "white",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"L "}
                    </Text>

                    <Text
                        style={{
                            width: 0.35,
                            height: .25,
                            fontSize: 0.15,
                            textAlign: 'center',
                            color: "white",
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"XL"}
                    </Text>


                </View>
                {p}


            </View>
        )
    }
}

module.exports = DiversTreasure;