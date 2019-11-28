import React from 'react';
import {
    View,
    Text
} from 'react-vr';


import ChoiceGaitRowLayout from './ChoiceGaitRowLayout.js';
import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';
//Layout
class BocaTextScoreLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            showButton: true
        }
    }

    componentDidMount() {

    }


    render() {
        let names= [];
         for(let i in this.props.bocaData.players)
            names.push( this.props.bocaData.players[i].name);

        let nameList = names.map((item, index) => {
            let val = item;
            if (!this.props.bocaData.buttonText.startsWith("Start Rnd")&&
                this.props.bocaData.buttonText != "Finish" &&
                this.props.bocaData.buttonText != "Start" &&
                this.props.bocaData.buttonText != "Restart") {
                let X =  "";
                if (this.props.bocaData.players[index].diceXLeft >0)
                    X = ","+ this.props.bocaData.players[index].diceXLeft;
                val += "("+this.props.bocaData.players[index].diceLeft+ X +")";
            }
            console.log(this.props.bocaData.buttonText);
            if (this.props.bocaData.buttonText.startsWith("Start Rnd")||
                this.props.bocaData.buttonText == "Finish") {
                if(item == this.props.bocaData.players[index].name)
                    val += ": " + this.props.bocaData.players[index].money + " grand*"
            } else if (this.props.bocaData.buttonText == "Restart") {
                if(item == this.props.bocaData.players[index].name)
                    val += ": " + this.props.bocaData.players[index].money + " grand"
            } else if (this.props.player == item)
                val +=": "+ this.props.bocaData.players[index].money + " grand";
            if(item == this.props.bocaData.currentPlayer && this.props.bocaData.buttonText!= "Reset")
                return <Text style={{width:1 ,color: "black",backgroundColor:"white"}} key={index}>{val}</Text>
            return <Text style={{width:1 ,color: "black"}} key={index}>{val}</Text>
        });
        return (
            <View>


                <View style={{
                    margin: 0.01,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'

                }}>


                    <View style={{
                        height: .75,
                        width: 1,
                        paddingTop:.02,

                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        {nameList}
                    </View>

                   <Text
                        style={{
                            fontSize: 0.13,
                            width: 1.52,
                            height: 1,
                            textAlign: 'left',
                            color: "#000000"
                        }}>
                        {this.props.message}
                    </Text>

                    {this.props.bocaData.round <5 ? (<Text
                        style={{
                            fontSize: 0.18,
                            width: 1.52,
                            height: .3,
                            textAlign: 'flex-start',
                            justifyContent: 'flex-start',
                            color: "#000000"
                        }}>
                            {"Round "+this.props.bocaData.round}
                    </Text>) : (<Text>&nbsp;</Text>)
                    }

                </View>

            </View>
        )
    }
}

module.exports = BocaTextScoreLayout;
