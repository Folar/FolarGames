import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';

import ButtonClickable from './ButtonClickable.js';
import CardLabel from './CardLabel.js';
import SuitLabel from './SuitLabel.js';

//Layout
class PlayingCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 3.8

        };

    }

    zoom() {

    }

    componentDidMount() {

    }


    render() {


        let parms = {height: 1, width:1};
        let color = parms.suit == 'c' || parms.suit == 's' ? 'black' : 'red';



        return (
            <View
                style={{
                    opacity: 1

                }}>
                <VrButton onClick={this.zoom.bind(this)}>
                    <View style={{

                        flexDirection: 'column',
                        width: .3 * parms.width,
                        height: .4 * parms.height,
                        backgroundColor: "pink"
                    }}>


                        <View style={{

                            backgroundColor: "blue",
                            width: .3 * parms.width,
                            height: .05 * parms.height,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end'
                        }}>
                            <View style={{

                                flexDirection: 'column',
                                width: .025 * parms.width,
                                height: .025 * parms.height,
                                backgroundColor: "yellow"
                            }}>
                                <CardLabel sz={.023} suit={'c'} rotation={0} rank={"J"}
                                           style={{
                                               width: .025 * parms.width,
                                               height: .025 * parms.height
                                           }}/>
                            </View>
                        </View>


                        <View style={{

                            flexDirection: 'column',
                            width: .3 * parms.width,
                            height: .3 * parms.height,
                            backgroundColor: "green"
                        }}>
                        </View>
                        <View style={{

                            backgroundColor: "red",
                            width: .3 * parms.width,
                            height: .05 * parms.height,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end'
                        }}>

                        </View>

                    </View>
                </VrButton>

            </View>


        )
    }
}

module
    .exports = PlayingCard;
