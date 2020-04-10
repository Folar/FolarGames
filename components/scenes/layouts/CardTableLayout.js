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
            data: this.props.data,
            lastGroup:null,
            border:false,
            borderGroup:-1,
            sels: [false, false, false, false, false, false, false, false, false, false],

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

    createDropSpotError(){
        let cards = this.state.data.players[this.state.data.currentPlayer].cards;
        debugger;
        if(cards.length>0 && cards[cards.length-1].money == -1)
            return;
        cards.push({
            group:cards.length,
            sels:[false, false, false, false, false, false, false, false, false, false],
            money:-1,
            cards:[
                {
                    rank:"error"
                }
            ]

        });
    }

    createDropSpotButton(){
        let cards = this.state.data.players[this.state.data.currentPlayer].cards;
        if(cards.length>0 && cards[cards.length-1].money == -1)
            return;
        cards.push({
            group:cards.length,
            sels:[false, false, false, false, false, false, false, false, false, false],
            money:-1,
            cards:[
                {
                    rank:"emptyButton"
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
        if(cards[cards.length-1].money == -1 )
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
                   this.state.data.currentPlayer = 0;
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
                } else if (s == 4) { // muck
                    this.removeDropSpot();
                    this.refs.hand.getSelectedCards(true);
                    this.refs.myCards.clear();
                    //this.state.data.currentPlayer = 1;
                    s = 7;
                    this.createEmptyCard();
                    this.setState({data: this.props.data,sels:this.state.sels})

                }
                break;
        }
        this.state.data.state = s;
        console.log("end  state="+s);
        this.setState({data:this.state.data})

    }
    compare(a, b) {
        return (a.ordinal - b.ordinal) ;
    }
    foo(){
        debugger;
        this.setState({data: this.props.data,sels:this.state.sels});
    }

    reportError (msg,src){
        this.state.data.instructions = msg;
        this.state.data.instructionColor = "red";
        this.setState({border:true,borderGroup:src,data:this.state.data});
    }

    clearError (msg){
        this.state.data.instructions = msg;
        this.state.data.instructionColor = "black";
        this.setState({border:false,borderGroup:-1,data:this.state.data});
    }

    clickMyTableCard(i,g){
        this.clearError("");
        let data = this.props.data;
        let cards = data.players[data.playerId].cards;
        if(this.count()){

            let cardsFromHand = this.refs.hand.getSelectedCards(true);
            if(cards[g].money == -1 )
                cards.cards=[];
            for(let j in  cardsFromHand){
                cardsFromHand[j].group = g;
                if(cards[g].money == -1 ) {
                    cards[g].money = 0;
                    cards[g].cards= [];


                }

                cards[g].cards.push(cardsFromHand[j]);
            }
            cards[g].cards.sort(this.compare);

            if (cards.length<3) {
                let all3 = true;

                for(let i=0; i< cards.length;i++){
                    if(cards[i].cards.length<3){
                        all3 = false;
                        break;
                    }

                }
                if(all3)
                    this.createDropSpotButton();
            }


        }else {
            let cnt = 0;
            if(this.state.lastGroup == null ||  this.state.lastGroup == g ) {
                cards[g].sels[i] = !cards[g].sels[i];
                for (let j = 0;j < cards[g].cards.length;j++) {
                    if (cards[g].sels[j] )
                        cnt++;
                }
                if(cnt == 0)
                    this.state.lastGroup = null;
                else
                    this.state.lastGroup =g;
            }else {
                let src = this.state.lastGroup;
                let trg = g;


                cnt = 0;
                for (let j =  cards[src].cards.length -1;j>=0;j--) {
                    if (cards[src].sels[j]) {
                        cnt++
                    }
                }
                if (cards[src].cards.length>2 && (cards[src].cards.length -cnt)<3) {
                    this.reportError(
                        "Illegal to move a card from a card group when the number of cards in that group will be less then 3 ",
                        src);
                    return;
                }


                if (cards[trg].money == -1){
                    cards[trg].cards.splice(0,1);
                    cards[trg].money = 0;
                }

                let oldMoney = this.moneyCardGroup(src);
                for (let j =  cards[src].cards.length -1;j>=0;j--) {
                    if (cards[src].sels[j] ) {
                        cards[src].sels[j] = false;
                        cards[src].cards[j].group = trg;
                        cards[trg].cards.push(cards[src].cards[j]);
                        cards[src].cards.splice(j,1);
                    }
                }
                if(cards[src].cards.length == 0 ){
                    cards.splice(src,1);
                    debugger;
                }

                cards[trg].cards.sort(this.compare)
                let newMoney = this.moneyCardGroup(src);

                if (cards.length<3) {
                    let all3 = true;

                    for (let i = 0; i < cards.length; i++) {
                        if (cards[i].cards.length < 3) {
                            all3 = false;
                            break;
                        }

                    }
                    if (all3)
                        this.createDropSpotButton();
                }



                this.state.lastGroup = null;
            }
        }

        this.setState({data: this.props.data,sels:this.state.sels});
    }

    moneyCardGroup(grp){
        return 0;
    }


    componentDidMount() {

    }


    canMuck(){
        if(this.refs.myCards == undefined) return false;

        if(this.refs.myCards.count() == 11)
            return  true;
        if( this.count()!=1){
            return  false;
        }

        let data = this.props.data;
        let cards= data.players[data.currentPlayer].cards;
        for (let i in cards){
            if(cards[i].money >  -1 && cards[i].cards.length<3)
                return false;
        }


        return true;
    }
    setMyHand(hand){
        this.state.data.hand = hand;
        this.setState({data:this.state.data})
    }
    notifySelect (){
        this.clearError("");
        this.refs.myCards.clear();
        this.state.lastGroup = null;
        let cnt = this.count();

        if(cnt == 1){
            this.state.data.discardCard = this.refs.hand.getSelectedCards(false)[0];
        }
        this.setState({sels:this.state.sels});

    }
    count(){
        let cnt = 0;
        for(let i in this.state.sels) {
            if (this.state.sels[i])
                cnt++;
        }
        return cnt;
    }
    getVerbage(){
        let jw = .63;
        let jh = 3;
        let instructions =   <View style={{

            flexDirection: 'column',
            marginTop: 0,
            marginRight: 0.02,
            marginLeft: .02,
            width:  jw,
            height: jh,
            backgroundColor: "green"
        }}>
            <View style={{

                flexDirection: 'column',
                marginTop: 0,
                marginRight: 0,
                width:  jw,
                height: .25,
                backgroundColor: "lightgray"
            }}>
                <Text
                    style={{
                        fontSize: .04,
                        textAlign: 'left',
                        marginTop: .008,
                        marginLeft: .02,
                        color:this.state.data.instructionColor
                    }}>
                    {this.state.data.instructions}
                </Text>
            </View>
            <View style={{

                flexDirection: 'column',
                marginTop: 0,
                marginRight: 0,
                width:  jw,
                height: jh-.27,
                backgroundColor: "green"
            }}>
                <Text
                    style={{
                        fontSize: .04,
                        textAlign: 'left',
                        marginTop: .008,
                        marginLeft: .02,
                        color:"black"
                    }}>
                    {this.state.data.journal}
                </Text>
            </View>
        </View>

        let journal =   <View style={{

            flexDirection: 'column',
            marginTop: 0,
            marginRight: 0.02,
            marginLeft: .02,
            width:  jw,
            height: jh,
            backgroundColor: "green"
        }}>

            <View style={{

                flexDirection: 'column',
                marginTop: 0,
                marginRight: 0,
                marginLeft: .02,
                width:  jw,
                height: jh-.27,
                backgroundColor: "green"
            }}>
                <Text
                    style={{
                        fontSize: .05,
                        textAlign: 'left',
                        marginTop: .008,
                        marginLeft: .015,
                        color:"black"
                    }}>
                    {this.state.data.journal}
                </Text>
            </View>
        </View>
        if(this.state.data.playerId == this.state.data.currentPlayer){
            return instructions;
        }
        return journal;
    }
    render() {

        let h = .22;
        let pw = .6;
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
                            <PanPlayer  h={h} w={pw} ctrlType={0} bgColor={this.getBackgroundColor(p[5])}
                                        color={"black"} key={7}
                                        data={this.props.data} player={p[5] }/>
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
                            <PanPlayer  h={h} w={mw} ctrlType={0} bgColor={this.getBackgroundColor(p[4])}
                                        color={"black"} key={83}
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
                            <PanPlayer  h={h} w={pw}  bgColor={this.getBackgroundColor(p[3])}
                                        color={"black"} key={44}
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
                            <PanPlayer  h={h} w={pw}   bgColor={this.getBackgroundColor(p[7])}
                                        color={"black"} key={7}
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
                                        clickMyTableCard={this.clickMyTableCard.bind(this)}
                                        canMuck={this.canMuck()}
                                        border={this.state.border} borderGroup={this.state.borderGroup}
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
                        {this.getVerbage()}

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
                                       sels={this.state.sels}
                                       notifySelect={this.notifySelect.bind(this)}
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
