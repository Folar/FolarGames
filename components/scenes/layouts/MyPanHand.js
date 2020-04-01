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
            sels: [false, false, false, false, false, false, false, false, false, false],
            displayMove: 0
        };

    }


    zoom() {

    }

    componentDidMount() {

    }

    clear() {
        this.setState({
            sels: [false, false, false, false, false, false, false, false, false, false],
            displayMove: 0
        });
    }

    selector(i) {
        this.state.sels[i] = !this.state.sels[i];
        // debugger;
        if (this.state.sels.includes(true))
            this.setState({sels: this.state.sels, displayMove: 1});
        else
            this.setState({sels: this.state.sels, displayMove: 0});

    }
    compare(a, b) {
        return (a.ordinal - b.ordinal) ;
    }

    move() {
        let selected = [];
        let newHand = [];
        for (let i in this.state.sels){
            if(this.state.sels[i])
                selected.push(this.props.hand[i]);
            else
                newHand.push(this.props.hand[i]);
        }
        selected.sort(this.compare);
        for (let i in selected){
            newHand.push(selected[i]);
        }
        this.props.setHand( newHand);

        this.setState({
            sels: [false, false, false, false, false, false, false, false, false, false],
            displayMove: 0
        });
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
        let mv = false;
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
                    margin: .02,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'
                }}>
                    {g}
                </View>
                <View style={{
                    width: .45,
                    height: .07,
                    margin: .015,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'
                }}>
                    <View style={{
                        width: .45,
                        height: .07,
                        marginLeft: .1,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        <VrButton onClick={this.clear.bind(this)} key={0}>
                            <Die value={"Clear"} key={0} dim={dieDim} color={"black"}
                                 backgroundColor={"brown"}/>
                        </VrButton>

                    </View>

                    <View style={{
                        width: .45,
                        height: .07,
                        opacity: this.state.displayMove,
                        marginLeft: -.14,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        <VrButton onClick={this.move.bind(this)} key={0}>
                            <Die value={"Move"} key={0} dim={dieDim} color={"black"}
                                 backgroundColor={"brown"}/>
                        </VrButton>

                    </View>
                </View>
            </View>
        )


    }
}

module
    .exports = MyPanHand;
