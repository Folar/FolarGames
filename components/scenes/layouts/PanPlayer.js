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
class PanPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fooSel:[],
            fooGrp:0
        };

    }


    clickAction2() {
        if (this.props.data.currentPlayer == this.props.data.playerId)
            this.props.action(3)

    }

    clickAction() {
        if (this.props.player.playerId == this.props.data.playerId)
            this.props.action(3)

    }

    canClickCard() {
        let data = this.props.data;
        if (data.currentPlayer == data.playerId && data.state == 4 &&
            data.playerId == this.props.player.playerId) {
            return true;
        }
        return false;
    }

    all3(){
        let data = this.props.data;
        let cards = data.players[data.currentPlayer].cards;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].money == -1) continue;
            if( cards[i].cards.length<3)
                return false;
        }
        return true;
    }
    count() {
        let data = this.props.data;
        let cards = data.players[data.currentPlayer].cards;
        let cnt = 0;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].money == -1) continue;
            cnt += cards[i].cards.length;
        }
        return cnt;
    }

    clear() {
        let data = this.props.data;
        let cards = data.players[data.currentPlayer].cards;
        for (let i in cards) {
            for (let j in cards[i].sels) {
                cards[i].sels[j] = false;
            }
        }
        this.setState({cards: cards});

    }


    componentDidMount() {

    }


    getTab() {


        let pan = <View  key={"pan"}
            style={{
                opacity: 1,
                marginLeft: 0,
                marginRight: .02,
                flexDirection: 'row',
                backgroundColor: "brown",
                width:  .08,
                height: .264 * .25
            }}>



            <VrButton onClick={this.clickAction.bind(this)} key={0}>
                <Text
                    style={{
                        fontSize: .03,
                        textAlign: 'left',
                        marginTop: .007,
                        marginLeft: .015,

                        color: "black"
                    }}>
                    {"Pan"}
                </Text>
            </VrButton>
        </View>

        let forfeit = <View  key={"f"}
            style={{
                opacity: 1,
                marginLeft: 0,
                marginRight: .02,
                flexDirection: 'row',
                backgroundColor: "red",
                width: .1,
                height: .264 * .25
            }}>



            <VrButton onClick={this.clickAction.bind(this)} key={0}>
                <Text
                    style={{
                        fontSize: .03,
                        textAlign: 'left',
                        marginTop: .007,
                        marginLeft: .015,

                        color: "black"
                    }}>
                    {"Forfeit"}
                </Text>
            </VrButton>
        </View>

        let  start = <View  key={"s"}
            style={{
                opacity: 1,
                marginLeft: 0,
                marginRight: .02,
                flexDirection: 'row',
                backgroundColor: this.props.player.playerId == this.props.data.playerId ? "brown" : "gray",
                width:  .1,
                height: .264 * .25
            }}>



            <VrButton onClick={this.clickAction.bind(this)} key={0}>
                <Text
                    style={{
                        fontSize: .03,
                        textAlign: 'left',
                        marginTop: .007,
                        marginLeft: .015,

                        color: "black"
                    }}>
                    {"Start"}
                </Text>
            </VrButton>
        </View>

        let pick = <View key={"p"}
            style={{
                opacity: 1,
                marginLeft: 0,
                marginRight: .02,
                flexDirection: 'row',
                backgroundColor:  this.props.data.currentPlayer == this.props.data.playerId ? "brown" : "gray",
                width: .194 * .25 + .11,
                height: .264 * .25
            }}>

            <View
                style={{
                    opacity: 1,
                    marginLeft: 0,
                    width: .194 * .25,
                    height: .264 * .25
                }}>

                <PlayingCard index={133} sz={.25} canClick={false}
                             suit={this.props.data.passCard.suit} rank={this.props.data.passCard.rank}/>
            </View>

            <VrButton onClick={this.clickAction2.bind(this)} key={0}>
                <Text
                    style={{
                        fontSize: .03,
                        textAlign: 'left',
                        marginTop: .007,
                        marginLeft: .015,

                        color: "black"
                    }}>
                    {"Pickup"}
                </Text>
            </VrButton>
        </View>

        let discard = <View
            style={{
                opacity: 1,
                marginLeft: 0,
                marginRight: .02,
                flexDirection: 'row',
                backgroundColor: "brown",
                width: .194 * .25 + .1,
                height: .264 * .25
            }}>

            <View
                style={{
                    opacity: 1,
                    marginLeft: 0,
                    width: .194 * .25,
                    height: .264 * .25
                }}>

                <PlayingCard index={133} sz={.25} canClick={false}
                             suit={this.props.data.discardCard.suit} rank={this.props.data.discardCard.rank}/>
            </View>

            <VrButton onClick={this.clickAction.bind(this)} key={0}>
                <Text
                    style={{
                        fontSize: .03,
                        textAlign: 'left',
                        marginTop: .007,
                        marginLeft: .015,

                        color: "black"
                    }}>
                    {"Muck"}
                </Text>
            </VrButton>
        </View>

        let pass = <View  key={"pass"}
            style={{
                opacity: 1,
                marginLeft: 0,
                flexDirection: 'row',
                backgroundColor: "green",
                marginRight: .02,
                width: .194 * .25,
                height: .264 * .25
            }}>

            <View
                style={{
                    opacity: 1,
                    marginLeft: 0,

                    width: .194 * .25,
                    height: .264 * .25
                }}>

                <PlayingCard index={133} sz={.25} canClick={false}
                             suit={this.props.data.passCard.suit} rank={this.props.data.passCard.rank}/>
            </View>

        </View>
        let eView = <View  key={"def"}
            style={{
                marginLeft: 0,
                width: .194 * .25,
                height: .264 * .25

            }}>

        </View>


        let tab = eView;


        let data = this.props.data;
        if(this.props.player.state == 100){
            tab = start;

        } else if(this.props.player.state == 8  && data.currentPlayer == data.playerId ){
            tab = forfeit;
        } else if (data.currentPlayer == data.playerId && this.props.player.state == 4 &&
                    this.props.canMuck && this.count() == 11) {
            tab = pan;
        }
        else if (data.currentPlayer == data.playerId && this.props.player.state == 4 &&
                  this.props.canMuck && this.count() != 11) {
            tab = discard;
        } else if ( this.props.player.state == 5 ) {
            tab = pick;
        }

        return tab;
    }

    foo(item, index,arr) {

        let selected = this.state.fooSel[index];
        return <PlayingCard group={this.state.fooGrp} index={index} sz={.25}
                            canClick={this.canClickCard()}
                            select={selected} selector={this.props.clickMyTableCard}
                            suit={item.suit} rank={item.rank}/>

    }

    render() {


        let grps = [];
        let g = null;
        let k = [];
        let tab = null;
        let cardGrps;
        let cardGrps2;
        let bw = 0;
        let bm = 0;
        let mr = .02;
        let gw = 0;
        if (this.props.player.atTable) {


            for (let i=0; i < this.props.player.cards.length;i++) {
                this.state.fooGrp = i;
                this.state.fooSel = this.props.player.cards[i].sels;
                k.push(i + "_" + this.props.player.cards[i].cards.length);
                g = this.props.player.cards[i].cards.map(this.foo,this);
                grps.push(g);
            }
            cardGrps =
                grps.slice(0, 3).map((item, index) => {
                    if(this.props.border){
                        if(this.props.borderGroup.includes(index)){
                            bw = .01;
                        }else{
                            bw = 0;
                        }
                    }
                    return <View key={k[index]} style={{
                        borderBottomWidth:bw,borderColor:"red",marginTop:0,
                        marginRight: .02, flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {item}
                    </View>


                });


            cardGrps2 =
                grps.slice(3).map((item, index) => {

                    return <View key={k[3 + index]} style={{
                        marginRight: 0, flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {item}
                    </View>


                });

            tab = this.getTab();
        }

        return (
            <View
                style={{
                    opacity: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: this.props.w,
                    height: this.props.h,
                    backgroundColor: this.props.bgColor

                }}>

                {this.props.player.atTable ? (


                    <View style={{
                        width: this.props.w,
                        height: this.props.h,
                        marginLeft: .01,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>

                        <View style={{
                            width: this.props.w - .04,
                            height: .07,
                            marginLeft: .005,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            marginBottom: .01,
                            backgroundColor: this.props.bgColor

                        }}>
                            {tab}
                            <Text
                                style={{
                                    fontSize: .04,
                                    textAlign: 'center',
                                    color: this.props.color,
                                    marginRight: .02,
                                    marginLeft: 0
                                }}>
                                {this.props.player.name}
                            </Text>

                            <Text
                                style={{
                                    fontSize: .04,
                                    textAlign: 'center',
                                    color: this.props.color,
                                    marginRight: .002
                                }}>
                                {"round:"}
                            </Text>

                            <Text
                                style={{
                                    fontSize: .04,
                                    textAlign: 'center',
                                    color: this.props.color,
                                    marginRight: .02

                                }}>
                                {this.props.player.current}
                            </Text>

                            <Text
                                style={{
                                    fontSize: .04,
                                    textAlign: 'center',
                                    color: this.props.color,
                                    marginRight: .002
                                }}>
                                {"total:"}
                            </Text>

                            <Text
                                style={{
                                    fontSize: .04,
                                    textAlign: 'center',
                                    color: this.props.color,
                                    marginRight: 0

                                }}>
                                {this.props.player.total}
                            </Text>
                        </View>
                        <View style={{
                            width: .45,
                            height: .07,
                            marginLeft: .005,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start'
                        }}>
                            <View style={{
                                width: .57,
                                height: .07,
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start'
                            }}>
                                {cardGrps}
                            </View>
                            <View style={{
                                width: .57,
                                height: .07,
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start'
                            }}>
                                {cardGrps2}
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={{

                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        width: this.props.w,
                        height: this.props.h,
                        backgroundColor: "green"
                    }}>
                    </View>)}

            </View>


        )
    }
}

module
    .exports = PanPlayer;
