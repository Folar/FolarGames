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
            lastGroup: null,
            border: false,
            borderGroup: [],
            pickup:false,
            instructionColor:"#eba117",
            instructions: "Press the start button after all then pan players have joined. ",
            sels: [false, false, false, false, false, false, false, false, false, false],

        };
    }

    createDropSpot() {
        let cards = this.props.data.players[this.props.data.currentPlayer].cards;
        if (cards.length > 0 && cards[cards.length - 1].money == -1)
            return;
        cards.push({
            str:"",
            group: cards.length,
            sels: [false, false, false, false, false, false, false, false, false, false],
            money: -1,
            cards: [
                {
                    rank: "empty"
                }
            ]

        });
    }



    createDropSpotButton() {
        let cards = this.props.data.players[this.props.data.currentPlayer].cards;
        if (cards.length > 0 && cards[cards.length - 1].money == -1)
            return;
        cards.push({
            str:"",
            group: cards.length,
            sels: [false, false, false, false, false, false, false, false, false, false],
            money: -1,
            cards: [
                {
                    rank: "emptyButton"
                }
            ]

        });
    }

    removeDropSpot() {

        let cards = this.props.data.players[this.props.data.playerId].cards;
        if (cards[cards.length - 1].money == -1)
            cards.pop();
    }

    transfer(target, source) {
        target.suit = source.suit;
        target.rank = source.rank;
        target.ordinal = source.ordinal;
        target.rankOrdinal = source.rankOrdinal
    }

    pickup() {
        let cards = this.props.data.players[this.props.data.playerId].cards;
        if (cards[cards.length - 1].money == -1)
            cards[cards.length - 1].money = 0;
        let c = cards[cards.length - 1].cards[0];
        let cc = this.props.data.currentCard;
        c.group = cards.length - 1;
        this.transfer(c, cc);
        this.state.pickup = true;
        //this.createEmptyCard();
        this.props.sendmessage({type:"PAN",name: this.props.name, action: 3,
            args:{newState:4,hand:this.props.data.hand,cards:cards}});
    }

    createEmptyCard() {
        this.props.data.currentCard.suit = '';
        this.props.data.currentCard.rank = 'card_back';
        this.props.data.currentCard.rankOrdinal = -1;
        this.props.data.currentCard.ordinal = -1;
    }

    draw(s) {
        let data = this.props.data;
        let cards = data.players[data.playerId].cards;
        this.props.sendmessage({type:"PAN",name: this.props.name, action: 2,
                                args:{newState:s,hand:this.props.data.hand,cards:cards}});


    }


    getBackgroundColor(p) {

        if (this.props.data.state == 100 || this.props.data.state == 0 ) {
            return "#6b8e23";
        }
        if (p.forfeit) {
            return "red";
        }
        if (this.props.data.currentPlayer == p.playerId) {
            return "blue";
        }

        return "#6b8e23";

    }

    action(a) {
        let s = this.props.data.state;
        let data = this.props.data;
        let str = "";
        let instr = "Select one or more cards in your hand and then click on a meld inorder to transfer " +
            "the selected cards to the meld or\n" +
            "Select one or more cards in a meld and "+
            "then click another meld to move the cards between melds";
        console.log("start action=" + a + " state=" + s);
        //debugger;
        switch (a) {
            case 1:

                if (s == 1) { // draw
                    this.createDropSpot();
                    this.draw(6);
                        str = " Because your the first player this round, you can draw another card or "+
                        " pickup the " + this.getCardString(data.currentCard);
                    this.setInstructions(str);

                } else if (s == 2 || s == 6  || s == 5) { // draw
                    this.createDropSpot();
                    this.draw(3);
                    str =  "Pickup the " + this.getCardString(data.currentCard) + " or pass the card to the next player" ;
                    this.setInstructions(str);

                }  else if (s == 3) { // pickup
                    this.pickup();
                    s = 4;
                    str = instr;
                    this.setInstructions(str);

                }
                break;
            case 2:
                if (s == 3) {  // pass
                    this.removeDropSpot()
                    s = 5;
                    this.transfer(this.props.data.passCard, this.props.data.currentCard);
                    this.createEmptyCard();

                    str =  "Pickup the " + this.getCardString(data.passCard) + " or draw a card from the deck" ;
                    this.setInstructions(str);
                    this.createDropSpot();
                } else if (s == 6) { // pickup

                    s = 4;
                    str =  instr;
                    this.setInstructions(str);
                    this.pickup();
                }
                break;
            case 3:
                if (s == 100){
                    this.props.sendmessage({type:"PAN",name: this.props.name, action: 100,args:{dummy:1}});
                } else if (s == 5) { // pickup
                    s = 4;
                    this.transfer(this.props.data.currentCard, this.props.data.passCard);
                    str =  instr;
                    this.setInstructions(str);
                    this.pickup();
                } else if (s == 4) { // muck
                    this.removeDropSpot();



                    let success = true;
                    let results = this.checkForValidity();
                    for (let i=0;i<results.length;i++){
                        if (!results[i].valid || results.meldChangeForLess) {
                            this.processMeldErrors(results);
                            return;
                        }

                    }
                    this.processValidMelds(results);
                    this.refs.myCards.clear();
                    //this.props.data.currentPlayer = 1;
                    this.refs.hand.getSelectedCards(true);
                    this.refs.myCards.clear();
                    //this.props.data.currentPlayer = 1;
                    if(this.refs.myCards.count()== 11){
                        debbugger;
                    }
                    s = 2;
                    str =  "Draw a card from the deck" ;
                    this.setInstructions(str);
                    this.createEmptyCard();
                    this.setState({data: this.props.data, sels: this.state.sels})

                }else if (s == 8) {
                    data.players[data.playerId].forfeit = true;
                   // debugger;
                    this.props.data.journal = this.state.instructions + data.players[data.playerId].name +
                    "  has to refund each player " +
                        data.players[data.playerId].current/(data.players.length - 1) ;
                    str =  "Draw a card from the deck" ;
                    this.setInstructions(str);
                    s = 7;
                }
                break;
        }
        //this.props.data.state = s;
        //console.log("end  state=" + s);
        //this.setState({data: this.props.data})

    }

    compare(a, b) {
        return (a.ordinal - b.ordinal);
    }



    setInstructions(msg){
        this.state.instructions = msg;
        this.state.instructionColor = "#eba117";
        this.setState({ data: this.props.data,instructionColor:"#eba117", instructions:msg,border:false});
    }

    reportError(msg, src) {
        this.state.oldInstructions = this.state.instructions;
        this.state.instructionColor = "#eba117";
        this.setState({border: true, borderGroup: src,data:this.props.data,
            instructionColor:"red", instructions:msg});
    }

    clearError() {
        if(this.state.instructionColor == "#eba117") return;
        this.state.instructions = this.state.oldInstructions;
        this.setState({border: false, borderGroup: [],
                                instructionColor:"#eba117", instructions:this.state.oldInstructions});
    }

    clickMyTableCard(i, g) {
        this.clearError("");
        let data = this.props.data;
        let cards = data.players[data.playerId].cards;
        if (this.count()) {

            let cardsFromHand = this.refs.hand.getSelectedCards(false);
            if( this.state.pickup ){
                if (g != cards.length -1){
                    this.reportError(
                        "The card that you just picked up, must be used first to form a meld",
                        [g]);
                    return;
                }
                if(cards[g].cards.length + cardsFromHand.length > 2 ){
                    this.state.pickup = false;
                }

            }

            cardsFromHand = this.refs.hand.getSelectedCards(true);
            if (cards[g].money == -1)
                cards.cards = [];

            for (let j in  cardsFromHand) {
                cardsFromHand[j].group = g;
                if (cards[g].money == -1) {
                    cards[g].money = 0;
                    cards[g].cards = [];
                }

                cards[g].cards.push(cardsFromHand[j]);
            }
            cards[g].cards.sort(this.compare);

            if (cards.length < 3) {
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


        } else {
            let cnt = 0;
            if (this.state.lastGroup == null || this.state.lastGroup == g) {

                cards[g].sels[i] = !cards[g].sels[i];
                for (let j = 0; j < cards[g].cards.length; j++) {
                    if (cards[g].sels[j])
                        cnt++;
                }
                if (cnt == 0)
                    this.state.lastGroup = null;
                else
                    this.state.lastGroup = g;
            } else {
                let src = this.state.lastGroup;
                let trg = g;

                if( this.state.pickup ){
                    if (src != cards.length -1){
                        this.reportError(
                            "The card that you just picked up, must be used first to form a meld",
                            [src]);
                        return;
                    }

                    this.state.pickup = false;

                }

                cnt = 0;
                for (let j = cards[src].cards.length - 1; j >= 0; j--) {
                    if (cards[src].sels[j]) {
                        cnt++
                    }
                }
                if (cards[src].cards.length > 1 && (cards[src].cards.length - cnt) < 3) {
                    this.reportError(
                        "Illegal to move a card from a card group when the number of cards in that group will be less then 3 ",
                        [src]);
                    return;
                }


                if (cards[trg].money == -1) {
                    cards[trg].cards.splice(0, 1);
                    cards[trg].money = 0;
                }

                //let oldMoney = this.moneyCardGroup(src);
                for (let j = cards[src].cards.length - 1; j >= 0; j--) {
                    if (cards[src].sels[j]) {
                        cards[src].sels[j] = false;
                        cards[src].cards[j].group = trg;
                        cards[trg].cards.push(cards[src].cards[j]);
                        cards[src].cards.splice(j, 1);
                    }
                }
                if (cards[src].cards.length == 0) {
                    cards.splice(src, 1);
                }

                cards[trg].cards.sort(this.compare);

                if (cards.length < 3) {
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

        this.setState({data: this.props.data, sels: this.state.sels});
    }




    componentDidMount() {

    }

    getCardString(c){
        let suit ="";
        let rank = "";

        switch (c.suit) {
            case 's':
                suit = "Spades";
                break;
            case 'h':
                suit = "Hearts";
                break;
            case 'd':
                suit = "Diamonds";
                break;
            case 'c':
                suit = "Clubs";
                break;
        }
        rank = c.rank;
        switch (c.rank) {
            case 1:
                rank = "Ace";
                break;
            case 11:
                rank = "Jack";
                break;
            case 12:
                rank = "Queen";
                break;
            case 13:
                rank = "King";
                break;
        }
        return rank + " of " + suit;
    }
    getCardGroupString(h){
        let str = "";

        for (let i = 0; i < h.length ; i++) {
            str += this.getCardString(h[i])

            if ( i == h.length -2){
                str += " and "
            } else if (i< h.length -2) {
                str += ", "
            }

        }
        return str;
    }


    processValidMelds(results){
        let data = this.props.data;
        let txt = "";
        let cards = data.players[data.playerId].cards;
        let nwm = false;
        let money = 0;
        for (let i=0;i<results.length;i++){
            let str =  cards[i].str;
            if(str.length == 0){
                nwm = true;
                cards[i].str = results[i].str;
                cards[i].money = results[i].money;
                money += cards[i].money;
                txt += "The new meld "+  cards[i].str +" is worth " +  cards[i].money;
            }else if ( cards[i].str != results[i].str ){
                cards[i].str = results[i].str;
                nwm = true;
                money += ( results[i].money -cards[i].money);
                txt += "The changed meld "+  cards[i].str + " worth has changed by " +  ( results[i].money -cards[i].money);
                cards[i].money = results[i].money;
            }
            if(nwm ) {
                txt += ". ";
                nwm = false;
            }

        }
        this.props.data.journal = txt+" everyone should pay " +data.players[data.playerId].name +" "+ money;
    }
    processMeldErrors(results){
        let errGrps = [];
        let err= "";
        this.props.data.state=8;
        for (let i=0;i<results.length;i++){
            if (!results[i].valid || results.meldChangeForLess) {
                if (!results[i].valid){
                    err += "The meld " +results[i].str ;
                    err += " is illegal";

                }else{
                    err += "The new meld " + results[i].str + " has resulted in less money. The old meld was"+
                            results.oldStr ;
                }
                errGrps.push(i);
                err +=". ";
            }

        }
        this.reportError(err, errGrps);
    }

    checkForValidity(){
       // debugger;
        let data = this.props.data;
        let cards = data.players[data.currentPlayer].cards;
        let melds = [];
        for (let i = 0;i<cards.length;i++){
            let money = 0;
            let result = this.getMeld(cards[i].cards);
            let r = {
                valid:false,
                money:0,
                str:this.getCardGroupString(cards[i].cards),
                meldChangeForLess:false,
                oldStr: cards[i].str
            }
            if (result.valid){
                r = {
                    valid:true,
                    money:this.getMoney(result),
                    str:this.getCardGroupString(cards[i].cards),
                    meldChangeForLess:cards[i].money <  this.getMoney(result)
                }
            }
            melds.push(r);
        }
        return melds;
    }

    getMeld(h) {
        let result = {
            valid: true,
            type: "",
            suit: "",
            anchor: false,
            sameSuit: false,
            valle: false,
            double:1,
            size:0
        };
        result.size = h.length;
        if (h[0].rankOrdinal == h[1].rankOrdinal) {
            result.type = "rank";
            for (let i = 0; i < h.length - 1; i++) {
                if ((h[i].rankOrdinal) != h[i + 1].rankOrdinal) {
                    result.valid = false;
                    break;
                }
            }
            if (result.valid) {
                let s = 0
                let he = 0;
                let d = 0
                let c = 0;
                for (let i = 0; i < h.length; i++) {
                    switch (h[i].suit) {
                        case 's':
                            s = 1;
                            break;
                        case 'h':
                            he = 1;
                            break;
                        case 'd':
                            d = 1;
                            break;
                        case 'c':
                            c = 1;
                            break;
                    }
                }
                let tot = s + he + d + c;
                if (tot == 1) {
                    result.sameSuit = true;
                    result.suit = h[0].suit;
                    if(result.suit == 's' ){
                        result.double = 2;
                    }
                }

                if (h[0].rankOrdinal == 1 || h[0].rankOrdinal == 10)
                    result.anchor = true;

                if (tot == 2 && !result.anchor) {
                    result.valid = false;
                }

                if (h[0].rankOrdinal == 3 || h[0].rankOrdinal == 5 || h[0].rankOrdinal == 7) {
                    result.valle = true;
                }

            }
        } else {
            result.type = 'rope';
            for (let i = 0; i < h.length - 1; i++) {
                if (h[i].suit != h[i + 1].suit || (h[i].rankOrdinal + 1) != h[i + 1].rankOrdinal) {
                    result.valid = false;
                    break;
                }
            }
            result.suit = h[0].suit;
            if(result.suit == 's' ){
                result.double = 2;
            }
            if (h[0].rankOrdinal == 1 || h[h.length - 1].rankOrdinal == 10) {
                result.anchor = true;
            }


        }

        return result;
    }
    getMoney(r) {
        let money = 0;
        if(r.type == "rank"){
            if (r.valle){
                if (r.sameSuit){
                    money = 2 * r.double;
                } else {
                    money = 1;
                }

            } else {
                if (r.sameSuit) {
                    money = r.double + (r.size - 3);
                }
            }

        } else {
            if (r.anchor)
                money = r.double;
        }

        return money;
    }
    test() {
        let h = this.refs.hand.getSelectedCards(false);
        h.sort(this.compare);
        let str = this.getCardGroupString(h);
        let r = this.getMeld(h);
        if(r.valid){
            let m = this.getMoney(r);
        }
    }

    canMuck() {
        if (this.refs.myCards == undefined) return false;

        if (this.refs.myCards.count() == 11 && this.refs.myCards.all3() )
            return true;
        if (this.count() != 1) {
            return false;
        }

        let data = this.props.data;
        let cards = data.players[data.currentPlayer].cards;
        for (let i in cards) {
            if (cards[i].money > -1 && cards[i].cards.length < 3)
                return false;
        }


        return true;
    }

    setMyHand(hand) {
        this.props.data.hand = hand;
        this.setState({data: this.props.data})
    }

    notifySelect() {
        this.clearError("");
        this.refs.myCards.clear();
        this.state.lastGroup = null;
        let cnt = this.count();

        if (cnt == 1) {
            this.props.data.discardCard = this.refs.hand.getSelectedCards(false)[0];
        }
        this.setState({sels: this.state.sels});

    }

    count() {
        let cnt = 0;
        for (let i in this.state.sels) {
            if (this.state.sels[i])
                cnt++;
        }
        return cnt;
    }

    getJournal() {
        return this.props.data.journal  ;
    }

    render() {
        let jw = .63;
        let jh = 3;
        let h = .22;
        let yh = .265;
        let pw = .6;
        let mw = .65;
        let youw = 1.305;
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
            p.push({atTable: false});
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
                        width: tw - .1,
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
                            <PanPlayer h={h} w={pw} ctrlType={0} bgColor={this.getBackgroundColor(p[5])}
                                       color={"black"} key={7}
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
                            <PanPlayer h={h} w={mw} ctrlType={0} bgColor={this.getBackgroundColor(p[4])}
                                       color={"black"} key={83}
                                       data={this.props.data} player={p[4]} data={this.props.data}/>
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
                            <PanPlayer h={h} w={pw} bgColor={this.getBackgroundColor(p[3])}
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
                        width: tw - .1,
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
                            <PanPlayer h={h} w={pw} ctrlType={0} bgColor={this.getBackgroundColor(p[6])}
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
                            <PanMuck h={h} w={mw} bgColor={"#6b8e23"} color={"black"} key={86}
                                     suit={this.props.data.currentCard.suit}
                                     rank={this.props.data.currentCard.rank}
                                     action={this.action.bind(this)} data={this.props.data}/>
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
                            <PanPlayer h={h} w={pw} bgColor={this.getBackgroundColor(p[2])}
                                       color={"black"} key={144} data={this.props.data} player={p[2]}/>
                        </View>
                    </View>

                    {/*third row*/}
                    <View style={{

                        flexDirection: 'row',
                        marginTop: .01,
                        marginRight: .045,
                        marginLeft: .025,
                        width: tw - .1,
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
                            <PanPlayer h={h} w={pw} bgColor={this.getBackgroundColor(p[7])}
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
                            <PanPlayer h={h} w={mw} bgColor={this.getBackgroundColor(p[0])}
                                       color={"black"} key={8} ref={"myCards"}
                                       clickMyTableCard={this.clickMyTableCard.bind(this)}
                                       canMuck={this.canMuck()}
                                       border={this.state.border} borderGroup={this.state.borderGroup}
                                       action={this.action.bind(this)} data={this.props.data} player={p[0]}/>
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
                            <PanPlayer h={h} w={pw} bgColor={this.getBackgroundColor(p[1])} color={"black"}
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
                        width: tw - .1,
                        height: yh,
                        backgroundColor: "green"
                    }}>
                        {/*4th row : journal*/}
                        <View style={{

                            flexDirection: 'column',
                            marginTop: 0,
                            marginRight: 0.02,
                            marginLeft: .02,
                            width: jw,
                            height: jh,
                            backgroundColor: "green"
                        }}>

                            <Text
                                style={{
                                    fontSize: .03,
                                    textAlign: 'left',
                                    marginTop: .008,
                                    marginLeft: .015,
                                    color: "black"
                                }}>
                                {this.getJournal()}
                            </Text>

                        </View>

                        {/*4th row : yourhand*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'flex_end',
                            justifyContent: 'flex-end',
                            marginTop: 0,
                            marginLeft: .02,
                            width: youw,
                            height: yh,
                            backgroundColor: "pink"
                        }}>
                            <MyPanHand bgColor={"#eba117"} color={"black"} key={10} w={youw} h={yh}
                                       ref="hand" data={this.props.data}
                                       sels={this.state.sels}
                                       notifySelect={this.notifySelect.bind(this)}
                                       test={this.test.bind(this)}
                                       text ={this.state.instructions}
                                       instructionColor={this.state.instructionColor}
                                       setHand={this.setMyHand.bind(this)} hand={this.props.data.hand}/>
                        </View>

                    </View>
                </View>


            </View>


        )
    }
}

module
    .exports = CardTableLayout;
