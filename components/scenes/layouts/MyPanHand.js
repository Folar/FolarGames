import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';

import CardSuitRank from './elements/CardSuitRank.js';
import PlayingCard from './elements/PlayingCard.js';

//Layout
class MyPanHand extends React.Component {

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


        let g = null;

            g = this.props.hand.map((item, index) => {
                return <PlayingCard  sz={.35} suit={item.suit} rank={item.rank} />
            });


        let mw = 1.25;
        return (

            <View
                style={{
                    opacity: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: mw,
                    height: .22,
                    backgroundColor: this.props.bgColor

                }}>

                            <View style={{
                                width: .45,
                                height: .07,
                                margin:.02,
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start'
                            }}>
                                {g}
                            </View>
                    </View>
                )



    }
}

module
    .exports = MyPanHand;
