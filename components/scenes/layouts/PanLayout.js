import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';

import PlayingCard from './elements/PlayingCard.js';
import CardLabel from './elements/CardLabel.js';
import CardTableLayout from './CardTableLayout.js';

//Layout
class PanLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zorder: this.props.zorder-.91,

        };

    }

    zoom(e){
debugger;
    }
    componentDidMount() {

    }



    render() {




        let w = 2.1;
        let h = 1.2;
        return (
            <View
                style={{
                    opacity: 1,
                    backgroundColor:"green"

                }}>

                <View style={{
                    width:2.1,
                    height:.9,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    layoutOrigin: [.5, .5],
                    borderRadius: 0.1,
                    backgroundColor:"green",

                    transform: [
                        {translateX: 0},
                        {translateZ: 3+this.state.zorder}]
                }}>

                    <CardTableLayout h={h} w={w} data={this.props.data}
                                     sendmessage={this.props.sendmessage}
                                     name={this.props.name}/>
                </View>


            </View>



        )
    }
}

module
    .exports = PanLayout;
