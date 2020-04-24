import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';


import PlayingCard from './elements/PlayingCard.js';


//Layout
class PanMuck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           actionState:1
        };

    }


    componentDidMount() {

    }

    click1(){
        if(this.props.data.currentPlayer == this.props.data.playerId)
            this.props.action(1);
    }
    click2(){
        if(this.props.data.currentPlayer == this.props.data.playerId)
            this.props.action(2);
    }

    getText1(){

        let data = this.props.data;
        let state = data.players[data.currentPlayer].state;
        console.log( " text state ="+state);
        if (state == 1 || state == 2 || state == 5 || state == 6  || state == 7){
            return "Draw";
        }
        if ( state == 3){
            return "Pickup";
        }
        if (state == 101 )
            return "Ante"
        if (state == 102)
            return "Play"
        return "";

    }
    getText2(){
        let data = this.props.data;
        let state = data.players[data.currentPlayer].state;
        console.log( " text state ="+state);
        if ( state == 3 ){
            return "Pass";
        }
        if ( state == 6 ){
            return "Pickup";
        }
        if (state == 101 || state == 102)
            return "Pass"
        return "";

    }
    showButton1(){

        let data = this.props.data;
        let state = data.players[data.currentPlayer].state;
        if ( state == 1 || state == 2 || state == 3
            || state == 5 || state == 6 || state == 7 || state == 101 || state == 102  ){
            return 1;
        }
        return 0;

    }

    showButton2(){
        let data = this.props.data;
        let state = data.players[data.currentPlayer].state;
        console.log( " show state ="+ state);
        if ( state == 3 || state == 6  || state == 101 ||  state == 102 ){
            return 1;
        }
        return 0;

    }


    render() {


        return (


                <View key={this.props.data.currentCard.suit+this.props.data.currentCard.rank} style={{
                    width: this.props.w,
                    height: this.props.h,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    backgroundColor: "#6b8e23",

                }}>
                    <View style={{
                        width: this.props.w/2,
                        height: this.props.h,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'

                    }}>

                        <View style={{
                         marginLeft:.02

                        }}>
                            <PlayingCard index={133} sz={.52}
                                         suit={this.props.data.currentCard.suit}
                                         rank={this.props.data.currentCard.rank}/>
                        </View>
                        <View style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            flexDirection: 'column',
                            width: .194 * .52 + .08,
                            height: .264 * .52
                        }}>
                            <View
                                style={{
                                    opacity: this.showButton1(),
                                    marginLeft: 0,
                                    marginRight:.02,
                                    marginBottom:.005,
                                    flexDirection: 'row',
                                    backgroundColor:  this.props.data.currentPlayer == this.props.data.playerId?"brown":"gray",
                                    width: .194 * .52,
                                    height: .264 * .25
                                }}>


                                <VrButton onClick={this.click1.bind(this)} key={0}>
                                    <Text
                                        style={{
                                            fontSize: .03,
                                            textAlign: 'left',
                                            marginTop: .008,
                                            marginLeft: .015,
                                            color:"black"
                                        }}>
                                        {this.getText1()}
                                    </Text>
                                </VrButton>
                            </View>
                            <View
                                style={{
                                    opacity:  this.showButton2(),
                                    marginLeft: 0,
                                    marginRight:.02,
                                    flexDirection: 'row',
                                    backgroundColor:  this.props.data.currentPlayer == this.props.data.playerId?"brown":"gray",
                                    width: .194 * .52,
                                    height: .264 * .25
                                }}>


                                <VrButton onClick={this.click2.bind(this)} key={0}>
                                    <Text
                                        style={{
                                            fontSize: .03,
                                            textAlign: 'left',
                                            marginTop: .008,
                                            marginLeft: .015,
                                            color:"black"
                                        }}>
                                        {this.getText2()}
                                    </Text>
                                </VrButton>
                            </View>

                        </View>
                    </View>
                    <View style={{
                        width: this.props.w/4,
                        height: this.props.h,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <Text
                            style={{
                                fontSize: .08,
                                textAlign: 'center',
                                width: this.props.w/6,
                                height: this.props.h/2,
                                margin: .025,
                                color:"black",
                                backgroundColor:"white"
                            }}>
                            {this.props.data.kitty}
                        </Text>

                    </View>

                </View>





        )
    }
}

module
    .exports = PanMuck;
