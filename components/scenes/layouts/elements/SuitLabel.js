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
class SuitLabel extends React.Component {

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


        let parms = {suit:this.props.suit, sz: this.props.sz};
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
                    opacity: 1

                }}>

                <View style={{

                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:"white",

                }}>

                    <VrButton >
                        <View style={{
                            offsetX:.2,
                            //layoutOrigin: [.4, .4],
                            backgroundColor:"white",
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
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
    .exports = SuitLabel;
