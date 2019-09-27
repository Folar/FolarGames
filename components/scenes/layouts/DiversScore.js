import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';
import DiverScoreRow from './elements/DiverScoreRow.js';


//Element
class DiversScore extends React.Component {
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
// cp={this.props.data.currentIndex == index?"white":""}
            if(this.props.data.currentIndex == index)
            return(
                    <View key={index} style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' ,backgroundColor:"white"}}>
                            <DiverScoreRow style={{backgroundColor:"white"}}  key={index} player={item} />
                    </View>
                );
            return  (
                <View key={index} style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' ,backgroundColor:"lightgray"}}>
                    <DiverScoreRow style={{backgroundColor:"#0808008"}}  key={index} player={item} />
                </View>
            );
        });
        return (
            <View style={{
                layoutOrigin: [-.5,.65],opacity:1,
                flexDirection: 'column', height:3.4,width:1.5, paddingLeft:.1,
                // backgroundColor:"#AAAAAA",
                alignItems: 'flex-start', justifyContent: 'flex-start'
            }}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start',backgroundColor:"lightgray"}}>
                    <Text
                        style={{
                            width: 0.52,
                            height: .25,
                            fontSize: 0.15,
                            textAlign: 'left',
                            color: this.state.color,

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
                            color: this.state.color,
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"Score"}
                    </Text>
                    <Text
                        style={{
                            width: 0.28,
                            height: .25,
                            fontSize: 0.15,
                            textAlign: 'center',
                            color: this.state.color,
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"Trs"}
                    </Text>

                    <Text
                        style={{
                            width: 0.35,
                            height: .25,
                            fontSize: 0.15,
                            textAlign: 'center',
                            color: this.state.color,
                            transform: [
                                {translateY: 0}
                            ]
                        }}>
                        {"Dir"}
                    </Text>




                </View>
                {p}
                <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start',backgroundColor:"lightgray", paddingTop:.1,}}>
                    <Text
                        style={{
                            width: 1.5,
                            height: .35,
                            fontSize: 0.20,
                            textAlign: 'left',
                            color: this.state.color,

                        }}>
                        {"Oxygen:"+O+"/25"}
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor:"lightgray"}}>
                    <Text
                        style={{
                            width: 1.5,
                            height: .35,
                            fontSize: 0.20,
                            textAlign: 'left',
                            color: this.state.color,

                        }}>
                        {"Round:"+rnd}
                    </Text>
                </View>

            </View>
        )
    }
}

module.exports = DiversScore;