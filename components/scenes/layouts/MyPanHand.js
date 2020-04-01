import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';

import Die from './elements/Die.js';
import PlayingCard from './elements/PlayingCard.js';

//Layout
class MyPanHand extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sels : [false,false,false,false,false,false,false,false,false,false]
        };

    }


    zoom() {

    }

    componentDidMount() {

    }
    clear(){
        this.setState({sels:[false,false,false,false,false,false,false,false,false,false]});
    }

    selector(i) {
        this.state.sels[i] = ! this.state.sels[i];
       // debugger;
        this.setState({sels:this.state.sels});

    }
    move(pos){


    }
    render() {


        let g = null;
            console.log(this.state.sels[0])
            g = this.props.hand.map((item, index) => {
                return <PlayingCard selector={this.selector.bind(this)} clear={this.clear.bind(this)}
                                    move={this.move.bind(this)} select={this.state.sels[index]}
                                    index={index} sz={.35} suit={item.suit} rank={item.rank} canClick={true}/>
            });


        let mw = 1.25;
        let dieDim = {height: .07, width: .2, valueFont: .1, dieFont: .05, marginRight: .02};
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

                        <View style={{
                            width: .45,
                            height: .07,
                            margin:.02,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start'
                        }}>
                            <VrButton onClick={this.clear.bind(this)} key={0}>
                                <Die value={"Clear"} key={0} dim={dieDim} color={"black"}
                                     backgroundColor={"brown"}/>
                            </VrButton>

                        </View>
                    </View>
                )



    }
}

module
    .exports = MyPanHand;
