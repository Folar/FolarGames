import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;

import AcquireRowLayout from './AcquireRowLayout.js';
import AcquireHotelLayout from './AcquireHotelLayout.js';
import AcquireSubHotelLayout from './AcquireSubHotelLayout.js';
import AcquireTileLayout from './AcquireTileLayout.js';

import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';
import AcquireHotelStats from "./AcquireHotelStats";
//Layout
class AcquireBoardLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showButton: true
        }
        this.msg = "";
        this.lastMsg = "";
    }

    componentDidMount() {

    }

    getMessages(){

        if(this.props.data.message && this.props.data.message.length!= 0)
             if (this.props.data.message  !=this.lastMsg) {
                 this.lastMsg = this.props.data.message;
                 this.msg = this.props.data.message +"\n"+ this.msg;
             }
        console.log("+++ " +this.msg +"+++ ");
        return this.msg;
    }
    getScore(row){

        return "0"
    }




    render() {

        let scoreRows =
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((item, index) => {
              return  <AcquireRowLayout style={{backgroundColor:"#0808008", opacity:1}} rank={item} value={item}
                                        key={index} score={this.getScore(item)}/>

            });
        return (

            <View>


                <View style={{
                    margin: 0.0,
                    flexDirection: 'column',
                    height:1.85,
                    padding: 0,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'

                }}>
                    <AcquireHotelLayout/>
                    <AcquireSubHotelLayout  hotels={this.props.hotels} players={this.props.players}/>
                    {scoreRows}
                    <AcquireTileLayout player={this.props.players[this.props.playerIndex]} buttonText={this.props.data.buttonText}
                                       playing={this.props.players[this.props.playerIndex].playing}
                                       invokeServer={this.props.invokeServer}/>
                    <View style={{
                        height: 4,
                        width: 2.8,
                        // backgroundColor:"lightblue",
                        // opacity:.5,
                        marginTop:.1,
                        marginBottom:.1,
                        layoutOrigin: [0, 0],
                        flexDirection: 'column',
                        alignItems: 'left',
                        justifyContent: 'flex-start'
                    }}>
                        <Text
                            style={{
                                width: 2.8,
                                height: .5,
                                fontSize: .13,
                                fontWeight:300,
                                textAlign: 'left',
                                marginLeft:1,
                                justifyContent: 'start',
                                color:"black"

                            }}>
                            {this.getMessages()}
                        </Text>
                    </View>
                </View>



            </View>
        )
    }
}

module.exports = AcquireBoardLayout;
