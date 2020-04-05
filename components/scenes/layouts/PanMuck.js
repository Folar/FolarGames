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
        this.props.action(1);
    }
    click2(){
        this.props.action(2);
    }

    getText1(){
        let data = this.props.data;
        if (data.currentPlayer == data.playerId &&
            (data.state == 1 ||data.state == 2 || data.state == 5 || data.state == 6  || data.state == 7)){
            return "Draw";
        }
        if (data.currentPlayer == data.playerId && data.state == 3){
            return "Pickup";
        }
        return "";

    }
    getText2(){
        let data = this.props.data;
        console.log( " text state ="+ data.state);
        if (data.currentPlayer == data.playerId && data.state == 3 ){
            return "Pass";
        }
        if (data.currentPlayer == data.playerId && data.state == 6 ){
            debugger;
            return "Pickup";
        }
        return "";

    }
    showButton1(){
        let data = this.props.data;
        if (data.currentPlayer == data.playerId &&
               (data.state == 1 ||data.state == 2 || data.state == 3
                   || data.state == 5 ||data.state == 6 || data.state == 7  )){
            return 1;
        }
       return 0;

    }

    showButton2(){
        let data = this.props.data;
        console.log( " show state ="+ data.state);
        if (data.currentPlayer == data.playerId &&  (data.state == 3 || data.state == 6 )){
            return 1;
        }
        return 0;

    }
    render() {


        return (


                <View style={{
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
                                         suit={this.props.suit}
                                         rank={this.props.rank}/>
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
                                    backgroundColor: "brown",
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
                                    backgroundColor: "brown",
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
                                textAlign: 'left',
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
