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
            displayMove: 0,
            displayPlay:this.props.data.state == 4?1:0
        };

    }


    zoom() {

    }

    componentDidMount() {

    }

    clear() {

        for(let i in this.props.sels) {
            this.props.sels[i]= false;
        }
        this.setState({ displayMove: 0});
        this.props.notifySelect();
    }


    getSelectedCards(remove ){
        let cards = [];
        for(let i = this.props.data.hand.length-1; i>=0;i--) {
            if (this.props.sels[i]) {
                cards.push(this.props.data.hand[i]);
                if(remove) {
                    this.props.data.hand.splice(i, 1);
                    this.props.sels[i]=false;
                }
            }
        }
        if (remove)
            this.setState({ displayMove: 0});

        return cards;
    }

    selector(i) {
        if(this.props.hand.length  <2){
            this.setState({ displayMove: 0});
        }
        this.props.sels[i] = !this.props.sels[i];

        if(this.props.hand.length  <2){
            this.setState({ displayMove: 0});
        } else if (this.props.sels.includes(true))
            this.setState({ displayMove: 1});
        else
            this.setState({ displayMove: 0});

        // debugger;
        this.props.notifySelect();
    }
    compare(a, b) {
        return (a.ordinal - b.ordinal) ;
    }

    move() {
        // this.props.test();
        // return;
        let selected = [];
        let newHand = [];
        for (let i in this.props.hand){
            if(this.props.sels[i]) {
                selected.push(this.props.hand[i]);
                this.props.sels[i] = false;
            }else
                newHand.push(this.props.hand[i]);
        }
        selected.sort(this.compare);
        for (let i in selected){
            newHand.push(selected[i]);
        }
        this.props.setHand( newHand);
        this.setState({ displayMove: 0});
        this.props.notifySelect();
    }

    foo(item, index,arr) {
        return <PlayingCard selector={this.selector.bind(this)}  select={this.props.sels[index]}
                            index={index} sz={.35} suit={item.suit} rank={item.rank} canClick={true}/>
    }
    render() {


        let g = null;

        g = this.props.hand.map(this.foo,this);

        let rit = "Clicking the Move button will transfer all the selected cards to right-hand side in rank order";
        if(this.props.data.state != 0)
            rit = this.props.text;

        let mw = this.props.w;
        let mv = false;
        let dieDim = {height: .07, width: .2, valueFont: .1, dieFont: .05, marginRight: .02};
        let line2 =    <View style={{
            width: .45,
            height: .07,
            margin: .01,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        }}>
            <View style={{
                width: .45,
                opacity: this.state.displayMove,
                height: .07,
                marginLeft: .02,
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
                marginLeft: -.215,
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

        let rightText = <View
            style={{
                opacity: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: .535,
                paddingRight:.01,
                backgroundColor:this.props.instructionColor,
                height: this.props.h

            }}>
            <Text
                style={{
                    fontSize: .03,
                    textAlign: 'left',
                    marginTop: .008,
                    marginLeft: .015,
                    color:"black",
                    backgroundColor:this.props.instructionColor
                }}>
                {rit}
            </Text>
        </View>



        if( this.props.hand.length  <2 && this.props.data.state == 0){
            rightText = <View/>;
        } else if(!this.state.displayMove  && this.props.hand.length  >1 ){
            if (this.props.data.state == 0)
                rightText = <View/>;
            line2 =    <View style={{
                width: .7,
                height: .07,
                margin: .01,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
            }}>
                    <Text
                        style={{
                            fontSize: .03,
                            textAlign: 'left',
                            marginTop: .008,
                            marginLeft: .015,
                            color:"black"
                        }}>
                        {"At anytime you can select 1 or more cards and then click the Move button to group the cards together"}
                    </Text>

            </View>

        }

        return (


            <View
                style={{
                    opacity: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: mw,
                    height: this.props.h,
                    backgroundColor: this.props.bgColor

                }}>

                <View
                    style={{
                        opacity: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        width: .77,
                        height: this.props.h,
                        backgroundColor: this.props.bgColor

                    }}>
                    <View style={{
                        width: .7,
                        height: .07,
                        marginTop: .02,
                        marginLeft: .03,
                        marginBottom:.02,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        {g}
                    </View>
                    {line2}
                </View>
                {rightText}
            </View>
        )


    }
}

module
    .exports = MyPanHand;
