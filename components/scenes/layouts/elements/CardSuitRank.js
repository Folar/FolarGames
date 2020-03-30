import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';

import ButtonClickable from './ButtonClickable.js';

//Layout
class CardSuitRank extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            select:1

        };

    }

    zoom(e){
    }
    componentDidMount() {

    }



    render() {


        let parms = {rank:this.props.rank,suit:this.props.suit, sz: this.props.sz};
        let color = parms.suit == 'c' ||  parms.suit == 's' ? 'black' :'red';
        let suit = "";
        switch (parms.suit) {
            case 's':
                suit = 'spade.png'
                break;
            case 'h':
                suit = 'heart.png'
                break;
            case 'd':
                suit = 'diamond.jpeg'
                break;
            case 'c':
                suit = 'club.png'
                break;
        }
        switch (this.props.rank) {
            case 1:
                parms.rank = 'A';
                break;

            case 11:
                parms.rank = 'J';
                break;
            case 12:
                parms.rank = 'Q';
                break;
            case 13:
                parms.rank = 'K';
                break;
        }

        return (
            <View
                style={{
                    opacity: 1,
                    marginRight:.002,
                    marginTop:.007,
                    width: parms.sz,
                    height: parms.sz *2  + .01
                }}>

                <View style={{

                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:"white"

                }}>

                    <VrButton onClick={this.zoom.bind(this)}>
                        <View style={{
                            opacity:this.state.select,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text
                                style={{
                                    width:this.props.sz,
                                    fontSize: parms.sz,
                                    textAlign: 'center',
                                    color: color,
                                    backgroundColor:"white"
                                }}>
                                {parms.rank+" "}
                            </Text>
                            <Image
                                style={{
                                    width: this.props.sz,
                                    height: this.props.sz

                                }}
                                source={asset(suit)}
                            >
                            </Image>
                        </View>
                    </VrButton>
                </View>


            </View>



        )
    }
}

module
    .exports = CardSuitRank ;
