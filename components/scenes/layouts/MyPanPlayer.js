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
class MyPanPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 3.8
        };

    }

    zoom() {

    }

    componentDidMount() {

    }

    canClick(){
        return false;
    }

    render() {

        let grps = [];
        let g = null;
        for (let i in this.props.player.cards) {
            g = this.props.player.cards[i].map((item, index) => {
                return <PlayingCard group={i} index={index} sz={.25} suit={item.suit} rank={item.rank} canClick={this.canClick()}/>
            });
            grps.push(g);
        }
        let cardGrps =
            grps.slice(0,2).map((item, index) => {

                return <View  style={{
                    marginRight: 0.02, flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {item}
                </View>


            });

        let cardGrps2 =
            grps.slice(2).map((item, index) => {

                return <View  style={{
                    marginRight: 0.02, flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {item}
                </View>


            });
        let mw = .69;
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

                {this.props.player.playing ? (


                    <View style={{
                        width: mw,
                        height: .22,
                        marginLeft:.02,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>

                        <View style={{
                            width: mw,
                            height: .05,
                            marginLeft: .005,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            marginBottom:.01
                        }}>
                            <Text
                                style={{
                                    fontSize: .04,
                                    textAlign: 'center',
                                    color: this.props.color,
                                    marginRight: .02
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
                            marginLeft: .01,
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
                        width: mw,
                        height: .22,
                        backgroundColor: "green"
                    }}>
                    </View>)}

            </View>


        )
    }
}

module
    .exports = MyPanPlayer;
