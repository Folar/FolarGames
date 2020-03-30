import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';

import PlayingCard from './elements/PlayingCard';

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


    render() {

        let grps = [];
        let g = null;
        for (let i in this.props.player.cards) {
            g = this.props.player.cards[i].map((item, index) => {

                return <PlayingCard  sz={.35} suit={item.suit} rank={item.rank} />
            });
            grps.push(g);
        }
        let cardGrps =
            grps.map((item, index) => {

                return <View  style={{
                    marginRight: 0.02, flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {item}
                </View>


            });


        return (
            <View
                style={{
                    opacity: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: 1.25,
                    height: .22,
                    backgroundColor: "blue"

                }}>

                {this.props.player.playing ? (


                    <View style={{
                        width: 1.25,
                        height: .22,
                        marginLeft: .01,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>

                        <View style={{
                            width: .5,
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
                                    color: "white",
                                    marginRight: .02
                                }}>
                                {this.props.player.name}
                            </Text>

                            <Text
                                style={{
                                    fontSize: .04,
                                    textAlign: 'center',
                                    color: "white",
                                    marginRight: .002
                                }}>
                                {"round:"}
                            </Text>

                            <Text
                                style={{
                                    fontSize: .04,
                                    textAlign: 'center',
                                    color: "white",
                                    marginRight: .02

                                }}>
                                {this.props.player.current}
                            </Text>

                            <Text
                                style={{
                                    fontSize: .04,
                                    textAlign: 'center',
                                    color: "white",
                                    marginRight: .002
                                }}>
                                {"total:"}
                            </Text>

                            <Text
                                style={{
                                    fontSize: .04,
                                    textAlign: 'center',
                                    color: "white",
                                    marginRight: 0

                                }}>
                                {this.props.player.total}
                            </Text>
                        </View>
                        <View style={{
                            width: 1.2,
                            height: .1,
                            marginLeft: .01,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            backgroundColor:"red"
                        }}>
                            {cardGrps}
                        </View>
                    </View>
                ) : (
                    <View style={{

                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        width: .5,
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
