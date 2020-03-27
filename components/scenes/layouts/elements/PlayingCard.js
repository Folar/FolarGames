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
class PlayingCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            select:1

        };

    }

    zoom(e){
        if(this.state.select == 1)
            this.setState({select:.5})
        else
            this.setState({select:1})
    }
    componentDidMount() {

    }



    render() {


        let parms = {rank:this.props.rank,suit:this.props.suit, sz: this.props.sz};



        let suit ="5h.jpg";
        suit =this.props.rank + this.props.suit+".jpg";
        return (
            <View
                style={{
                    opacity: 1,
                    width: .194*  this.props.sz

                }}>

                <View style={{

                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:"gray"

                }}>

                    <VrButton onClick={this.zoom.bind(this)}>
                        <View style={{
                            opacity:this.state.select,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>

                            <Image
                                style={{
                                    width: .194 * this.props.sz,
                                    height: .264 * this.props.sz

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
    .exports = PlayingCard;
