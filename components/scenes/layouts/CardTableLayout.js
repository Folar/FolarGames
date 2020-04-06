import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';

import PanPlayer from './PanPlayer.js';
import PanMuck from './PanMuck.js';
import MyPanHand from './MyPanHand.js'

//Layout
class CardTableLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 3.8,
            data: this.props.data
        };

    }
    createDropSpot(){
        let cards = this.state.data.players[this.state.data.currentPlayer].cards;
        if(cards.length>0 && cards[cards.length-1].money == -1)
            return;
        cards.push({
            group:cards.length,
            sels:[false, false, false, false, false, false, false, false, false, false],
            money:-1,
            cards:[
                {
                    rank:"empty"
                }

            ]

        });
    }

    removeDropSpot(){

        let cards = this.state.data.players[this.state.data.playerId].cards;
        if(cards[cards.length -1].money == -1)
            cards.pop();
    }
    transfer(target, source){
        target.suit=source.suit;
        target.rank= source.rank;
        target.ordinal = source.ordinal;
        target.rankOrdinal= source.rankOrdinal
    }
    pickup(){
        let cards = this.state.data.players[this.state.data.playerId].cards;
        cards[cards.length-1].money = 0;
        let c = cards[cards.length-1].cards[0];
        let cc =  this.state.data.currentCard;
        c.group = cards.length-1;
        this.transfer(c,cc);
        this.createEmptyCard();
    }
    createEmptyCard(){
        this.state.data.currentCard.suit='';
        this.state.data.currentCard.rank='card_back';
        this.state.data.currentCard.rankOrdinal= -1;
        this.state.data.currentCard.ordinal = -1;
    }

    draw(){

        let r =Math.floor( Math.random()*40) ;
        let s= 's';
        switch (r%4){
            case 1:
                s= 'h';
                break;
            case 2:
                s= 'd';
                break;
            case 3:
                s= 'c';
        }

        this.state.data.currentCard.ordinal = r;
        this.state.data.currentCard.suit= s;
        r =Math.floor(r/4);
        r++;
        this.state.data.currentCard.rankOrdinal= r;
        this.state.data.currentCard.rank=r>7?r+3:r;

    }

    getBackgroundColor(p){
        if( this.state.data.currentPlayer == p.playerId){
            return "blue";
        }
        return "#6b8e23";

    }

    action(a) {
        let s = this.state.data.state;
        console.log("start action="+a+ " state="+s);
        //debugger;
        switch (a) {
            case 1:
                if (s == 1) { // draw
                    s =  6;
                    this.draw();
                    this.createDropSpot();
                } else if (s==2 || s == 6 ||  s == 7 ) { // draw
                    s = 3;
                    this.draw();
                    this.createDropSpot();
                } else if (s == 5) { // draw
                    s = 3;
                    this.draw();

                } else if (s == 3) { // pickup
                    this.pickup();
                    s = 4;

                }
                break;
            case 2:
                if (s == 3) {  // pass
                    this.removeDropSpot()
                    s = 5;
                    this.transfer(this.state.data.passCard,this.state.data.currentCard);
                    this.createEmptyCard();
                   // this.state.data.currentPlayer = 2;
                    this.createDropSpot();
                } else if (s == 6) { // pickup

                    s = 4;
                   // this.transfer(this.state.data.currentCard,this.state.data.passCard);
                    this.pickup();
                }
                break;
            case 3:
                if (s == 5) { // pickup
                    s = 4;
                    this.transfer(this.state.data.currentCard,this.state.data.passCard);
                    this.pickup();
                } else if (s == 4) { // confirm
                    this.removeDropSpot();
                     this.refs.myCards.clear();
                    //this.state.data.currentPlayer = 2;
                    s = 7;
                    this.createEmptyCard();

                }
                break;
        }
        this.state.data.state = s;
        console.log("end  state="+s);
        this.setState({data:this.state.data})

    }

    componentDidMount() {

    }

    setMyHand(hand){
        this.state.data.hand = hand;
        this.setState({data:this.state.data})
    }

    render() {

        let h = .22;
        let pw = .6;
        let jw = .65;
        let jh = 3;
        let mw = .65;
        let youw = 1.29;
        let tw = this.props.w;
        let p = [];
        let pid = this.props.data.playerId;
        let nplayers = this.props.data.players.length;
        for (let i = 0; i < nplayers; i++) {
            p.push(this.props.data.players[pid]);
            pid++;
            if (pid == nplayers) pid = 0;
        }
        for (let i = nplayers; i < 8; i++) {
            p.push({playing: false});
        }

        return (
            <View
                style={{
                    opacity: 1

                }}>

                <View style={{

                    flexDirection: 'column',
                    width: tw,
                    height: 1,
                    borderRadius: 0.1,
                    backgroundColor: "green"
                }}>


                    {/* row 1*/}
                    <View style={{

                        flexDirection: 'row',
                        marginTop: .04,
                        marginRight: .045,
                        marginLeft: .025,
                        width: tw-.1,
                        height: h,
                        backgroundColor: "green"
                    }}>
                        {/* row 1: player 5*/}
                        <View style={{

                            flexDirection: 'column',
                            marginTop: 0,
                            marginRight: 0,
                            marginLeft: .045,
                            width: pw,
                            height: h
                        }}>
                            <PanPlayer  h={h} w={pw} ctrlType={0} bgColor={this.getBackgroundColor(p[5])} color={"black"} key={7}
                                        data={this.props.data} player={p[5]}/>
                        </View>
                        {/* row 1: player 4*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 0,
                            marginLeft: .06,
                            width: mw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                            <PanPlayer  h={h} w={mw} ctrlType={0} bgColor={this.getBackgroundColor(p[4])} color={"black"} key={8}
                                        data={this.props.data} player={p[4]}   data={this.props.data}/>
                        </View>
                        {/* row 1: player 3*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'flex_end',
                            justifyContent: 'flex-end',
                            marginTop: 0,
                            marginLeft: .06,
                            width: pw,
                            height: h
                        }}>
                            <PanPlayer  h={h} w={pw}  bgColor={this.getBackgroundColor(p[3])} color={"black"} key={44}
                                        player={p[3]} data={this.props.data}/>
                        </View>
                    </View>



                    {/* row 2*/}
                    <View style={{

                        flexDirection: 'row',
                        marginTop: .01,
                        marginRight: .045,
                        marginLeft: .025,
                        width: tw-.1,
                        height: h,
                        backgroundColor: "green"
                    }}>
                        {/* row 2: player 6*/}
                        <View style={{

                            flexDirection: 'column',
                            marginTop: 0,
                            marginRight: 0,
                            marginLeft: .045,
                            width: pw,
                            height: h
                        }}>
                            <PanPlayer  h={h} w={pw} ctrlType={0} bgColor={this.getBackgroundColor(p[6])}
                                        color={"black"} key={7}
                                        data={this.props.data} player={p[6]}/>
                        </View>
                        {/* row 2: muck*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 0,
                            marginLeft: .06,
                            width: mw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                            <PanMuck  h={h} w={mw} bgColor={"#6b8e23"} color={"black"} key={86}
                                      suit={this.props.data.currentCard.suit}
                                      rank={this.props.data.currentCard.rank}
                                      action={this.action.bind(this)}  data={this.props.data}  />
                        </View>
                        {/* row 2: player 2*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'flex_end',
                            justifyContent: 'flex-end',
                            marginTop: 0,
                            marginLeft: .06,
                            width: pw,
                            height: h
                        }}>
                            <PanPlayer  h={h} w={pw}  bgColor={this.getBackgroundColor(p[2])}
                                        color={"black"} key={144} data={this.props.data} player={p[2]}/>
                        </View>
                    </View>

                    {/*third row*/}
                    <View style={{

                        flexDirection: 'row',
                        marginTop: .01,
                        marginRight: .045,
                        marginLeft: .025,
                        width: tw-.1,
                        height: h,
                        backgroundColor: "green"
                    }}>
                        {/*3rd row : player 7*/}
                        <View style={{

                            flexDirection: 'column',
                            marginTop: 0,
                            marginRight: 0,
                            marginLeft: .045,
                            width: pw,
                            height: h
                        }}>
                            <PanPlayer  h={h} w={pw}   bgColor={this.getBackgroundColor(p[7])} color={"black"} key={7}
                                        data={this.props.data} player={p[7]}/>
                        </View>
                        {/*3rd row : exposed hand*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 0,
                            marginLeft: .06,
                            width: mw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                            <PanPlayer  h={h} w={mw}  bgColor={this.getBackgroundColor(p[0])}
                                        color={"black"} key={8} ref={"myCards"}
                                        action={this.action.bind(this)}  data={this.props.data} player={p[0]}/>
                        </View>
                        {/*3rd row : player 1*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'flex_end',
                            justifyContent: 'flex-end',
                            marginTop: 0,
                            marginLeft: .06,
                            width: pw,
                            height: h
                        }}>
                            <PanPlayer  h={h} w={pw}   bgColor={this.getBackgroundColor(p[1])} color={"black"}
                                        key={44}
                                        data={this.props.data} player={p[1]}/>

                        </View>
                    </View>


                    {/*fourth row*/}
                    <View style={{

                        flexDirection: 'row',
                        marginTop: .01,
                        marginRight: .045,
                        marginLeft: .045,
                        width: tw-.1,
                        height: h,
                        backgroundColor: "green"
                    }}>
                        {/*4th row : journal*/}
                        <View style={{

                            flexDirection: 'column',
                            marginTop: 0,
                            marginRight: 0,
                            marginLeft: .025,
                            width:  jw,
                            height: jh,
                            backgroundColor: "green"
                        }}>
                        </View>

                        {/*4th row : yourhand*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'flex_end',
                            justifyContent: 'flex-end',
                            marginTop: 0,
                            marginLeft: .02,
                            width: youw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                            <MyPanHand bgColor={"#eba117"} color={"black"} key={10} w={youw} h={h}
                                       ref="hand" data={this.props.data}
                                       setHand={this.setMyHand.bind(this)}  hand={this.state.data.hand}/>
                        </View>

                    </View>
                </View>


            </View>


        )
    }
}

module
    .exports = CardTableLayout;
