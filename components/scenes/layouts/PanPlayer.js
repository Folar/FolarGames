import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';

import CardLabel from './elements/CardLabel';

//Layout
class PanPlayer extends React.Component {

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

    key = 500;

    render() {

        let grps = [];
        let g = null;
        for (let i in this.props.player.cards) {
            g = this.props.player.cards[i].map((item, index) => {

                return <CardLabel  sz={.025} suit={item.suit} rank={item.rank} rotation={0}/>
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
                    width: .5,
                    height: .22,
                    backgroundColor: "blue"

                }}>

                {this.props.player.playing ? (


                    <View style={{
                        width: .5,
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
                            width: .45,
                            height: .07,
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
    .exports = PanPlayer;
