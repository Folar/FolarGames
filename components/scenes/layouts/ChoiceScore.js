import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';
import ChoiceScoreRow from './elements/ChoiceScoreRow.js';


//Element
class ChoiceScore extends React.Component {
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

        let m =this.props.data.players;

        if(m != null){
            console.log(m[0].score);
            players = m;

        }
        var p =players.map((item, index) => {
            if(this.props.data.currentIndex == index)
                return(
                        <View key={index} style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' ,backgroundColor:"white"}}>
                                <ChoiceScoreRow style={{backgroundColor:"white"}}  key={index} player={item} />
                        </View>
                    );
            if(item.done)
                return(
                    <View key={index} style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' ,backgroundColor:"red"}}>
                        <ChoiceScoreRow style={{backgroundColor:"red"}}  key={index} player={item} />
                    </View>
                );
            return  (
                <View key={index} style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' ,backgroundColor:"lightgray"}}>
                    <ChoiceScoreRow style={{backgroundColor:"#0808008"}}  key={index} player={item} />
                </View>
            );
        });
        return (
            <View style={{
                layoutOrigin: [0,0],opacity:1,
                flexDirection: 'column', height:3.4,width:1.5, paddingLeft:.1,
                // backgroundColor:"#AAAAAA",
                alignItems: 'flex-start', justifyContent: 'flex-start'
            }}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start',backgroundColor:"lightgray"}}>
                    <Text
                        style={{
                            width: 0.55,
                            height: .25,
                            fontSize: 0.15,
                            textAlign: 'left',
                            color: this.state.color,

                        }}>
                        {""}
                    </Text>


                    <Text
                        style={{
                            width: 0.49,
                            height: .25,
                            fontSize: 0.15,
                            textAlign: 'left',
                            color: this.state.color,

                        }}>
                        {"Score"}
                    </Text>




                </View>
                {p}

            </View>
        )
    }
}

module.exports = ChoiceScore;