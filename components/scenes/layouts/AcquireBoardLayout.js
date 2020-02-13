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
                 this.msg = this.msg.length>0?this.props.data.message +"\n"+ this.msg : this.props.data.message;
             }
      //  console.log("+++ " +this.msg +"+++ ");
        return this.msg;
    }
    getScore(row){

        return "0"
    }

    getPlaying(){
        //console.log("cxgh "+this.props.players[parseInt(this.props.playerIndex)].playing)
        return this.props.players[parseInt(this.props.playerIndex)].playing
    }
    getButtonText() {


            if (this.getPlaying()) {
                if( this.props.data.canEnd)
                    return "End";
                if( this.props.data.over)
                    return "Reload";
                return "";
            }

        return "Start"
    }
    actionServer(){
        if (this.getPlaying()) {
            if( this.props.data.canEnd)
                this.props.invokeServer("End");
            if( this.props.data.over)
                this.props.invokeServer("Reload")
            return;
        }else{
            debugger;
            this.props.invokeServer("Start");
        }



    }

    render() {

        let scoreRows =
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((item, index) => {
                console.log("ind "+index)
              return  <AcquireRowLayout style={{backgroundColor:"#0808008", opacity:1}}
                                        rank={item} value={item} row={index}
                                        invokeServer={this.props.invokeServer}
                                        key={index} tiles={this.props.data.tiles}/>

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
                    <AcquireHotelLayout gameState={this.props.data.gameState} hotels={this.props.hotels} invokeServer={this.props.invokeServer}/>
                    <AcquireSubHotelLayout  hotels={this.props.hotels} players={this.props.players}/>
                    {scoreRows}
                    <AcquireTileLayout player={this.props.players[this.props.playerIndex]}
                                       buttonText={this.getButtonText()} rack={this.props.data.rack}
                                       actionServer={this.actionServer.bind(this)}
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
                                height: 5,
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
