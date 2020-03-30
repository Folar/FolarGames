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
class CardLabel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom:3.8

        };

    }

    zoom(){

    }
    componentDidMount() {

    }



    render() {


        let parms = {rank:this.props.rank,suit:this.props.suit, sz: this.props.sz, rotation: this.props.rotation};
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


        return (
            <View
                style={{
                    opacity: 1,
                    marginRight:.002,
                    marginTop:.007

                }}>

                <View style={{

                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                    backgroundColor:"white",
                    transform: [

                        {rotateZ:parms.rotation}]
                }}>

                    <VrButton onClick={this.zoom.bind(this)}>
                        <View style={{

                            backgroundColor:"white",
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: parms.sz,
                            height: parms.sz *2  + .01
                        }}>
                            <Text
                                style={{
                                    fontSize: parms.sz,
                                    textAlign: 'center',
                                    color: color,
                                    backgroundColor:"white"
                                }}>
                                {parms.rank}
                            </Text>
                             <Image
                                style={{
                                    width: parms.sz,
                                    height: parms.sz

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
    .exports = CardLabel;
