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
            zoom: 3.8

        };

    }

    click() {
        this.props.action(3)

    }

    componentDidMount() {

    }
    getTab(){


        let pick = <View
            style={{
                opacity: 1,
                marginLeft: 0,
                marginRight:.02,
                flexDirection: 'row',
                backgroundColor: "brown",
                width: .194 * .25 +.1,
                height: .264 * .25
            }}>

            <View
                style={{
                    opacity: 1,
                    marginLeft: 0,
                    width: .194 * .25,
                    height: .264 * .25
                }}>

                <PlayingCard index={133} sz={.25}
                             suit={this.props.data.passCard.suit} rank={this.props.data.passCard.rank}/>
            </View>

            <VrButton onClick={this.click.bind(this)} key={0}>
                <Text
                    style={{
                        fontSize: .03,
                        textAlign: 'left',
                        marginTop: .007,
                        marginLeft: .015,

                        color:"black"
                    }}>
                    {"Pickup"}
                </Text>
            </VrButton>
        </View>

        let pass = <View
            style={{
                opacity: 1,
                marginLeft: 0,
                flexDirection: 'row',
                backgroundColor: "green",
                marginRight:.02,
                width: .194 * .25 ,
                height: .264 * .25
            }}>

            <View
                style={{
                    opacity: 1,
                    marginLeft: 0,

                    width: .194 * .25,
                    height: .264 * .25
                }}>

                <PlayingCard index={133} sz={.25}
                             suit={this.props.data.passCard.suit} rank={this.props.data.passCard.rank}/>
            </View>

        </View>
        let eView = <View
            style={{
                marginLeft: 0,
                width: .194 * .25 ,
                height: .264 * .25

            }}>

        </View>
        let confirm = <View
            style={{
                opacity: 1,
                marginLeft: 0,
                flexDirection: 'row',
                backgroundColor: "brown",
                marginRight:.02,
                width: .12,
                height: .264 * .25
            }}>

            <View
                style={{
                    opacity: 1,
                    marginLeft: 0,


                }}>

                <VrButton onClick={this.click.bind(this)} key={0}>
                    <Text
                        style={{
                            fontSize: .03,
                            textAlign: 'left',
                            marginTop: .007,
                            marginLeft: .015,

                            color:"black"
                        }}>
                        {"Confirm"}
                    </Text>
                </VrButton>
            </View>

        </View>
        let tab = eView;

        let ctrlType = 0;
        let data = this.props.data;
        if (data.currentPlayer == data.playerId && data.state == 4 &&
            data.playerId == this.props.player.playerId){
            tab = confirm;
        }
        else if (data.currentPlayer == data.playerId && data.state == 5 &&
            data.playerId == this.props.player.playerId){
            tab = pick;
        } else if (data.currentPlayer != data.playerId && data.otherState == 5 &&
                   data.currentPlayer == this.props.player.playerId ){
            tab = pass;
        }

        return tab;
    }


    render() {

        let grps = [];
        let g = null;

        for (let i in this.props.player.cards) {

            g = this.props.player.cards[i].cards.map((item, index) => {
                return <PlayingCard group={i} index={index} sz={.25} suit={item.suit} rank={item.rank}/>
                // return <CardSuitRank  sz={.025} suit={item.suit} rank={item.rank} rotation={0}/>
            });
            grps.push(g);
        }
        let cardGrps =
            grps.slice(0, 3).map((item, index) => {

                return <View style={{
                    marginRight: 0.02, flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {item}
                </View>


            });



        let cardGrps2 =
            grps.slice(3).map((item, index) => {

                return <View style={{
                    marginRight: 0.02, flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {item}
                </View>


            });

        let tab = this.getTab();
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

                {this.props.player.playing ? (


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
                            marginLeft: .02,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start'
                        }}>
                            <View style={{
                                width: .45,
                                height: .07,
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start'
                            }}>
                                {cardGrps}
                            </View>
                            <View style={{
                                width: .45,
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
